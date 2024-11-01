'use client';
import {DataTable as PRDataTable, DataTableFilterMeta} from "primereact/datatable";
import {Column} from "primereact/column";
import {useState} from "react";
import {FilterMatchMode} from "primereact/api";
import {useRouter} from "next/navigation";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useTranslations} from "next-intl";
import {confirmDialog} from "primereact/confirmdialog";
import {Skeleton} from "primereact/skeleton";
import {useNotification} from "@/components";
import styles from "./data-table.module.scss";
import {useConfiguration} from "@/components/configuration";
import {MutationQuery, UseQuery} from "@/lib/model/QueryTypes";

export interface ColumnDefinition {
    key: string,
    translationKey: string,
}

export interface DataTableProps<TType> {
    queryAll: UseQuery<void, TType>,
    deleteItem:MutationQuery<string, TType>
    columns: ColumnDefinition[]
    openItemRoute: string | ((rowData: TType) => string)
    deletePromptTranslationKey: string,
    isDeletable?: (rowData: TType) => boolean,
    isViewable?: (rowData: TType) => boolean,
    deleteErrorTranslationKey: string,
    deleteSuccessTranslationKey: string,
    emptyListTranslationKey: string,
    dataTest: string
}

export default function DataTable(props: DataTableProps<any>) {
    let configuration = useConfiguration();
    let t = useTranslations();
    let {data, isLoading, isFetching, refetch: refetchList} = props.queryAll()
    let [deleteItemApi] = props.deleteItem()
    let [filters, setFilters] = useState<DataTableFilterMeta>({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    let router = useRouter();

    let toast = useNotification();

    const initFilters = () => {
        setFilters({
            global: {value: null, matchMode: FilterMatchMode.CONTAINS}
        });
        setGlobalFilterValue('');
    };

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (newVal: string) => {
        let _filters = {...filters};

        // @ts-ignore
        _filters['global'].value = newVal;

        setFilters(_filters);
        setGlobalFilterValue(newVal);
    };

    const renderHeader = () => {
        return (
            <div className={styles.filterRow}>
                <IconField iconPosition="left">
                    <InputIcon>
                        <FontAwesomeIcon icon={configuration.iconSet.faSearch} height={"1em"} width={"1em"}/>
                    </InputIcon>
                    <InputText value={globalFilterValue} onChange={e => onGlobalFilterChange(e.target.value)}
                               placeholder={t('general.search')} data-test='txt-list-search'/>
                </IconField>
                <Button severity="secondary" icon={<FontAwesomeIcon icon={configuration.iconSet.faXmark}/>} onClick={() => clearFilter()}
                        data-test='btn-list-search-clear'/>
            </div>
        );
    };

    const deleteItem = async (rowData: any) => {
        let res = await deleteItemApi(rowData.id)
        if (res.error != null) {
            toast.show({severity: 'error', summary: t(props.deleteErrorTranslationKey, rowData)});
        } else {
            toast.show({severity: 'success', summary: t(props.deleteSuccessTranslationKey, res.data)});
        }
        refetchList();
    }

    const deleteItemPrompt = (rowData: any) => {
        confirmDialog({
            message: <span dangerouslySetInnerHTML={{
                __html: t.markup(props.deletePromptTranslationKey, {
                    ...rowData,
                    b: (chunks) => `<b>${chunks}</b>`
                })
            }}></span>,
            header: <><FontAwesomeIcon icon={configuration.iconSet.faTrash}/> {t('general.delete_question')}</>,
            defaultFocus: "reject",
            accept: () => {
                deleteItem(rowData)
            },
            acceptLabel: t('general.delete'),
            rejectLabel: t('general.abort'),
            acceptClassName: "p-button-danger"
        });
    }

    const openItem = (rowData: any) => {
        router.push(typeof props.openItemRoute === 'function' ? props.openItemRoute(rowData) : props.openItemRoute);
    }

    const actionBodyTemplate = (rowData: any) => {
        let isViewable = props.isViewable != undefined ? props.isViewable(rowData) : true;
        let isDeletable = props.isDeletable != undefined ? props.isDeletable(rowData) : true;

        return (
            <>
                {isViewable ?
                    <Button icon={<FontAwesomeIcon icon={configuration.iconSet.faEye}/>} severity="info" onClick={() => openItem(rowData)}
                            data-test={`btn-view-${rowData.id}`}/> : null}
                {isDeletable ? <Button icon={<FontAwesomeIcon icon={configuration.iconSet.faTrash}/>} severity="danger"
                                       onClick={() => deleteItemPrompt(rowData)}
                                       data-test={`btn-delete-${rowData.id}`}/> : null}
            </>
        );
    };

    return <>
        {isLoading || isFetching ? <div className={styles.pageLoading}><Skeleton/></div> :
            <PRDataTable value={data} scrollable={true} paginator={true} rowsPerPageOptions={[10, 20, 50, 100]}
                         rows={10}
                         globalFilterFields={['id', 'name']} filters={filters} onFilter={(f) => setFilters(f.filters)}
                         emptyMessage={t(props.emptyListTranslationKey)} globalFilter={globalFilterValue}
                         header={renderHeader()} data-test={props.dataTest}>
                <Column field="id" header={t('general.id')} style={{maxWidth: '10em'}}/>
                {props.columns.map(c => <Column key={c.key} field={c.key} header={t(c.translationKey)}/>)}
                <Column body={actionBodyTemplate} exportable={false} className={styles.actionColumn}></Column>
            </PRDataTable>}
    </>
}
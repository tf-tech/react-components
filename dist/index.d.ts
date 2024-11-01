import * as React from 'react';
import React__default, { ReactNode, MutableRefObject } from 'react';
import { ButtonProps } from 'primereact/button';
import { IconProp, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Toast } from 'primereact/toast';
import { UseQuery as UseQuery$1, MutationQuery as MutationQuery$1, LazyUseQuery as LazyUseQuery$1 } from '@/lib/model/QueryTypes';
import { EditorField as EditorField$1 } from '@/components/form/FormTypes';
import { Configuration as Configuration$2 } from '@/components/configuration/Configuration';

interface LinkButtonProps extends ButtonProps {
    severity?: 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | 'contrast';
    faIcon?: IconProp;
    route: string;
}
declare function LinkButton({ faIcon, route, ...rest }: LinkButtonProps): React__default.JSX.Element;

declare function Notification({ children }: {
    children?: ReactNode | ReactNode[];
}): React__default.JSX.Element;

declare const NotificationContext: React__default.Context<Toast>;
declare const useNotification: () => Toast;

interface ColumnDefinition {
    key: string;
    translationKey: string;
}
interface DataTableProps<TType> {
    queryAll: UseQuery$1<void, TType>;
    deleteItem: MutationQuery$1<string, TType>;
    columns: ColumnDefinition[];
    openItemRoute: string | ((rowData: TType) => string);
    deletePromptTranslationKey: string;
    isDeletable?: (rowData: TType) => boolean;
    isViewable?: (rowData: TType) => boolean;
    deleteErrorTranslationKey: string;
    deleteSuccessTranslationKey: string;
    emptyListTranslationKey: string;
    dataTest: string;
}
declare function DataTable(props: DataTableProps<any>): React__default.JSX.Element;

interface FormProps<TObject> {
    object: TObject;
    rows: EditorField$1[][];
    onChange: (changedObject: any) => void;
    onSave: () => void;
}
declare function Form(props: FormProps<any>): React__default.JSX.Element;

interface ChangeListener {
    (change: any): void;
}
type EditorFieldType = 'text' | 'editor' | 'number' | 'date' | 'datetime' | 'password' | 'email' | 'option' | 'option-multi' | 'selection-check' | 'selection-radio' | undefined;
interface EditorField {
    key: string;
    editable?: boolean;
    labelTranslationKey: string;
    placeholderTranslationKey?: string;
    type: EditorFieldType;
    size?: number;
    options?: CheckboxSelectionOption[] | UseQuery$1<void, CheckboxSelectionOption[]>;
}

interface FormSkeletonProps {
    rows: EditorField[][];
}
declare function FormSkeleton(props: FormSkeletonProps): React__default.JSX.Element;

interface ObjectEditorRef {
    save(): void;
}
interface ObjectEditorProps<TObject> {
    id: string;
    fields: EditorField$1[];
    fieldSizes?: number[];
    useLazyGetObject: LazyUseQuery$1<any, TObject>;
    useCreateObject: MutationQuery$1<TObject, TObject>;
    useUpdateObject: MutationQuery$1<TObject, TObject>;
    objectEditorRef: MutableRefObject<ObjectEditorRef | undefined>;
    onSaved: (newObject: TObject) => void;
    saveSuccessTranslationKey: string;
    saveErrorTranslationKey: string;
}
declare function ObjectEditor(props: ObjectEditorProps<any>): React__default.JSX.Element;

interface CheckboxSelectionOption$1 {
    id: string;
    name: string;
}
interface CheckboxSelectionProps {
    onChange: (selectedValues: any[]) => void;
    value: any[];
    options: CheckboxSelectionOption$1[] | UseQuery$1<void, CheckboxSelectionOption$1[]>;
}
declare function CheckboxSelection(props: CheckboxSelectionProps): React__default.JSX.Element;

interface SerializedError {
    name?: string;
    message?: string;
    stack?: string;
    code?: string;
}
declare function FetchError({ error }: {
    error: SerializedError | any;
}): React__default.JSX.Element;

interface Icons {
    faArrowLeft: IconDefinition;
    faEye: IconDefinition;
    faSearch: IconDefinition;
    faTrash: IconDefinition;
    faXmark: IconDefinition;
}
interface Configuration$1 {
    iconSet: Icons;
}

declare function ConfigurationProvider({ children, configuration }: {
    children?: ReactNode | ReactNode[];
    configuration: Configuration$2;
}): React__default.JSX.Element;

declare const ConfigurationContext: React.Context<Configuration>;
declare const useConfiguration: () => Configuration;

interface ApplicationToolbarParams {
    title: string | ReactNode;
    children?: string | ReactNode | ReactNode[];
    backRoute?: string;
}
declare function ApplicationToolbar({ title, children, backRoute, ...rest }: ApplicationToolbarParams): React__default.JSX.Element;

declare function FlexClear(): React__default.JSX.Element;

interface LazyUseQuery<TArgs, TResult> {
    (): [QueryTrigger<TArgs, TResult>, UseQueryResult<any>, LastQueryInfo<TArgs>];
}
interface LastQueryInfo<TArgs> {
    lastArg?: TArgs;
}
interface QueryTrigger<TArgs, TResult> {
    (args?: TArgs): Promise<UseQueryResult<TResult>>;
}
interface UseQuery<TArgs, TResult> {
    (args?: TArgs): UseQueryDefinition<TResult>;
}
interface UseQueryDefinition<TResult> {
    data?: TResult;
    error?: any;
    isLoading: boolean;
    isFetching: boolean;
    refetch: (() => void);
}
interface UseQueryResult<TResult> {
    data?: TResult;
    isLoading: boolean;
    isError: boolean;
    error?: any;
}
interface MutationQuery<TArgs, TResult> {
    (): readonly [MutationQueryTrigger<TArgs, TResult>, MutationQueryResult<TResult>];
}
interface MutationQueryTrigger<TArgs, TResult> {
    (args: TArgs): Promise<MutationQueryResult<TResult>>;
}
interface MutationQueryResult<TResult> {
    data?: TResult;
    error?: any;
}

export { ApplicationToolbar, type ChangeListener, CheckboxSelection, type ColumnDefinition, type Configuration$1 as Configuration, ConfigurationContext, ConfigurationProvider, DataTable, type DataTableProps, type EditorField, type EditorFieldType, FetchError, FlexClear, Form, FormSkeleton, type LastQueryInfo, type LazyUseQuery, LinkButton, type LinkButtonProps, type MutationQuery, type MutationQueryResult, type MutationQueryTrigger, Notification, NotificationContext, ObjectEditor, type QueryTrigger, type UseQuery, type UseQueryDefinition, type UseQueryResult, useConfiguration, useNotification };

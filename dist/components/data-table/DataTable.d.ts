import React from "react";
import "./data-table.scss";
import { MutationQuery, UseQuery } from "@/lib/model/QueryTypes";
export interface ColumnDefinition {
    key: string;
    translationKey: string;
}
export interface DataTableProps<TType> {
    queryAll: UseQuery<void, TType>;
    deleteItem: MutationQuery<string, TType>;
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
export default function DataTable(props: DataTableProps<any>): React.JSX.Element;

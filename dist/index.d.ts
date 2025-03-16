import * as React from 'react';
import React__default, { ReactNode, ReactElement, MutableRefObject } from 'react';
import { ButtonProps } from 'primereact/button';
import { IconProp, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Toast } from 'primereact/toast';

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

interface ColumnDefinition {
    key: string;
    translationKey: string;
}
interface DataTableProps<TType> {
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
declare function DataTable(props: DataTableProps<any>): React__default.JSX.Element;

interface CheckboxSelectionOption {
    id: string;
    name: string;
}
interface CheckboxSelectionProps {
    onChange: (selectedValues: any[]) => void;
    value: any[];
    options: CheckboxSelectionOption[] | UseQuery<void, CheckboxSelectionOption[]>;
}
declare function CheckboxSelection(props: CheckboxSelectionProps): React__default.JSX.Element;

interface ChangeListener {
    (change: any): void;
}
type EditorFieldType = 'text' | 'editor' | 'number' | 'date' | 'datetime' | 'password' | 'email' | 'option' | 'option-multi' | 'selection-check' | 'selection-radio' | 'generated-secret' | 'custom' | undefined;
interface EditorField {
    key: string;
    editable?: boolean;
    labelTranslationKey: string;
    placeholderTranslationKey?: string;
    type: EditorFieldType;
    size?: number;
    allowedCharacters?: string;
    options?: CheckboxSelectionOption[] | UseQuery<void, CheckboxSelectionOption[]>;
    render?: (field: EditorField, object: any, onChange: ChangeListener) => React__default.ReactNode;
    createInitial?: () => any;
}

interface FormProps<TObject> {
    object: TObject;
    rows: EditorField[][];
    onChange: (changedObject: any) => void;
    onSave: () => void;
    children?: ReactNode[] | ReactElement | string | ReactElement[] | ReactNode | undefined;
}
declare function Form(props: FormProps<any>): React__default.JSX.Element;

interface FormSkeletonProps {
    rows: EditorField[][];
}
declare function FormSkeleton(props: FormSkeletonProps): React__default.JSX.Element;

interface ObjectEditorRef {
    save(): void;
    getObject(): any;
}
interface ObjectEditorProps<TObject> {
    id: string;
    fields: EditorField[];
    fieldSizes?: number[];
    useLazyGetObject: LazyUseQuery<any, TObject>;
    useCreateObject: MutationQuery<TObject, TObject>;
    useUpdateObject: MutationQuery<TObject, TObject>;
    objectEditorRef: MutableRefObject<ObjectEditorRef | undefined>;
    onSaved: (newObject: TObject) => void;
    saveSuccessTranslationKey: string;
    saveErrorTranslationKey: string;
    additionalContent?: (object: TObject, onChange: (change: any) => void) => any | React__default.ReactElement | React__default.ReactElement[];
    children?: ReactNode[] | ReactElement | string | ReactElement[] | ReactNode | undefined;
}
declare function ObjectEditor(props: ObjectEditorProps<any>): React__default.JSX.Element;

interface DropdownOption {
    id: string;
    name: string;
}
interface DropdownProps {
    onChange: (selectedValues: any) => void;
    value: any[];
    options: DropdownOption[] | UseQuery<void, DropdownOption[]>;
}
declare function Dropdown(props: DropdownProps): React__default.JSX.Element;

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
    faRotateRight: IconDefinition;
}
interface Translations {
    search: string;
    search_reset: string;
    generate: string;
    id: string;
    delete: string;
    abort: string;
    edit: string;
}
interface Configuration {
    iconSet: Icons;
    translations: Translations;
}
declare function buildIconsFromIconSet(iconSet: Icons): Icons;

declare function ConfigurationProvider({ children, configuration }: {
    children?: ReactNode | ReactNode[];
    configuration: Configuration;
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

export { ApplicationToolbar, type ChangeListener, CheckboxSelection, type CheckboxSelectionOption, type CheckboxSelectionProps, type ColumnDefinition, type Configuration, ConfigurationContext, ConfigurationProvider, DataTable, type DataTableProps, Dropdown, type DropdownOption, type EditorField, type EditorFieldType, FetchError, FlexClear, Form, FormSkeleton, type Icons, type LastQueryInfo, type LazyUseQuery, LinkButton, type LinkButtonProps, type MutationQuery, type MutationQueryResult, type MutationQueryTrigger, Notification, NotificationContext, ObjectEditor, type ObjectEditorRef, type QueryTrigger, type UseQuery, type UseQueryDefinition, type UseQueryResult, buildIconsFromIconSet, useConfiguration, useNotification };

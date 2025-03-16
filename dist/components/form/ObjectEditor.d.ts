import React, { MutableRefObject, ReactElement, ReactNode } from "react";
import './object-editor.scss';
import { EditorField } from "./FormTypes";
import { LazyUseQuery, MutationQuery } from "../../lib";
export interface ObjectEditorRef {
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
    additionalContent?: (object: TObject, onChange: (change: any) => void) => any | React.ReactElement | React.ReactElement[];
    children?: ReactNode[] | ReactElement | string | ReactElement[] | ReactNode | undefined;
}
export default function ObjectEditor(props: ObjectEditorProps<any>): React.JSX.Element;
export {};

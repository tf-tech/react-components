import React, { MutableRefObject } from "react";
import './object-editor.scss';
import { EditorField } from "@/components/form/FormTypes";
import { LazyUseQuery, MutationQuery } from "@/lib/model/QueryTypes";
export interface ObjectEditorRef {
    save(): void;
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
}
export default function ObjectEditor(props: ObjectEditorProps<any>): React.JSX.Element;
export {};

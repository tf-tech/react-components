import React, { ReactElement, ReactNode } from "react";
import "./object-editor.scss";
import { EditorField } from "./FormTypes";
interface FormProps<TObject> {
    object: TObject;
    rows: EditorField[][];
    onChange: (changedObject: any) => void;
    onSave: () => void;
    children?: ReactNode[] | ReactElement | string | ReactElement[] | ReactNode | undefined;
}
export default function Form(props: FormProps<any>): React.JSX.Element;
export {};

import {UseQuery} from "../../lib";
import {CheckboxSelectionOption} from "./CheckboxSelection";

export interface ChangeListener {
    (change: any): void
}

export type EditorFieldType = 'text' | 'editor' | 'number' | 'date' | 'datetime' | 'password' | 'email' | 'option' | 'option-multi' | 'selection-check' | 'selection-radio' | undefined;

export interface EditorField {
    key: string,
    editable?: boolean,
    labelTranslationKey: string,
    placeholderTranslationKey?: string,
    type: EditorFieldType,
    size?: number,
    options?: CheckboxSelectionOption[] | UseQuery<void, CheckboxSelectionOption[]>
}
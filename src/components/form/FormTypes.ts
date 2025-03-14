import {UseQuery} from "../../lib";
import {CheckboxSelectionOption} from "./CheckboxSelection";
import React from "react";

export interface ChangeListener {
    (change: any): void
}

export type EditorFieldType = 'text' | 'editor' | 'number' | 'date' | 'datetime' | 'password' | 'email' | 'option' | 'option-multi' | 'selection-check' | 'selection-radio' | 'generated-secret' | 'custom' | undefined;

export interface EditorField {
    key: string,
    editable?: boolean,
    labelTranslationKey: string,
    placeholderTranslationKey?: string,
    type: EditorFieldType,
    size?: number,
    allowedCharacters?: string,
    options?: CheckboxSelectionOption[] | UseQuery<void, CheckboxSelectionOption[]>,
    render?: (field: EditorField, object: any, onChange: ChangeListener) => React.ReactNode,
    createInitial?: () => any
}
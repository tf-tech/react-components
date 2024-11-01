import React from "react";
import './object-editor.scss';
import { UseQuery } from "../../lib";
export interface CheckboxSelectionOption {
    id: string;
    name: string;
}
export interface CheckboxSelectionProps {
    onChange: (selectedValues: any[]) => void;
    value: any[];
    options: CheckboxSelectionOption[] | UseQuery<void, CheckboxSelectionOption[]>;
}
export default function CheckboxSelection(props: CheckboxSelectionProps): React.JSX.Element;

import React from "react";
import './object-editor.scss';
import { UseQuery } from "../../lib";
export interface DropdownOption {
    id: string;
    name: string;
}
export interface DropdownProps {
    onChange: (selectedValues: any) => void;
    value: any[];
    options: DropdownOption[] | UseQuery<void, DropdownOption[]>;
}
export default function Dropdown(props: DropdownProps): React.JSX.Element;

import React from "react";
import { UseQuery } from "@/lib/model/QueryTypes";
import './object-editor.scss';
interface CheckboxSelectionOption {
    id: string;
    name: string;
}
interface CheckboxSelectionProps {
    onChange: (selectedValues: any[]) => void;
    value: any[];
    options: CheckboxSelectionOption[] | UseQuery<void, CheckboxSelectionOption[]>;
}
export default function CheckboxSelection(props: CheckboxSelectionProps): React.JSX.Element;
export {};

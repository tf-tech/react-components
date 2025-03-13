import React from "react";
import {useEffect, useState} from "react";
import './object-editor.scss';
import {UseQuery} from "../../lib";
import {Dropdown as PRDropdown} from "primereact/dropdown";

export interface DropdownOption {
    id: string
    name: string
}

export interface DropdownProps {
    onChange: (selectedValues: any) => void;
    value: any[]
    options: DropdownOption[] | UseQuery<void, DropdownOption[]>;
}

export default function Dropdown(props: DropdownProps) {
    let [opts, setOpts] = useState<DropdownOption[]>();

    console.log(props);
    if(typeof props.options === "function") {
        let {data, isLoading} = props.options();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if(!isLoading && data != null)
                setOpts(data);
        }, [data, isLoading]);
    } else {
        setOpts(props.options);
    }

    return <>
        <PRDropdown onChange={e => props.onChange(e.value)} value={props.value}
                    options={opts?.map(o => ({label: o.name, value: o.id}))} optionLabel="label" optionValue="value"
                    placeholder="Select..." filter={true} filterPlaceholder="Search..." showClear={true} filterMatchMode="contains" filterInputAutoFocus={true} resetFilterOnHide={true} />
    </>
}
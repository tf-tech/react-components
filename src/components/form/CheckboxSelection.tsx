import React from "react";
import {useEffect, useState} from "react";
import {Checkbox} from "primereact/checkbox";
import './object-editor.scss';
import {UseQuery} from "../../lib";

export interface CheckboxSelectionOption {
    id: string
    name: string
}

export interface CheckboxSelectionProps {
    onChange: (selectedValues: any[]) => void;
    value: any[]
    options: CheckboxSelectionOption[] | UseQuery<void, CheckboxSelectionOption[]>;
}

export default function CheckboxSelection(props: CheckboxSelectionProps) {
    let [opts, setOpts] = useState<CheckboxSelectionOption[]>();

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

    function changeSelection(checked: boolean | undefined, option: CheckboxSelectionOption) {
        props.onChange(checked ? [...props.value, option.id] : props.value.filter(v => v !== option.id));
    }

    return <>
        {opts?.map(o => <div className={'checkbox'} key={o.id}>
            <Checkbox checked={props.value.indexOf(o.id) > -1} value={o} id={`chk-${o}`} onChange={(e) => changeSelection(e.target.checked, o)}/>
            <label htmlFor={`chk-${o.id}`}>{o.name}</label>
        </div>)}
    </>
}
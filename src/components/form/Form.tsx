import {ChangeListener, EditorField} from "@/components/form";
import {KeyFilterType} from "primereact/keyfilter";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Editor} from "primereact/editor";
import {Calendar} from "primereact/calendar";
import {DateTime} from "luxon";
import React, {FormEvent} from "react";
import styles from "@/lib/form/object-editor.module.scss";
import {classNames} from "primereact/utils";
import {useTranslations} from "next-intl";
import {CheckboxSelection} from "@/components/form";

interface FormProps<TObject> {
    object: TObject
    rows: EditorField[][],
    onChange: (changedObject: any) => void,
    onSave: () => void
}

function renderInputText(id: string, value: any, onChange: ChangeListener, readonly: boolean, keyFilter?: KeyFilterType) {
    return <InputText id={id} value={value} onChange={(e) => onChange(e.target.value)} keyfilter={keyFilter}
                      data-test={`txt-${id}`} disabled={readonly}/>
}

function renderTextField(field: EditorField, obj: any, onChange: ChangeListener) {
    return renderInputText(field.key, obj[field.key], (val) => onChange({[field.key]: val}), !(field.editable ?? true))
}

function renderEmailField(field: EditorField, obj: any, onChange: ChangeListener) {
    return renderInputText(field.key, obj[field.key], (val) => onChange({[field.key]: val}), !(field.editable ?? true), 'email')
}

function renderNumberField(field: EditorField, obj: any, onChange: ChangeListener) {
    return renderInputText(field.key, obj[field.key], (val) => onChange({[field.key]: val}), !(field.editable ?? true), 'int')
}

function renderPassword(field: EditorField, obj: any, onChange: ChangeListener) {
    return <Password toggleMask value={obj[field.key]} onChange={(e) => onChange({[field.key]: e.target.value})}
                     id={field.key} data-test={`pwd-${field.key}`} readOnly={!(field.editable ?? true)}/>
}

function renderEditor(field: EditorField, obj: any, onChange: ChangeListener) {
    return <Editor value={obj[field.key]} onTextChange={(e) => onChange({[field.key]: e.htmlValue})}
                   readOnly={!(field.editable ?? true)}/>
}

function renderCalendar(id: string, value: any, onChange: ChangeListener, showTime: boolean, readonly: boolean) {
    return <Calendar selectionMode={'single'} value={value} onChange={(e) => onChange(e.value)} showTime={showTime}
                     showWeek
                     hourFormat="24" dateFormat={"dd.mm.yy"} data-test={`dd-${id}`} disabled={readonly}/>
}

function renderDateSelector(field: EditorField, obj: any, onChange: ChangeListener) {
    return renderCalendar(field.key, DateTime.fromISO(obj[field.key]).toJSDate(), (e) => onChange({[field.key]: DateTime.fromJSDate(e).toString()}), false, !(field.editable ?? true))
}

function renderDateTimeSelector(field: EditorField, obj: any, onChange: ChangeListener) {
    return renderCalendar(field.key, DateTime.fromISO(obj[field.key]).toJSDate(), (e) => onChange({[field.key]: DateTime.fromJSDate(e).toString()}), true, !(field.editable ?? true))
}

function renderCheckSelection(field: EditorField, obj: any, onChange: ChangeListener) {
    return <div className={styles.formWrapRow}>
        <CheckboxSelection value={obj[field.key]} onChange={(e) => onChange({[field.key]: e})} options={field.options!} />
    </div>
}

function renderInputField(field: EditorField, obj: any, onChange: ChangeListener) {
    switch (field.type) {
        case 'text':
            return renderTextField(field, obj, onChange);
        case 'editor':
            return renderEditor(field, obj, onChange);
        case 'email':
            return renderEmailField(field, obj, onChange);
        case 'date':
            return renderDateSelector(field, obj, onChange);
        case 'datetime':
            return renderDateTimeSelector(field, obj, onChange);
        case 'number':
            return renderNumberField(field, obj, onChange);
        case 'password':
            return renderPassword(field, obj, onChange);
        case 'option':
            return null
        case 'selection-check':
            return renderCheckSelection(field, obj, onChange);
    }
}

export default function Form(props: FormProps<any>) {
    const t = useTranslations();

    function renderField(field: EditorField, obj: any, onChange: ChangeListener) {
        return <div className={classNames(styles.formField, styles[`size-${field.size ?? 12}`])} key={field.key}>
            <label htmlFor={field.key}>{t(field.labelTranslationKey)}</label>
            {renderInputField(field, obj, onChange)}
        </div>
    }

    function renderRow(row: EditorField[]) {
        return <div className={styles.formRow} key={row.map(f => f.key).join(",")}>
            {row.map(f => renderField(f, props.object, (e) => props.onChange(e)))}
        </div>
    }

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.onSave();
    }

    return <form onSubmit={(e) => onSubmit(e)}>
        <div className={styles.formColumn}>
            {props.rows.map(r => renderRow(r))}
        </div>
    </form>
}
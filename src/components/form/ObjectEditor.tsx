'use client';

import {Card} from "primereact/card";
import React, {MutableRefObject, useEffect, useState} from "react";
import styles from './object-editor.module.scss';
import {LazyUseQuery, MutationQuery} from "@/lib";
import {Form,FormSkeleton, EditorField, EditorFieldType} from "@/components/form";
import {FetchError} from "@/components/error";
import {useNotification} from "@/components/notification";
import {useTranslations} from "next-intl";

export interface ObjectEditorRef {
    save(): void
}

interface ObjectEditorProps<TObject> {
    id: string
    fields: EditorField[]
    fieldSizes?: number[]
    useLazyGetObject: LazyUseQuery<any, TObject>
    useCreateObject: MutationQuery<TObject, TObject>
    useUpdateObject: MutationQuery<TObject, TObject>
    objectEditorRef: MutableRefObject<ObjectEditorRef | undefined>
    onSaved: (newObject: TObject) => void
    saveSuccessTranslationKey: string
    saveErrorTranslationKey: string
}

function clusterFields(fields: EditorField[]): EditorField[][] {
    let rows: EditorField[][] = [];
    let currentRow: EditorField[] = []
    let currentSizes = 0;

    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        let size = field.size ?? 12;
        if (currentSizes + size > 12) {
            rows.push(currentRow);
            currentRow = [];
            currentSizes = 0;
        }
        currentRow.push(field);
        currentSizes += size
    }

    if (currentSizes > 0) {
        rows.push(currentRow);
    }

    return rows;
}

function generateDefaultValue(type: EditorFieldType):any {
    switch (type) {
        case 'email':
        case 'password':
        case 'editor':
        case 'text': return "";
        case 'number': return 0;
        case 'date':
        case 'datetime': return new Date();
        case 'selection-check': return [];
    }
}

export default function ObjectEditor(props: ObjectEditorProps<any>) {
    let [getObjectQuery, {data: apiObject, isLoading, isError, error}] = props.useLazyGetObject();
    let [updateObjectQuery] = props.useUpdateObject();
    let [createObjectQuery] = props.useCreateObject();
    let [object, setObject] = useState<any>(null);

    let t = useTranslations();
    let toast = useNotification();

    let rows = clusterFields(props.fields)

    useEffect(() => {
        if(apiObject != null)
            setObject(apiObject)
    }, [isLoading, apiObject]);

    useEffect(() => {
        if(props.id != null && props.id != "null") {
            getObjectQuery(props.id);
        } else {
            setObject(createNewObject())
        }
    }, [props.id, getObjectQuery]);

    useEffect(() => {
        if(props.objectEditorRef != null)
            props.objectEditorRef.current = { save }
    });

    async function handleUpdateResponse<BaseQuery, TagTypes, ReducerPath>(result: {
        error?: any,
        data?: any | null
    }) {
        if (result.error != null) {
            toast.show({severity: 'error', summary: t(props.saveErrorTranslationKey, object)});
        } else {
            toast.show({severity: 'success', summary: t(props.saveSuccessTranslationKey, object)});
        }
        let id = result.data?.id || props.id;
        if (id != null && id != "null") {
            let reload = await getObjectQuery(id);
            setObject(reload.data!)
            props.onSaved(reload.data!)
        }
    }

    function createNewObject(): any {
        let result:any = {};
        for (let field of props.fields) {
            result[field.key] = generateDefaultValue(field.type);
        }
        return result;
    }

    async function asyncUpdateObject() {
        let result = await updateObjectQuery(object);
        await handleUpdateResponse(result);
    }

    async function asyncCreateObject() {
        let result = await createObjectQuery(object);
        await handleUpdateResponse(result);
    }

    async function save() {
        if (props.id != null && props.id != "null") {
            await asyncUpdateObject()
        } else {
            await asyncCreateObject()
        }
    }

    function onFormChanged(changed: any) {
        setObject({...object, ...changed});
    }

    function renderForm() {
        return <Form object={object} rows={rows} onChange={(changed) => onFormChanged(changed)} onSave={() => save()} />
    }

    return <Card className={styles.pageWrapper}>
        {isLoading || object == null && !isError ? <FormSkeleton rows={rows} /> : isError ? <FetchError error={error} /> : renderForm()}
    </Card>
}
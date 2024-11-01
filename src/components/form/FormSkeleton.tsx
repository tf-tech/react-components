import "./object-editor.scss";
import React from "react";
import {classNames} from "primereact/utils";
import {Skeleton} from "primereact/skeleton";
import {EditorField} from "./FormTypes";

interface FormSkeletonProps {
    rows: EditorField[][]
}

export default function FormSkeleton(props: FormSkeletonProps) {
    function renderSkeletonField(field: EditorField) {
        return <div className={classNames('formField', `size-${field.size ?? 12}`)} key={field.key}>
            <Skeleton width={"25%"} />
            <Skeleton width={"100%"} />
        </div>
    }

    function renderSkeletonRow(row: EditorField[]) {
        return <div className={'formRow'} key={row.map(m => m.key).join(",")}>
            {row.map(r => renderSkeletonField(r))}
        </div>
    }

    function renderSkeleton(rows: EditorField[][]) {
        return <div className={'formColumn'}>
            {rows.map(r => renderSkeletonRow(r))}
        </div>
    }

    return renderSkeleton(props.rows);
}
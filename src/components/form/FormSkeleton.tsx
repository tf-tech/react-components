import styles from "@/lib/form/object-editor.module.scss";
import React from "react";
import {EditorField} from "@/components/form";
import {classNames} from "primereact/utils";
import {Skeleton} from "primereact/skeleton";

interface FormSkeletonProps {
    rows: EditorField[][]
}

export default function FormSkeleton(props: FormSkeletonProps) {
    function renderSkeletonField(field: EditorField) {
        return <div className={classNames(styles.formField, styles[`size-${field.size ?? 12}`])} key={field.key}>
            <Skeleton width={"25%"} />
            <Skeleton width={"100%"} />
        </div>
    }

    function renderSkeletonRow(row: EditorField[]) {
        return <div className={styles.formRow} key={row.map(m => m.key).join(",")}>
            {row.map(r => renderSkeletonField(r))}
        </div>
    }

    function renderSkeleton(rows: EditorField[][]) {
        return <div className={styles.formColumn}>
            {rows.map(r => renderSkeletonRow(r))}
        </div>
    }

    return renderSkeleton(props.rows);
}
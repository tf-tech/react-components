'use client';

import {ReactNode, useEffect, useRef, useState} from "react";
import {NotificationContext} from "./context";
import {Toast} from "primereact/toast";

export default function Notification({children}: {children?: ReactNode | ReactNode[]}) {
    const toast = useRef<Toast | null>(null);
    const [val, setVal] = useState<Toast>(null!);

    useEffect(() => {
        if(toast.current != null)
            setVal(toast.current!);
    }, [toast]);

    return <>
        <Toast ref={toast} />
        <NotificationContext.Provider value={val}>
            {children}
        </NotificationContext.Provider>
    </>
}
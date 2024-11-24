import React from "react";
import {Toolbar} from "primereact/toolbar";
import './application-toolbar.scss'
import {ReactNode} from "react";
import {Button} from "primereact/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/navigation";
import {useConfiguration} from "../configuration";

interface ApplicationToolbarParams {
    title: string | ReactNode,
    children?: string | ReactNode | ReactNode[],
    backRoute?: string
}

export default function ApplicationToolbar({title, children, backRoute, ...rest}:ApplicationToolbarParams) {
    let router = useRouter();

    let configuration = useConfiguration();

    const centerContent = () => <>
        {title}
    </>

    const startContent = () => <>
        <Button icon={<FontAwesomeIcon icon={configuration.iconSet.faArrowLeft} />} onClick={() => !backRoute ? router.back() : router.replace(backRoute)} />
    </>

    return <>
        <Toolbar className={'applicationToolbar'} center={centerContent} end={<span className={'application-toolbar-end'}>{children}</span>} start={startContent} {...rest} />
    </>;
}
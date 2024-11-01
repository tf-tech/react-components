import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, ButtonProps} from "primereact/button";
import {useRouter} from "next/navigation";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export interface LinkButtonProps extends ButtonProps {
    severity?: 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | 'contrast'
    faIcon?: IconProp,
    route: string
}

export default function LinkButton({faIcon, route, ...rest}: LinkButtonProps) {
    let router = useRouter();

    let buttonProps = {} as ButtonProps

    if(faIcon != undefined) {
        buttonProps.icon = <FontAwesomeIcon icon={faIcon} />;
    }

    return <Button {...buttonProps} onClick={() => router.push(route)} {...rest} />;
}
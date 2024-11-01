import React from "react";
import { ButtonProps } from "primereact/button";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export interface LinkButtonProps extends ButtonProps {
    severity?: 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | 'contrast';
    faIcon?: IconProp;
    route: string;
}
export default function LinkButton({ faIcon, route, ...rest }: LinkButtonProps): React.JSX.Element;

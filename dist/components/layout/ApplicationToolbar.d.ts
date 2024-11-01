import React from "react";
import './application-toolbar.scss';
import { ReactNode } from "react";
interface ApplicationToolbarParams {
    title: string | ReactNode;
    children?: string | ReactNode | ReactNode[];
    backRoute?: string;
}
export default function ApplicationToolbar({ title, children, backRoute, ...rest }: ApplicationToolbarParams): React.JSX.Element;
export {};

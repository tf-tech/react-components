import React from "react";
import { ReactNode } from "react";
import { Configuration } from "./Configuration";
export default function ConfigurationProvider({ children, configuration }: {
    children?: ReactNode | ReactNode[];
    configuration: Configuration;
}): React.JSX.Element;

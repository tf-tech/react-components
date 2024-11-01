import React from "react";
import {ReactNode} from "react";
import {ConfigurationContext} from "@/components/configuration/context";
import {Configuration} from "@/components/configuration/Configuration";

export default function ConfigurationProvider({children, configuration}: {children?: ReactNode | ReactNode[], configuration: Configuration}) {
    return <>
        <ConfigurationContext.Provider value={configuration}>
            {children}
        </ConfigurationContext.Provider>
    </>
}
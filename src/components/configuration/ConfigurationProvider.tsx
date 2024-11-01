import React from "react";
import {ReactNode} from "react";
import {Configuration} from "./Configuration";
import {ConfigurationContext} from "./context";

export default function ConfigurationProvider({children, configuration}: {children?: ReactNode | ReactNode[], configuration: Configuration}) {
    return <>
        <ConfigurationContext.Provider value={configuration}>
            {children}
        </ConfigurationContext.Provider>
    </>
}
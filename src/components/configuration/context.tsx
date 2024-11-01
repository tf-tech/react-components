import {createContext, useContext} from "react";
import {Configuration} from "./Configuration";

let DefaultConfigurationContext = createContext<Configuration>(null!);

function createUseConfigurationHook(context = DefaultConfigurationContext) {
    return function() {
        return useContext(context);
    }
}

export const ConfigurationContext = DefaultConfigurationContext;

//
export const useConfiguration = createUseConfigurationHook();
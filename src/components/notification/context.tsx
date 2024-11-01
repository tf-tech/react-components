'use client';
import React from "react";
import {createContext, useContext} from "react";
import {Toast} from "primereact/toast";

let DefaultNotificationContext = createContext<Toast>(null!);

function createUseNotificationHook(context = DefaultNotificationContext) {
    return function() {
        return useContext(context);
    }
}

export const NotificationContext = DefaultNotificationContext;

//
export const useNotification = createUseNotificationHook();
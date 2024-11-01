import React from "react";
export interface SerializedError {
    name?: string;
    message?: string;
    stack?: string;
    code?: string;
}
export default function FetchError({ error }: {
    error: SerializedError | any;
}): React.JSX.Element;

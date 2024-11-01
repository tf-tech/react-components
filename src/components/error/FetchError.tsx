import {SerializedError} from "@reduxjs/toolkit";
import {useTranslations} from "next-intl";

export default function FetchError({error}: {error: SerializedError | any}) {
    const t = useTranslations();

    // @ts-ignore
    let httpStatus = error!.originalStatus;
    let errorCode = "general.errors.unknown";
    if(httpStatus == 404) {
        errorCode = "general.errors.not_found";
    }
    return <>
        <h1>{t(errorCode)}</h1>
        <span>{t('general.errors.retry')}</span>
    </>
}
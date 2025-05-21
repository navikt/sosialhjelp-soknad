"use client";

import * as React from "react";
import {ReactNode, useEffect} from "react";
import {AppHeader} from "../appHeader/AppHeader.tsx";
import {useTranslations} from "next-intl";
import {logger} from "@navikt/next-logger";
import {faro} from "@grafana/faro-react";
import Head from "next/head";

/**
 * Felleskomponent for feilmeldinger. Logger error til Faro om tilgjengelig, ellers til next-logger.
 */
export const ErrorPage = ({children, error}: {children: ReactNode; error?: Error & {digest?: string}}) => {
    const t = useTranslations("AppHeader");

    if (error) {
        if (faro.api) faro.api.pushError(error);
        else logger.warn({error}, "unable to push error to faro");
    }

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_DIGISOS_ENV === "localhost") return;
        logger.error(`En bruker har sett ErrorPage, error: ${error} referrer: ${document.referrer}`);
    }, [error]);

    return (
        <section className={"grow flex flex-col"}>
            <AppHeader />
            <Head>
                <title>{t("title")}</title>
            </Head>
            {children}
        </section>
    );
};

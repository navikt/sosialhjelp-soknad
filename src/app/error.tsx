"use client";

import TekniskFeil from "../sider/feilsider/TekniskFeil.tsx";
import * as React from "react";
import {TrengerDuRaskHjelp} from "../sider/feilsider/TrengerDuRaskHjelp.tsx";
import {ErrorPage} from "../lib/components/error/ErrorPage.tsx";
import {ClientSideProvider} from "../lib/components/error/ClientSideProvider.tsx";
import {AxiosError, isAxiosError} from "axios";
import {SoknadApiErrorError} from "../generated/model";
import {PersonbeskyttelseFeilmelding} from "../sider/hovedmeny/PersonbeskyttelseFeilmelding.tsx";
import {SokerUnder18Feilmelding} from "../sider/hovedmeny/SokerUnder18Feilmelding.tsx";

const isNoAccess = (error: Error | AxiosError<any>) => {
    if (isAxiosError(error) && error.status === 403) {
        const type = error?.response?.data.error as SoknadApiErrorError;
        if (type === SoknadApiErrorError.NoAccess) return true;
    }
    return false;
};

const isSokerUnder18 = (error: Error | AxiosError<any>) => {
    if (isAxiosError(error) && error.status === 403) {
        const type = error?.response?.data.error as SoknadApiErrorError;
        if (type === SoknadApiErrorError.SokerUnder18) return true;
    }
};

const Error = ({error, reset}: {error: Error; reset: () => void}) => (
    <ClientSideProvider>
        {isNoAccess(error) ? (
            <PersonbeskyttelseFeilmelding />
        ) : isSokerUnder18(error) ? (
            <SokerUnder18Feilmelding />
        ) : (
            <ErrorPage error={error}>
                <TekniskFeil error={error} reset={reset} />
                <TrengerDuRaskHjelp />
            </ErrorPage>
        )}
    </ClientSideProvider>
);

export default Error;

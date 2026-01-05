"use client";

import TekniskFeil from "../sider/feilsider/TekniskFeil.tsx";
import * as React from "react";
import {TrengerDuRaskHjelp} from "../sider/feilsider/TrengerDuRaskHjelp.tsx";
import {ErrorPage} from "../lib/components/error/ErrorPage.tsx";
import {ClientSideProvider} from "../lib/components/error/ClientSideProvider.tsx";

const GlobalError = ({error, reset}: {error: Error & {digest?: string}; reset: () => void}) => (
    <html>
        <body>
            <ClientSideProvider>
                <ErrorPage error={error}>
                    <TekniskFeil error={error} reset={reset} />
                    <TrengerDuRaskHjelp />
                </ErrorPage>
            </ClientSideProvider>
        </body>
    </html>
);

export default GlobalError;

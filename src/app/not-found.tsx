"use client";

import IkkeFunnet from "../sider/feilsider/IkkeFunnet.tsx";
import * as React from "react";
import {ClientSideProvider} from "../lib/components/error/ClientSideProvider.tsx";
import {ErrorPage} from "../lib/components/error/ErrorPage.tsx";

export default () => (
    <ClientSideProvider>
        <ErrorPage error={new Error("404")}>
            <IkkeFunnet />
        </ErrorPage>
    </ClientSideProvider>
);

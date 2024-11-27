"use client";

import React, {useEffect} from "react";
import dynamic from "next/dynamic";
import {BASE_PATH} from "../../../lib/constants.ts";
import {configureLogger} from "@navikt/next-logger";
import {initAmplitude} from "../../../lib/amplitude/Amplitude.tsx";

const App = dynamic(() => import("../../../app.tsx"), {ssr: false});

export function ClientOnly() {
    configureLogger({basePath: BASE_PATH});
    useEffect(() => {
        initAmplitude();
    }, []);

    return <App />;
}

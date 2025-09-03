"use client";

import React from "react";
import dynamic from "next/dynamic";
import {BASE_PATH} from "../../../lib/constants.ts";
import {configureLogger} from "@navikt/next-logger";

const App = dynamic(() => import("../../../app.tsx"), {ssr: false});

export function ClientOnly() {
    configureLogger({basePath: BASE_PATH});

    return <App />;
}

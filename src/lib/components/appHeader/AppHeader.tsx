"use client";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {Heading} from "@navikt/ds-react";
import digisosConfig from "../../config";
import DeveloperToolkit from "./DeveloperToolkit.tsx";

export const AppHeader = () => {
    const {t} = useTranslation("skjema");
    return (
        <header className={"w-full"}>
            {digisosConfig.showDevPanel && <DeveloperToolkit />}
            <Heading level="1" size="small" className={"text-center p-4 bg-digisosGronnLys"}>
                {t("skjema.tittel")}
            </Heading>
        </header>
    );
};

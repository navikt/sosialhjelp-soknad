"use client";
import * as React from "react";
import {Heading} from "@navikt/ds-react";
import {useTranslations} from "next-intl";

export const AppHeader = () => {
    const t = useTranslations("AppHeader");
    return (
        <div className={"w-full"}>
            {/*kommentert ut for nextjs ssr {digisosConfig.showDevPanel && <DeveloperToolkit />}*/}
            <Heading level="1" size="small" className={"text-center p-4 bg-digisos-light"}>
                {t("title")}
            </Heading>
        </div>
    );
};

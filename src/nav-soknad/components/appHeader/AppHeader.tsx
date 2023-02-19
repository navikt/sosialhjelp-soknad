import * as React from "react";
import {isLocalhost} from "../../utils";
import {DeveloperToolkit} from "./DeveloperToolkit";
import {useTranslation} from "react-i18next";
import {Heading} from "@navikt/ds-react";

const AppHeader = () => {
    const {t} = useTranslation("skjema");

    if (isLocalhost(window.location.href))
        return (
            <>
                <Heading level="1" size="small" className={"text-center p-4 bg-[#9bd0b0]"}>
                    {t("skjema.tittel")}
                </Heading>
                <DeveloperToolkit />
            </>
        );

    return (
        <Heading level="1" size="small" className={"text-center p-4 bg-[#9bd0b0]"}>
            {t("skjema.tittel")}
        </Heading>
    );
};

export default AppHeader;

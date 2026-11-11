import {Skatteetaten} from "./Skatteetaten";
import * as React from "react";
import {Box, Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

export const SkattbarInntekt = ({isKortSoknad = false}) => {
    // TODO DIGISOS-1175: Håndter flere måneder med skattbar inntekt
    const {t} = useTranslation("skjema");

    return (
        <Box>
            <div>
                <Heading size={isKortSoknad ? "small" : "medium"} level={isKortSoknad ? "3" : "2"} spacing>
                    {t("utbetalinger.inntekt.skattbar.inntekt.tittel")}
                </Heading>
                <div className={"bg-ax-bg-info-moderate border-l-ax-bg-info-strong rounded-md"}>
                    <Skatteetaten />
                </div>
            </div>
        </Box>
    );
};

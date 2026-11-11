import {Skatteetaten} from "./Skatteetaten";
import * as React from "react";
import {Accordion, Box, Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {AccordionContent, AccordionHeader, AccordionItem} from "@navikt/ds-react/Accordion";

export const SkattbarInntekt = ({isKortSoknad = false}) => {
    // TODO DIGISOS-1175: Håndter flere måneder med skattbar inntekt
    const {t} = useTranslation("skjema");

    return (
        <Box>
            <div>
                <Heading size={isKortSoknad ? "small" : "medium"} level={isKortSoknad ? "3" : "2"} spacing>
                    {t("utbetalinger.inntekt.skattbar.inntekt.tittel")}
                </Heading>
                <Accordion>
                    <AccordionItem>
                        <AccordionHeader>{t("utbetalinger.inntekt.skattbar.informasjon.tittel")}</AccordionHeader>
                        <AccordionContent className="whitespace-pre-line">
                            {t("utbetalinger.inntekt.skattbar.informasjon.tekst")}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className={"bg-ax-bg-info-moderate border-l-ax-bg-info-strong rounded-md"}>
                    <Skatteetaten />
                </div>
            </div>
        </Box>
    );
};

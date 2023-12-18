/**
 * Slett denne filen etter 2. januar 2024
 */
import {useTranslation} from "react-i18next";
import {Alert, BodyShort, Heading} from "@navikt/ds-react";

const NewYearEngelsk = () => (
    <Alert variant={"warning"}>
        <Heading size={"small"} level={"2"} spacing>
            Scheduled downtime
        </Heading>
        <BodyShort spacing>
            Due to county and municipal redistricting,{" "}
            <span className={"font-bold"}>
                the digital application for financial assistance is unavailable between December 31st at 23:59 and
                January 2nd at 08:00.
            </span>
        </BodyShort>
        <BodyShort>All applications which have been created but not yet sent will be deleted on January 1st.</BodyShort>
    </Alert>
);
const NewYearNorsk = () => (
    <Alert variant={"warning"}>
        <Heading size={"small"} level={"2"} spacing>
            Planlagt nedetid
        </Heading>
        <BodyShort spacing>
            Grunnet fylkesoppløsning og nye kommunenummer vil den digitale søknaden for økonomisk sosialhjelp være
            utilgjengelig{" "}
            <span className={"font-bold"}>mellom 31. desember 2023 kl. 23:59 og 2. januar 2024 kl. 08:00.</span>
        </BodyShort>
        <BodyShort>Påbegynte søknader som ikke er sendt inn før årsskiftet vil bli slettet 1 januar.</BodyShort>
    </Alert>
);

export const NewYearNewNumbers = () => {
    const lang = useTranslation().i18n.language;

    if (lang === "en") return <NewYearEngelsk />;
    else return <NewYearNorsk />;
};

import * as React from "react";
import {Alert, BodyShort, Heading} from "@navikt/ds-react";
import {NavEnhetFrontend} from "../../../generated/client/model";
import {useTranslation} from "react-i18next";
import {erAktiv} from "../../../lib/navEnhetStatus";
import {NavEnhetInaktiv} from "./NavEnhetInaktiv";

export const NavEnhet = ({navEnhet}: {navEnhet?: NavEnhetFrontend}) => {
    const {t} = useTranslation();
    if (!navEnhet) return null;
    const {enhetsnavn, kommunenavn} = navEnhet;

    if (!erAktiv(navEnhet)) return <NavEnhetInaktiv />;

    return (
        <Alert variant={"success"}>
            <Heading size={"small"} level={"4"} spacing>
                {t("adresse.alertstripe.suksess")}
            </Heading>
            <BodyShort>{t("adresse.alertstripe.navKontor", {enhetsnavn, kommunenavn})}</BodyShort>
        </Alert>
    );
};

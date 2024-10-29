import Detaljeliste, {DetaljelisteElement} from "../../../lib/components/detaljeliste/Detaljeliste";
import * as React from "react";
import {AdresseFrontend} from "../../../generated/model";
import {useTranslation} from "react-i18next";
import {logError} from "../../../lib/log/loggerUtils";
import {AdresserDtoBrukerAdresse} from "../../../generated/new/model";

export const AdresseVisning = ({adresse}: {adresse?: AdresseFrontend | AdresserDtoBrukerAdresse}) => {
    const {t} = useTranslation();
    if (!adresse) return null;

    if (adresse.type === "VegAdresse") {
        const {gatenavn, husnummer, husbokstav, postnummer, poststed} = adresse;
        return (
            <Detaljeliste>
                {gatenavn} {husnummer}
                {husbokstav}, {postnummer} {poststed}
            </Detaljeliste>
        );
    } else if (adresse.type === "gateadresse" && adresse.gateadresse) {
        const {gatenavn, husnummer, husbokstav, postnummer, poststed} = adresse.gateadresse;
        return (
            <Detaljeliste>
                {gatenavn} {husnummer}
                {husbokstav}, {postnummer} {poststed}
            </Detaljeliste>
        );
    } else if (adresse.type === "MatrikkelAdresse") {
        const {gaardsnummer, bruksnummer, kommunenummer} = adresse;
        const gnrBnr = `${gaardsnummer ?? ""}${bruksnummer ? ` / ${bruksnummer}` : ""}`;
        return (
            <Detaljeliste>
                <DetaljelisteElement tittel={t("matrikkel.gnrbnr")} verdi={gnrBnr} />
                <DetaljelisteElement tittel={t("matrikkel.kommunenr")} verdi={kommunenummer} />
            </Detaljeliste>
        );
    } else if (adresse.type === "matrikkeladresse" && adresse.matrikkeladresse) {
        const {gaardsnummer, bruksnummer, kommunenummer} = adresse.matrikkeladresse;
        const gnrBnr = `${gaardsnummer ?? ""}${bruksnummer ? ` / ${bruksnummer}` : ""}`;
        return (
            <Detaljeliste>
                <DetaljelisteElement tittel={t("matrikkel.gnrbnr")} verdi={gnrBnr} />
                <DetaljelisteElement tittel={t("matrikkel.kommunenr")} verdi={kommunenummer} />
            </Detaljeliste>
        );
    } else {
        logError(`AdresseVisning fikk hverken gateadresse eller matrikkeladresse! (type ${adresse.type})`);
    }

    return null;
};

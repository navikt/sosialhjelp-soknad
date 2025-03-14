import Detaljeliste, {DetaljelisteElement} from "../../../lib/components/detaljeliste/Detaljeliste";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {logError} from "../../../lib/log/loggerUtils";
import {AdresserDtoBrukerAdresse} from "../../../generated/new/model";

export const AdresseVisning = ({adresse}: {adresse?: AdresserDtoBrukerAdresse}) => {
    const {t} = useTranslation();
    if (!adresse) return null;

    const {type} = adresse;

    if (type === "VegAdresse") {
        const {gatenavn, husnummer, husbokstav, postnummer, poststed} = adresse;
        return (
            <Detaljeliste>
                {gatenavn} {husnummer}
                {husbokstav}, {postnummer} {poststed}
            </Detaljeliste>
        );
    } else if (type === "MatrikkelAdresse") {
        const {gaardsnummer, bruksnummer, kommunenummer} = adresse;
        const gnrBnr = `${gaardsnummer ?? ""}${bruksnummer ? ` / ${bruksnummer}` : ""}`;
        return (
            <Detaljeliste>
                <DetaljelisteElement tittel={t("matrikkel.gnrbnr")} verdi={gnrBnr} />
                <DetaljelisteElement tittel={t("matrikkel.kommunenr")} verdi={kommunenummer} />
            </Detaljeliste>
        );
    } else {
        logError(`AdresseVisning fikk hverken gateadresse eller matrikkeladresse! (type ${type})`);
    }

    return null;
};

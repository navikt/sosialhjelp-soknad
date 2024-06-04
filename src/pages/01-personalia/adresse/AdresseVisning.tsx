import Detaljeliste, {DetaljelisteElement} from "../../../lib/components/detaljeliste/Detaljeliste";
import * as React from "react";
import {AdresseFrontend} from "../../../generated/model";
import {useTranslation} from "react-i18next";
import {logError} from "../../../lib/utils/loggerUtils";

export const AdresseVisning = ({adresse}: {adresse?: AdresseFrontend}) => {
    const {t} = useTranslation();
    if (!adresse) return null;

    const {gateadresse, matrikkeladresse, type} = adresse;

    if (gateadresse) {
        const {gatenavn, husnummer, husbokstav, postnummer, poststed} = gateadresse;
        return (
            <Detaljeliste>
                {gatenavn} {husnummer}
                {husbokstav}, {postnummer} {poststed}
            </Detaljeliste>
        );
    } else if (matrikkeladresse) {
        const {gaardsnummer, bruksnummer, kommunenummer} = matrikkeladresse;
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

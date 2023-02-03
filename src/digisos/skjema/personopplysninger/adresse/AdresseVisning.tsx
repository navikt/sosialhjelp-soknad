import Detaljeliste, {DetaljelisteElement} from "../../../../nav-soknad/components/detaljeliste";
import * as React from "react";
import {AdresseFrontend} from "../../../../generated/model";
import {useTranslation} from "react-i18next";

export const AdresseVisning = ({adresse}: {adresse?: AdresseFrontend}) => {
    const {t} = useTranslation();
    if (!adresse) return null;

    switch (adresse.type) {
        case "gateadresse":
            const {gatenavn, husnummer, husbokstav, postnummer, poststed} = adresse.gateadresse!;
            return (
                <Detaljeliste>
                    <li className="detaljeliste__element">
                        {gatenavn} {husnummer}
                        {husbokstav}
                    </li>
                    <li className="detaljeliste__element">
                        {postnummer} {poststed}
                    </li>
                </Detaljeliste>
            );
        case "matrikkeladresse":
            const {gaardsnummer, bruksnummer, kommunenummer} = adresse.matrikkeladresse!;
            const gnrBnr = `${gaardsnummer ?? ""}${bruksnummer ? ` / ${bruksnummer}` : ""}`;
            return (
                <Detaljeliste>
                    <DetaljelisteElement tittel={t("matrikkel.gnrbnr")} verdi={gnrBnr} />
                    <DetaljelisteElement tittel={t("matrikkel.kommunenr")} verdi={kommunenummer} />
                </Detaljeliste>
            );
        default:
            return null;
    }
};

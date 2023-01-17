import Detaljeliste, {DetaljelisteElement} from "../../../../nav-soknad/components/detaljeliste";
import {FormattedMessage} from "react-intl";
import * as React from "react";
import {AdresseFrontend} from "../../../../generated/model";

export const AdresseVisning = ({adresse}: {adresse?: AdresseFrontend}) => {
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
                    <DetaljelisteElement tittel={<FormattedMessage id="matrikkel.gnrbnr" />} verdi={gnrBnr} />
                    <DetaljelisteElement tittel={<FormattedMessage id="matrikkel.kommunenr" />} verdi={kommunenummer} />
                </Detaljeliste>
            );
        default:
            return null;
    }
};

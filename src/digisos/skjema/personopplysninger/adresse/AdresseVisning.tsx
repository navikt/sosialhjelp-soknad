import {useAlgebraic} from "../../../../lib/hooks/useAlgebraic";
import {useHentAdresser} from "../../../../generated/adresse-ressurs/adresse-ressurs";
import {useBehandlingsId} from "../../../../nav-soknad/hooks/useBehandlingsId";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import Detaljeliste, {DetaljelisteElement} from "../../../../nav-soknad/components/detaljeliste";
import {FormattedMessage} from "react-intl";
import * as React from "react";
import {useErrorHandler} from "../../../../lib/hooks/useErrorHandler";

export const AdresseVisning = ({valg}: {valg: "folkeregistrert" | "midlertidig"}) => {
    const {request} = useAlgebraic(useHentAdresser(useBehandlingsId()));
    const errorHandler = useErrorHandler();

    return request.match({
        NotAsked: () => null,
        Loading: () => <TextPlaceholder lines={3} />,
        Done: (response) =>
            response.match({
                Error: errorHandler,
                Ok: (adresser) => {
                    const adresse = adresser[valg];
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
                                    <DetaljelisteElement
                                        tittel={<FormattedMessage id="matrikkel.gnrbnr" />}
                                        verdi={gnrBnr}
                                    />
                                    <DetaljelisteElement
                                        tittel={<FormattedMessage id="matrikkel.kommunenr" />}
                                        verdi={kommunenummer}
                                    />
                                </Detaljeliste>
                            );
                        default:
                            return null;
                    }
                },
            }),
    });
};

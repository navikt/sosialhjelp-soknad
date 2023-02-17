import * as React from "react";
import Informasjonspanel from "../../../../nav-soknad/components/Informasjonspanel";
import {Alert, Link} from "@navikt/ds-react";
import {NavEnhetFrontend} from "../../../../generated/model";
import {Trans, useTranslation} from "react-i18next";
import {erAktiv} from "../../../../nav-soknad/containers/navEnhetStatus";

export const NavEnhetInaktiv = ({navEnhet}: {navEnhet?: NavEnhetFrontend}) => {
    const {t} = useTranslation();

    if (!navEnhet) return null;

    if (navEnhet.isMottakDeaktivert)
        return (
            <Alert variant="warning">
                <Trans
                    t={t}
                    i18nKey={"adresse.alertstripe.advarsel.v2"}
                    values={{kommuneNavn: navEnhet.kommunenavn ?? "Din"}}
                    components={{
                        lenke: (
                            <Link href="https://www.nav.no/sosialhjelp/sok-papir" target="_blank">
                                {null}
                            </Link>
                        ),
                    }}
                />
            </Alert>
        );

    if (navEnhet.isMottakMidlertidigDeaktivert)
        return (
            <Alert variant="error">
                <Trans
                    t={t}
                    i18nKey={"adresse.alertstripe.feil.v2"}
                    values={{kommuneNavn: navEnhet?.kommunenavn ?? "Din"}}
                    components={{
                        lenke: (
                            <Link href="https://www.nav.no/sosialhjelp/sok-papir" target="_blank">
                                {null}
                            </Link>
                        ),
                    }}
                />
            </Alert>
        );
    return null;
};
const NavEnhet = ({navEnhet}: {navEnhet?: NavEnhetFrontend}) => {
    if (!navEnhet) return null;

    const {enhetsnavn, kommunenavn} = navEnhet;

    if (!erAktiv(navEnhet)) return <NavEnhetInaktiv navEnhet={navEnhet} />;
    else
        return (
            <Informasjonspanel ikon={"konvolutt"} farge={"suksess"}>
                {`Søknaden vil bli sendt til: ${enhetsnavn}, ${kommunenavn} kommune.`}
            </Informasjonspanel>
        );
};

export default NavEnhet;

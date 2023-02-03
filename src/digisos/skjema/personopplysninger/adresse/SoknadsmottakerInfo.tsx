import * as React from "react";
import Informasjonspanel from "../../../../nav-soknad/components/Informasjonspanel";
import {Alert, Link} from "@navikt/ds-react";
import {NavEnhetFrontend} from "../../../../generated/model";
import {Trans, useTranslation} from "react-i18next";

const SoknadsmottakerInfo = ({navEnhet}: {navEnhet?: NavEnhetFrontend}) => {
    const {t} = useTranslation();

    if (!navEnhet) return null;

    const {enhetsnavn, kommunenavn, isMottakDeaktivert, isMottakMidlertidigDeaktivert} = navEnhet;

    if (isMottakMidlertidigDeaktivert) {
        return (
            <Alert variant="error">
                <Trans
                    t={t}
                    i18nKey={"adresse.alertstripe.feil.v2"}
                    values={{kommunenavn}}
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
    }

    if (isMottakDeaktivert) {
        // ORANSJE
        return (
            <Alert variant="warning">
                <Trans
                    t={t}
                    i18nKey={"adresse.alertstripe.advarsel.v2"}
                    values={{kommuneNavn: kommunenavn}}
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
    }

    return (
        <Informasjonspanel ikon={"konvolutt"} farge={"suksess"}>
            {`Søknaden vil bli sendt til: ${enhetsnavn}, ${kommunenavn} kommune.`}
        </Informasjonspanel>
    );
};

export default SoknadsmottakerInfo;

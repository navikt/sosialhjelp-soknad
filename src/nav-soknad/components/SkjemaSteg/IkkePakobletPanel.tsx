import {Trans, useTranslation} from "react-i18next";
import {Alert, Link} from "@navikt/ds-react";
import * as React from "react";
import {useHentAdresser} from "../../../generated/adresse-ressurs/adresse-ressurs";
import {useBehandlingsId} from "../../hooks/useBehandlingsId";
import {useAlgebraic} from "../../../lib/hooks/useAlgebraic";

export const IkkePakobletPanel = () => {
    const {expectOK} = useAlgebraic(useHentAdresser(useBehandlingsId()));
    const {t} = useTranslation();

    return expectOK(({navEnhet}) => {
        if (!navEnhet?.isMottakDeaktivert) return null;

        return (
            <Alert variant="warning">
                <Trans
                    t={t}
                    i18nKey={"adresse.alertstripe.advarsel.v2"}
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
    });
};

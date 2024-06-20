import {Trans, useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../lib/hooks/common/useBehandlingsId";
import {useHentAdresser} from "../../../generated/adresse-ressurs/adresse-ressurs";
import {Alert, Link} from "@navikt/ds-react";
import * as React from "react";

export const NavEnhetInaktiv = () => {
    const {t} = useTranslation();
    const behandlingsId = useBehandlingsId();
    const {data: adresser} = useHentAdresser(behandlingsId);

    if (!adresser?.navEnhet) return null;

    const {isMottakDeaktivert, isMottakMidlertidigDeaktivert, kommunenavn} = adresser.navEnhet;

    if (isMottakDeaktivert)
        return (
            <Alert variant="warning">
                <Trans
                    t={t}
                    i18nKey={"adresse.alertstripe.advarsel.v2"}
                    values={{kommuneNavn: kommunenavn ?? "Din"}}
                    components={{
                        lenke: (
                            <Link href="https://www.nav.no/start/okonomisk-sosialhjelp" target="_blank">
                                {null}
                            </Link>
                        ),
                    }}
                />
            </Alert>
        );

    if (isMottakMidlertidigDeaktivert)
        return (
            <Alert variant="error">
                <Trans
                    t={t}
                    i18nKey={"adresse.alertstripe.feil.v2"}
                    values={{kommuneNavn: kommunenavn ?? "Din"}}
                    components={{
                        lenke: (
                            <Link href="https://www.nav.no/start/okonomisk-sosialhjelp" target="_blank">
                                {null}
                            </Link>
                        ),
                    }}
                />
            </Alert>
        );
    return null;
};

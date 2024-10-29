import {Trans, useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../lib/hooks/common/useBehandlingsId";
import {useHentAdresser} from "../../../generated/adresse-ressurs/adresse-ressurs";
import {Alert, Link} from "@navikt/ds-react";
import * as React from "react";
import {useIsNyDatamodell} from "../../../generated/soknad-ressurs/soknad-ressurs.ts";
import {useGetAdresser} from "../../../generated/new/adresse-controller/adresse-controller.ts";

export const NavEnhetInaktiv = () => {
    const {t} = useTranslation();
    const behandlingsId = useBehandlingsId();
    const {data: isNyModell} = useIsNyDatamodell(behandlingsId);
    const {data: adresser} = useHentAdresser(behandlingsId, {query: {enabled: isNyModell === false}});
    const {data: adresserNy} = useGetAdresser(behandlingsId, {query: {enabled: isNyModell === true}});

    if (!adresser?.navEnhet && !adresserNy?.navenhet) return null;

    const isMottakDeaktivert = adresser?.navEnhet?.isMottakDeaktivert ?? adresserNy?.navenhet?.isMottakDeaktivert;
    const isMottakMidlertidigDeaktivert =
        adresser?.navEnhet?.isMottakMidlertidigDeaktivert ?? adresserNy?.navenhet?.isMottakMidlertidigDeaktivert;
    const kommunenavn = adresser?.navEnhet?.kommunenavn ?? adresserNy?.navenhet?.kommunenavn;

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

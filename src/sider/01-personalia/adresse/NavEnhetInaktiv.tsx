import {useBehandlingsId} from "../../../lib/hooks/common/useBehandlingsId";
import {Alert, BodyShort, Link} from "@navikt/ds-react";
import * as React from "react";
import {useTranslations} from "next-intl";
import {useGetAdresser} from "../../../generated/new/adresse-controller/adresse-controller.ts";

export const NavEnhetInaktiv = () => {
    const t = useTranslations("NavEnhetInaktiv");
    const behandlingsId = useBehandlingsId();
    const {data: adresser} = useGetAdresser(behandlingsId);

    if (!adresser?.navenhet) return null;

    const {isMottakDeaktivert, isMottakMidlertidigDeaktivert} = adresser.navenhet;

    const kommunenavn = adresser.navenhet.kommunenavn ?? "";

    if (isMottakDeaktivert)
        return (
            <Alert variant="warning">
                <BodyShort>{t("varig.melding", {kommunenavn})}</BodyShort>
                {t.rich("varig.forslag", {
                    lenke: (chunks) => (
                        <Link href="https://www.nav.no/start/okonomisk-sosialhjelp" target="_blank">
                            {chunks}
                        </Link>
                    ),
                })}
            </Alert>
        );

    if (isMottakMidlertidigDeaktivert)
        return (
            <Alert variant="error">
                <BodyShort>{t("midlertidig.melding", {kommunenavn})}</BodyShort>
                {t.rich("midlertidig.forslag", {
                    lenke: (chunks) => (
                        <Link href="https://www.nav.no/start/okonomisk-sosialhjelp" target="_blank">
                            {chunks}
                        </Link>
                    ),
                })}
            </Alert>
        );
    return null;
};

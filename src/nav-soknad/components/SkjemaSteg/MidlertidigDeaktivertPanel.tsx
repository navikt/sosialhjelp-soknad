import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";
import {useSoknad} from "../../../digisos/redux/soknad/useSoknad";
import {Trans, useTranslation} from "react-i18next";
import {Alert, Link} from "@navikt/ds-react";
import * as React from "react";

export const MidlertidigDeaktivertPanel = () => {
    const {
        personalia: {navEnhet},
    } = useSoknadsdata();
    const {visMidlertidigDeaktivertPanel} = useSoknad();
    const {t} = useTranslation();

    if (!visMidlertidigDeaktivertPanel) return null;

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
};

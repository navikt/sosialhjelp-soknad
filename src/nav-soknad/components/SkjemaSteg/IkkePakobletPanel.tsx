import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";
import {useSoknad} from "../../../digisos/redux/soknad/useSoknad";
import {Trans, useTranslation} from "react-i18next";
import {Alert, Link} from "@navikt/ds-react";
import * as React from "react";

export const IkkePakobletPanel = () => {
    const {
        personalia: {navEnhet},
    } = useSoknadsdata();
    const {visIkkePakobletPanel} = useSoknad();
    const {t} = useTranslation();
    if (!visIkkePakobletPanel) return null;

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
};

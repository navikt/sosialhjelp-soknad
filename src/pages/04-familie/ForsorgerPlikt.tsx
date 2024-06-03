import * as React from "react";
import {RegistrerteBarn} from "./RegistrerteBarn";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {BodyShort, Heading} from "@navikt/ds-react";
import {useHentForsorgerplikt} from "../../generated/forsorgerplikt-ressurs/forsorgerplikt-ressurs";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";

export const ForsorgerPlikt = () => {
    const {t} = useTranslation("skjema");
    const {expectOK} = useAlgebraic(useHentForsorgerplikt(useBehandlingsId()));

    return expectOK(({ansvar}) => {
        if (!ansvar.length)
            return (
                <div>
                    <Heading size={"medium"} level={"3"} spacing>
                        {t("familierelasjon.faktum.sporsmal")}
                    </Heading>
                    <BodyShort spacing>
                        {t("familierelasjon.ingen_registrerte_barn_tekst")} <br />
                        {t("familierelasjon.hentet_fra_folkeregisteret")} <br />
                    </BodyShort>
                </div>
            );

        return (
            <div className={"space-y-4"}>
                <Heading size={"medium"} level={"3"} spacing>
                    {t("familierelasjon.faktum.sporsmal")}
                </Heading>
                <BodyShort>
                    {t("familierelasjon.faktum.sporsmal")} <br />
                    {t(
                        ansvar.length === 1
                            ? "familierelasjon.ingress_antallBarn.entall"
                            : "familierelasjon.ingress_antallBarn",
                        {antallBarn: ansvar.length}
                    )}
                    <br />
                    {t("familierelasjon.hentet_fra_folkeregisteret")} <br />
                </BodyShort>
                <RegistrerteBarn />
            </div>
        );
    });
};

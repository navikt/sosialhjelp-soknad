import * as React from "react";
import Barnebidrag from "./Barnebidrag";
import RegistrerteBarn from "./RegistrerteBarn";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {BodyShort, Detail, Heading} from "@navikt/ds-react";
import {useHentForsorgerplikt} from "../../../generated/forsorgerplikt-ressurs/forsorgerplikt-ressurs";
import {useAlgebraic} from "../../../lib/hooks/useAlgebraic";

const ForsorgerPliktView = () => {
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
                        <Detail>{t("familierelasjon.ingen_registrerte_barn_tittel")}</Detail>
                        {t("familierelasjon.ingen_registrerte_barn_tekst")}
                    </BodyShort>
                </div>
            );

        return (
            <div className={"space-y-4"}>
                <Heading size={"medium"} level={"3"} spacing>
                    {t("familierelasjon.faktum.sporsmal")}
                </Heading>
                <BodyShort spacing>
                    <Detail>{t("familierelasjon.ingress_folkeregisteret")}</Detail>
                    {t("familierelasjon.ingress_forsorger")}:{" "}
                    {t(
                        ansvar.length === 1
                            ? "familierelasjon.ingress_antallBarn.entall"
                            : "familierelasjon.ingress_antallBarn",
                        {antallBarn: ansvar.length}
                    )}
                </BodyShort>
                <RegistrerteBarn />
                <Barnebidrag />
            </div>
        );
    });
};

export default ForsorgerPliktView;

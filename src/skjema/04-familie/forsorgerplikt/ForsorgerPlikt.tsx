import * as React from "react";
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import Barnebidrag from "./Barnebidrag";
import RegistrerteBarn from "./RegistrerteBarn";
import {getFaktumSporsmalTekst} from "../../../nav-soknad/utils";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {BodyShort} from "@navikt/ds-react";
import {useHentForsorgerplikt} from "../../../generated/forsorgerplikt-ressurs/forsorgerplikt-ressurs";
import {useAlgebraic} from "../../../lib/hooks/useAlgebraic";

const ForsorgerPliktView = () => {
    const {t} = useTranslation("skjema");
    const behandlingsId = useBehandlingsId();
    const {expectOK} = useAlgebraic(useHentForsorgerplikt(behandlingsId));

    return expectOK(({ansvar}) => {
        if (!ansvar) return null;

        if (ansvar.length) {
            return (
                <Sporsmal
                    tekster={getFaktumSporsmalTekst(t, "familierelasjon.faktum")}
                    stil="system"
                    legendTittelStyle={LegendTittleStyle.DEFAULT}
                >
                    <BodyShort spacing>
                        <span>{t("familierelasjon.ingress_folkeregisteret")}</span>
                        <br />
                        <span>
                            <b>{t("familierelasjon.ingress_forsorger")}</b>:{" "}
                            {t("familierelasjon.ingress_antallBarn", {antallBarn: ansvar.length})}
                        </span>
                    </BodyShort>

                    <RegistrerteBarn />
                    <Barnebidrag />
                </Sporsmal>
            );
        } else {
            return (
                <Sporsmal tekster={getFaktumSporsmalTekst(t, "familierelasjon.faktum")}>
                    <p>{t("familierelasjon.ingen_registrerte_barn_tittel")}</p>
                    <p>
                        <b>{t("familierelasjon.ingen_registrerte_barn_tekst")}</b>
                    </p>
                </Sporsmal>
            );
        }
    });
};

export default ForsorgerPliktView;

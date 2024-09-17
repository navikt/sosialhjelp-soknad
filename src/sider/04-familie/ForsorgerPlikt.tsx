import * as React from "react";
import {RegistrerteBarn} from "./RegistrerteBarn";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {BodyShort, Heading as DSHeading} from "@navikt/ds-react";
import {useHentForsorgerplikt} from "../../generated/forsorgerplikt-ressurs/forsorgerplikt-ressurs";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";

interface Props {
    heading?: JSX.Element;
    skipForm?: boolean;
}

const Heading = () => {
    const {t} = useTranslation("skjema");
    return (
        <>
            <DSHeading size={"medium"} level={"3"} spacing>
                {t("familierelasjon.faktum.sporsmal")}
            </DSHeading>
        </>
    );
};
export const ForsorgerPlikt = ({skipForm, heading = <Heading />}: Props) => {
    const {t} = useTranslation("skjema");
    const {expectOK} = useAlgebraic(useHentForsorgerplikt(useBehandlingsId()));

    return expectOK(({ansvar}) => {
        if (!ansvar.length)
            return (
                <div>
                    {heading}
                    <BodyShort spacing>
                        {t("familierelasjon.ingen_registrerte_barn_tekst")} <br />
                        {t("familierelasjon.hentet_fra_folkeregisteret")} <br />
                    </BodyShort>
                </div>
            );

        return (
            <div className={"space-y-4"}>
                {heading}
                <BodyShort>
                    {t("familierelasjon.ingress_forsorger")} <br />
                    {t("familierelasjon.ingress.antallBarn", {count: ansvar.length})}
                    <br />
                    {t("familierelasjon.hentet_fra_folkeregisteret")} <br />
                </BodyShort>
                <RegistrerteBarn skipForm={skipForm} />
            </div>
        );
    });
};

import * as React from "react";
import {RegistrerteBarn} from "./RegistrerteBarn";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {BodyShort, Heading as DSHeading} from "@navikt/ds-react";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useGetForsorgerplikt} from "../../generated/new/forsorgerplikt-controller/forsorgerplikt-controller.ts";
import {ReactNode} from "react";

interface Props {
    heading?: ReactNode;
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
    const {expectOK} = useAlgebraic(useGetForsorgerplikt(useBehandlingsId()));

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

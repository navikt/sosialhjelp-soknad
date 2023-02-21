import * as React from "react";
import {digisosSkjemaConfig} from "../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import Penger from "../../nav-soknad/components/svg/illustrasjoner/Penger";
import Bostotte from "./bostotte/Bostotte";
import Utbetalinger from "./utbetalinger";
import Verdier from "./verdier/Verdier";
import Formue from "./formue/Formue";
import NavYtelser from "./navytelser";
import SkattbarInntekt from "./skattbarInntekt";
import Studielan from "./studielan/Studielan";
import StegMedNavigasjon from "../../nav-soknad/components/SkjemaSteg/SkjemaStegLegacy";
import {Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

const InntektFormue = () => {
    const {t} = useTranslation("skjema");

    return (
        <StegMedNavigasjon skjemaConfig={digisosSkjemaConfig} steg={"inntektbolk"} ikon={<Penger />}>
            <div className={"skjema-sporsmal"}>
                <SkattbarInntekt />
                <NavYtelser />
                <Bostotte />
            </div>

            <Studielan />
            <Utbetalinger />
            <div>
                <Heading size={"medium"}>{t("opplysninger.formue.bank.undertittel")}</Heading>
                <Formue />
            </div>
            <div>
                <Heading size={"medium"}>{t("opplysninger.formue.annen.undertittel")}</Heading>
                <Verdier />
            </div>
        </StegMedNavigasjon>
    );
};

export default InntektFormue;

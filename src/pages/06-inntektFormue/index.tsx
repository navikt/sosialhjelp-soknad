import * as React from "react";
import {digisosSkjemaConfig} from "../../lib/components/SkjemaSteg/digisosSkjema";
import {Penger} from "../../lib/components/svg/illustrasjoner/Penger";
import {Bostotte} from "./bostotte/Bostotte";
import {Utbetalinger} from "./Utbetalinger";
import {Verdier} from "./Verdier";
import {Formue} from "./Formue";
import {NavYtelser} from "./navytelser";
import {Studielan} from "./Studielan";
import {SkattbarInntekt} from "./skattbarInntekt";
import {SkjemaStegLegacy} from "../../lib/components/SkjemaSteg/SkjemaStegLegacy";
import {Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

export const InntektFormue = () => {
    const {t} = useTranslation("skjema");

    return (
        <SkjemaStegLegacy skjemaConfig={digisosSkjemaConfig} steg={"inntektbolk"} ikon={<Penger />}>
            <div>
                <Heading size="medium" level="2" spacing>
                    {t("utbetalinger.inntekt.skattbar.tittel")}
                </Heading>
                <SkattbarInntekt />
            </div>

            <NavYtelser />
            <Bostotte />

            <Studielan />
            <div>
                <Heading size="medium" level="2" spacing>
                    {t("inntekt.inntekter.tittel")}
                </Heading>
                <Utbetalinger />
            </div>

            <div>
                <Heading size={"medium"}>{t("opplysninger.formue.bank.undertittel")}</Heading>
                <Formue />
            </div>
            <div>
                <Heading size={"medium"}>{t("opplysninger.formue.annen.undertittel")}</Heading>
                <Verdier />
            </div>
        </SkjemaStegLegacy>
    );
};
export default InntektFormue;

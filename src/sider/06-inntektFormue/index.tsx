import * as React from "react";
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
import {useSkjemaNavigation} from "../../lib/components/SkjemaSteg/useSkjemaNavigation.ts";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";
import {SkjemaHeadings} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg.tsx";

export const InntektFormue = () => {
    const {t} = useTranslation("skjema");
    const {gotoPage} = useSkjemaNavigation(5);

    return (
        <SkjemaStegLegacy steg={"inntektbolk"}>
            <SkjemaStegTitle title={t(SkjemaHeadings[6].tittel)} icon={SkjemaHeadings[6].ikon} />

            <div>
                <Heading size="medium" level="2" spacing>
                    {t("utbetalinger.inntekt.skattbar.tittel")}
                </Heading>
                <SkattbarInntekt legend={t("utbetalinger.inntekt.skattbar.samtykke_sporsmal_v2")} />
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
            <SkjemaStegButtons onNext={async () => gotoPage(5)} onPrevious={async () => gotoPage(7)} />
        </SkjemaStegLegacy>
    );
};
export default InntektFormue;

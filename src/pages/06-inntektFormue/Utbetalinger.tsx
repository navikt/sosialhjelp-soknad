import * as React from "react";
import {useTranslation} from "react-i18next";
import {Checkbox, CheckboxGroup, ReadMore, Textarea} from "@navikt/ds-react";
import {UtbetalingerFrontend} from "../../generated/model";
import {YesNoInput} from "../../lib/components/form/YesNoInput";
import {useUtbetalinger} from "../../lib/hooks/data/useUtbetalinger";
import {useBeskrivelse} from "../../lib/hooks/common/useBeskrivelse";
import {UnmountClosed} from "react-collapse";
import {NyttUnderskjema} from "../05-bosituasjon/NyttUnderskjema";

export const Utbetalinger = () => {
    const {utbetalinger, setBekreftelse, setUtbetalinger, setBeskrivelseAvAnnet} = useUtbetalinger();
    const {t} = useTranslation("skjema");
    const {registerAnnet} = useBeskrivelse(utbetalinger?.beskrivelseAvAnnet || "", setBeskrivelseAvAnnet);

    if (!utbetalinger) return null;

    return (
        <div>
            <YesNoInput
                legend={t("inntekt.inntekter.sporsmal")}
                description={
                    <ReadMore header={t("inntekt.inntekter.lesmer")}>
                        {t("inntekt.inntekter.hjelpetekst.tekst")}
                    </ReadMore>
                }
                defaultValue={utbetalinger.bekreftelse}
                onChange={setBekreftelse}
                name={"utbetalinger-bekreftelse"}
            />

            {utbetalinger.bekreftelse && (
                <NyttUnderskjema>
                    <CheckboxGroup
                        legend={t("inntekt.inntekter.true.type.sporsmal")}
                        onChange={(navn: (keyof UtbetalingerFrontend)[]) => setUtbetalinger(navn)}
                        value={Object.keys(utbetalinger).filter(
                            (key) => utbetalinger[key as keyof UtbetalingerFrontend]
                        )}
                    >
                        <Checkbox value={"utbytte"}>{t("inntekt.inntekter.true.type.utbytte")}</Checkbox>
                        <Checkbox value={"salg"}>{t("inntekt.inntekter.true.type.salg")}</Checkbox>
                        <Checkbox value={"forsikring"}>
                            {t("inntekt.inntekter.true.type.forsikringsutbetalinger")}
                        </Checkbox>
                        <Checkbox value={"annet"}>{t("inntekt.inntekter.true.type.annet")}</Checkbox>
                        <UnmountClosed isOpened={utbetalinger.annet}>
                            <Textarea
                                label={t("inntekt.inntekter.true.type.annet.true.beskrivelse.label")}
                                {...registerAnnet}
                            />
                        </UnmountClosed>
                    </CheckboxGroup>
                </NyttUnderskjema>
            )}
        </div>
    );
};

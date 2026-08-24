import * as React from "react";
import {useTranslation} from "react-i18next";
import {Checkbox, CheckboxGroup, ReadMore, Textarea} from "@navikt/ds-react";
import YesNoInput from "../../lib/components/form/YesNoInput";
import {useUtbetalinger} from "../../lib/hooks/data/useUtbetalinger";
import {MAX_CHARS, useBeskrivelse} from "../../lib/hooks/common/useBeskrivelse";
import {UnmountClosed} from "react-collapse";
import {NyttUnderskjema} from "../05-bosituasjon/NyttUnderskjema";
import {UtbetalingerDto} from "../../generated/new/model";

type CheckboxValue = "utbytte" | "salg" | "forsikring" | "annet";
export const CHECKBOX_VALUES: CheckboxValue[] = ["utbytte", "salg", "forsikring", "annet"];
const MAPPING: {value: CheckboxValue; key: keyof UtbetalingerDto}[] = [
    {key: "hasUtbytte", value: "utbytte"},
    {key: "hasSalg", value: "salg"},
    {key: "hasForsikring", value: "forsikring"},
    {key: "hasAnnenUtbetaling", value: "annet"},
];

export const Utbetalinger = () => {
    const {utbetalinger, setBekreftelse, setUtbetalinger, setBeskrivelseAvAnnet, harBekreftelse} = useUtbetalinger();
    const {t} = useTranslation("skjema");
    const {registerAnnet} = useBeskrivelse(utbetalinger?.beskrivelseUtbetaling || "", setBeskrivelseAvAnnet);

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
                value={harBekreftelse}
                onChange={setBekreftelse}
                name={"utbetalinger-bekreftelse"}
            />

            {harBekreftelse && (
                <NyttUnderskjema>
                    <CheckboxGroup
                        legend={t("inntekt.inntekter.true.type.sporsmal")}
                        onChange={(navn: CheckboxValue[]) => setUtbetalinger(navn)}
                        value={MAPPING.filter(({key}) => utbetalinger[key]).map(({value}) => value)}
                    >
                        <Checkbox value={"utbytte" satisfies CheckboxValue}>
                            {t("inntekt.inntekter.true.type.utbytte")}
                        </Checkbox>
                        <Checkbox value={"salg" satisfies CheckboxValue}>
                            {t("inntekt.inntekter.true.type.salg")}
                        </Checkbox>
                        <Checkbox value={"forsikring" satisfies CheckboxValue}>
                            {t("inntekt.inntekter.true.type.forsikringsutbetalinger")}
                        </Checkbox>
                        <Checkbox value={"annet" satisfies CheckboxValue}>
                            {t("inntekt.inntekter.true.type.annet.stringValue")}
                        </Checkbox>
                        <UnmountClosed isOpened={utbetalinger.hasAnnenUtbetaling}>
                            <Textarea
                                label={t("inntekt.inntekter.true.type.annet.true.beskrivelse.label")}
                                {...registerAnnet}
                                maxLength={MAX_CHARS}
                            />
                        </UnmountClosed>
                    </CheckboxGroup>
                </NyttUnderskjema>
            )}
        </div>
    );
};

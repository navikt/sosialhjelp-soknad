import * as React from "react";
import NivaTreSkjema from "../../../nav-soknad/components/nivaTreSkjema";
import {useTranslation} from "react-i18next";
import {Checkbox, CheckboxGroup, ReadMore, Textarea} from "@navikt/ds-react";
import {UtbetalingerFrontend} from "../../../generated/model";
import {YesNoInput} from "../../../nav-soknad/components/form/YesNoInput";
import {z} from "zod";
import {ValideringsFeilKode} from "../../../digisos/redux/validering/valideringActionTypes";
import {useUtbetalinger} from "./useUtbetalinger";

const MAX_CHARS = 500;

const BeskrivelseAvAnnetSchema = z.string().max(MAX_CHARS, {
    message: ValideringsFeilKode.MAX_LENGDE,
});
export const UtbetalingerView = () => {
    const [annet, setAnnet] = React.useState<string>("");
    const [beskrivelseAvAnnetError, setBeskrivelseAvAnnetError] = React.useState<string | undefined>(undefined);

    const {utbetalinger, setBekreftelse, setUtbetalinger, setBeskrivelseAvAnnet} = useUtbetalinger();
    const {t} = useTranslation("skjema");

    if (!utbetalinger) return null;
    const onChangeAnnet = (value: string) => {
        try {
            setAnnet(BeskrivelseAvAnnetSchema.parse(value));
        } catch (e) {
            setBeskrivelseAvAnnetError(t(e.issues[0].message));
        }
    };

    return (
        <div>
            <YesNoInput
                legend={t("inntekt.inntekter.tittel")}
                description={
                    <ReadMore header={t("generelt.merinfo")}>{t("inntekt.inntekter.hjelpetekst.tekst")}</ReadMore>
                }
                defaultValue={utbetalinger.bekreftelse}
                onChange={setBekreftelse}
                name={"utbetalinger-bekreftelse"}
            />

            {utbetalinger.bekreftelse && (
                <CheckboxGroup
                    legend={t("inntekt.inntekter.true.type.sporsmal")}
                    onChange={(navn: (keyof UtbetalingerFrontend)[]) => setUtbetalinger(navn)}
                    value={Object.keys(utbetalinger).filter((key) => utbetalinger[key as keyof UtbetalingerFrontend])}
                >
                    <Checkbox value={"utbytte"}>{t("inntekt.inntekter.true.type.utbytte")}</Checkbox>
                    <Checkbox value={"salg"}>{t("inntekt.inntekter.true.type.salg")}</Checkbox>
                    <Checkbox value={"forsikring"}>{t("inntekt.inntekter.true.type.forsikringsutbetalinger")}</Checkbox>
                    <Checkbox value={"annet"}>{t("inntekt.inntekter.true.type.annet")}</Checkbox>
                    <NivaTreSkjema visible={utbetalinger.annet} size="small">
                        <Textarea
                            onChange={(evt: any) => onChangeAnnet(evt.target.value)}
                            onBlur={(evt: any) => !beskrivelseAvAnnetError && setBeskrivelseAvAnnet(evt.target.value)}
                            label={t("inntekt.inntekter.true.type.annet.true.beskrivelse.label")}
                            value={annet}
                            error={beskrivelseAvAnnetError}
                        />
                    </NivaTreSkjema>
                </CheckboxGroup>
            )}
        </div>
    );
};

export default UtbetalingerView;

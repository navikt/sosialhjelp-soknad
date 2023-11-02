import * as React from "react";
import NivaTreSkjema from "../../../nav-soknad/components/nivaTreSkjema";
import {useTranslation} from "react-i18next";
import {Checkbox, CheckboxGroup, Textarea} from "@navikt/ds-react";
import {VerdierFrontend} from "../../../generated/model";
import {YesNoInput} from "../../../nav-soknad/components/form/YesNoInput";
import {DigisosReadMore} from "../formue/DigisosReadMore";
import {useVerdier} from "./useVerdier";
import {useBeskrivelse} from "../useBeskrivelse";

export const VerdierView = () => {
    const {verdier, setBekreftelse, setBeskrivelseAvAnnet, setVerdier} = useVerdier();
    const {t} = useTranslation("skjema");
    const {registerAnnet} = useBeskrivelse(verdier?.beskrivelseAvAnnet, setBeskrivelseAvAnnet);
    if (!verdier) return null;

    return (
        <div>
            <YesNoInput
                name={"verdier-bekreftelse"}
                legend={t("inntekt.eierandeler.sporsmal")}
                description={
                    <>
                        {t("inntekt.eierandeler.infotekst.tekst")}
                        <DigisosReadMore>{t("inntekt.eierandeler.hjelpetekst.tekst")}</DigisosReadMore>
                    </>
                }
                defaultValue={verdier.bekreftelse}
                onChange={setBekreftelse}
            />
            {verdier?.bekreftelse && (
                <CheckboxGroup
                    legend={t("inntekt.eierandeler.true.type.sporsmal")}
                    onChange={(navn: (keyof VerdierFrontend)[]) => setVerdier(navn)}
                    value={Object.keys(verdier).filter((key) => verdier[key as keyof VerdierFrontend])}
                >
                    <Checkbox value={"bolig"}>{t("inntekt.eierandeler.true.type.bolig")} </Checkbox>
                    <Checkbox value={"campingvogn"}>{t("inntekt.eierandeler.true.type.campingvogn")}</Checkbox>
                    <Checkbox value={"kjoretoy"}>{t("inntekt.eierandeler.true.type.kjoretoy")}</Checkbox>
                    <Checkbox value={"fritidseiendom"}>{t("inntekt.eierandeler.true.type.fritidseiendom")}</Checkbox>
                    <Checkbox value={"annet"}>{t("inntekt.eierandeler.true.type.annet")}</Checkbox>
                    <NivaTreSkjema visible={verdier.annet} size="small">
                        <Textarea
                            label={t("inntekt.eierandeler.true.type.annet.true.beskrivelse.label")}
                            {...registerAnnet}
                        />
                    </NivaTreSkjema>
                </CheckboxGroup>
            )}
        </div>
    );
};

export default VerdierView;

import * as React from "react";
import {useTranslation} from "react-i18next";
import {Checkbox, CheckboxGroup, Textarea} from "@navikt/ds-react";
import YesNoInput from "../../lib/components/form/YesNoInput";
import {DigisosReadMore} from "../../lib/components/DigisosReadMore";
import {useVerdier} from "../../lib/hooks/data/useVerdier";
import {useBeskrivelse} from "../../lib/hooks/common/useBeskrivelse";
import {UnmountClosed} from "react-collapse";
import {NyttUnderskjema} from "../05-bosituasjon/NyttUnderskjema";
import {VerdierDto} from "../../generated/new/model";

export const Verdier = () => {
    const {verdier, setBekreftelse, setBeskrivelseAvAnnet, setVerdier} = useVerdier();
    const {t} = useTranslation("skjema");
    const {registerAnnet} = useBeskrivelse(verdier?.beskrivelseVerdi || "", setBeskrivelseAvAnnet);
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
                <NyttUnderskjema>
                    <CheckboxGroup
                        legend={t("inntekt.eierandeler.true.type.sporsmal")}
                        onChange={(navn: (keyof VerdierDto)[]) => setVerdier(navn)}
                        value={Object.keys(verdier).filter((key) => verdier[key as keyof VerdierDto])}
                    >
                        <Checkbox value={"hasBolig"}>{t("inntekt.eierandeler.true.type.bolig")}</Checkbox>
                        <Checkbox value={"hasCampingvogn"}>{t("inntekt.eierandeler.true.type.campingvogn")}</Checkbox>
                        <Checkbox value={"hasKjoretoy"}>{t("inntekt.eierandeler.true.type.kjoretoy")}</Checkbox>
                        <Checkbox value={"hasFritidseiendom"}>
                            {t("inntekt.eierandeler.true.type.fritidseiendom")}
                        </Checkbox>
                        <Checkbox value={"hasAnnetVerdi" satisfies keyof VerdierDto}>
                            {t("inntekt.eierandeler.true.type.annet.stringValue")}
                        </Checkbox>
                        <UnmountClosed isOpened={verdier.hasAnnetVerdi ?? false}>
                            <Textarea
                                label={t("inntekt.eierandeler.true.type.annet.true.beskrivelse.label")}
                                {...registerAnnet}
                            />
                        </UnmountClosed>
                    </CheckboxGroup>
                </NyttUnderskjema>
            )}
        </div>
    );
};

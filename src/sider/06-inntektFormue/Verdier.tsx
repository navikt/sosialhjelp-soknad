import * as React from "react";
import {useTranslation} from "react-i18next";
import {Checkbox, CheckboxGroup, Textarea} from "@navikt/ds-react";
import {DigisosReadMore} from "../../lib/components/DigisosReadMore";
import {useVerdier} from "../../lib/hooks/data/useVerdier";
import {useBeskrivelse} from "../../lib/hooks/common/useBeskrivelse";
import {UnmountClosed} from "react-collapse";
import {VerdierDto} from "../../generated/new/model";

export const Verdier = () => {
    const {verdier, setBeskrivelseAvAnnet, setVerdier} = useVerdier();
    const {t} = useTranslation("skjema");
    const {registerAnnet} = useBeskrivelse(verdier?.beskrivelseVerdi || "", setBeskrivelseAvAnnet);
    if (!verdier) return null;

    return (
        <div>
            <CheckboxGroup
                legend={t("inntekt.eierandeler.sporsmal")}
                description={
                    <>
                        {t("inntekt.eierandeler.infotekst.tekst")}
                        <DigisosReadMore>{t("inntekt.eierandeler.hjelpetekst.tekst")}</DigisosReadMore>
                    </>
                }
                onChange={(navn: (keyof VerdierDto)[]) => setVerdier(navn)}
                value={Object.keys(verdier).filter((key) => verdier[key as keyof VerdierDto])}
            >
                <Checkbox value={"hasBolig"}>{t("inntekt.eierandeler.true.type.bolig")}</Checkbox>
                <Checkbox value={"hasCampingvogn"}>{t("inntekt.eierandeler.true.type.campingvogn")}</Checkbox>
                <Checkbox value={"hasKjoretoy"}>{t("inntekt.eierandeler.true.type.kjoretoy")}</Checkbox>
                <Checkbox value={"hasFritidseiendom"}>{t("inntekt.eierandeler.true.type.fritidseiendom")}</Checkbox>
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
        </div>
    );
};

import React from "react";
import {useTranslation} from "react-i18next";
import {Checkbox, CheckboxGroup, Textarea} from "@navikt/ds-react";
import {DigisosReadMore} from "../../lib/components/DigisosReadMore";
import {useBeskrivelse} from "../../lib/hooks/common/useBeskrivelse";
import {UnmountClosed} from "react-collapse";
import {useFormue} from "../../lib/hooks/data/useFormue";

export const Formue = () => {
    const {formue, setFormue, setBeskrivelse} = useFormue();
    const {registerAnnet} = useBeskrivelse(formue?.beskrivelseAvAnnet || "", setBeskrivelse);
    const {t} = useTranslation("skjema");

    if (!formue) return null;

    return (
        <CheckboxGroup
            legend={t("inntekt.bankinnskudd.true.type.sporsmal")}
            description={<DigisosReadMore>{t("inntekt.bankinnskudd.true.type.hjelpetekst.tekst")}</DigisosReadMore>}
            onChange={setFormue}
        >
            <Checkbox name={"brukskonto"} value={"brukskonto"}>
                {t("inntekt.bankinnskudd.true.type.brukskonto")}
            </Checkbox>
            <Checkbox name={"sparekonto"} value={"sparekonto"}>
                {t("inntekt.bankinnskudd.true.type.sparekonto")}
            </Checkbox>
            <Checkbox name={"bsu"} value={"bsu"}>
                {t("inntekt.bankinnskudd.true.type.bsu")}
            </Checkbox>
            <Checkbox name={"livsforsikring"} value={"livsforsikring"}>
                {t("inntekt.bankinnskudd.true.type.livsforsikring")}
            </Checkbox>
            <Checkbox name={"verdipapirer"} value={"verdipapirer"}>
                {t("inntekt.bankinnskudd.true.type.verdipapirer")}
            </Checkbox>
            <Checkbox name={"annet"} value={"annet"}>
                {t("inntekt.bankinnskudd.true.type.annet")}
            </Checkbox>
            <UnmountClosed isOpened={formue?.annet}>
                <Textarea {...registerAnnet} label={t("inntekt.bankinnskudd.true.type.annet.true.beskrivelse.label")} />
            </UnmountClosed>
        </CheckboxGroup>
    );
};

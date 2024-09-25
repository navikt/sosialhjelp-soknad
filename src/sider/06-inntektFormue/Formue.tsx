import React from "react";
import {useTranslation} from "react-i18next";
import {Checkbox, CheckboxGroup} from "@navikt/ds-react";
import {DigisosReadMore} from "../../lib/components/DigisosReadMore";
import {MAX_CHARS, useBeskrivelse} from "../../lib/hooks/common/useBeskrivelse";
import {UnmountClosed} from "react-collapse";
import {useFormue} from "../../lib/hooks/data/useFormue";
import {FormueFrontend} from "../../generated/model";
import LocalizedTextarea from "../../lib/components/LocalizedTextArea.tsx";

export const Formue = () => {
    const {formue, setFormue, setBeskrivelse} = useFormue();
    const {registerAnnet} = useBeskrivelse(formue?.beskrivelseAvAnnet || "", setBeskrivelse);
    const {t} = useTranslation("skjema");

    if (!formue) return null;

    return (
        <CheckboxGroup
            legend={t("formue.type.sporsmal")}
            description={<DigisosReadMore>{t("formue.type.hjelpetekst.tekst")}</DigisosReadMore>}
            onChange={setFormue}
            value={Object.keys(formue).filter((key) => formue[key as keyof FormueFrontend])}
        >
            <Checkbox name={"brukskonto"} value={"brukskonto"}>
                {t("formue.type.brukskonto")}
            </Checkbox>
            <Checkbox name={"sparekonto"} value={"sparekonto"}>
                {t("formue.type.sparekonto")}
            </Checkbox>
            <Checkbox name={"bsu"} value={"bsu"}>
                {t("formue.type.bsu")}
            </Checkbox>
            <Checkbox name={"livsforsikring"} value={"livsforsikring"}>
                {t("formue.type.livsforsikring")}
            </Checkbox>
            <Checkbox name={"verdipapirer"} value={"verdipapirer"}>
                {t("formue.type.verdipapirer")}
            </Checkbox>
            <Checkbox name={"annet"} value={"annet"}>
                {t("formue.type.annet")}
            </Checkbox>
            <UnmountClosed isOpened={formue?.annet}>
                <LocalizedTextarea {...registerAnnet} label={t("formue.annetLabel")} maxLength={MAX_CHARS} />
            </UnmountClosed>
        </CheckboxGroup>
    );
};

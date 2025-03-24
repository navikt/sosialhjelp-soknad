import React from "react";
import {useTranslation} from "react-i18next";
import {Checkbox, CheckboxGroup} from "@navikt/ds-react";
import {DigisosReadMore} from "../../lib/components/DigisosReadMore";
import {MAX_CHARS, useBeskrivelse} from "../../lib/hooks/common/useBeskrivelse";
import {UnmountClosed} from "react-collapse";
import {useFormue} from "../../lib/hooks/data/useFormue";
import LocalizedTextarea from "../../lib/components/LocalizedTextArea.tsx";
import {FormueDto} from "../../generated/new/model";

export const Formue = () => {
    const {formue, setFormue, setBeskrivelse} = useFormue();
    const {registerAnnet} = useBeskrivelse(formue?.beskrivelseSparing || "", setBeskrivelse);
    const {t} = useTranslation("skjema");

    if (!formue) return null;

    return (
        <CheckboxGroup
            legend={t("formue.type.sporsmal")}
            description={<DigisosReadMore>{t("formue.type.hjelpetekst.tekst")}</DigisosReadMore>}
            onChange={setFormue}
            value={Object.keys(formue).filter((key) => formue[key as keyof FormueDto])}
        >
            <Checkbox name={"hasBrukskonto" satisfies keyof FormueDto} value={"hasBrukskonto"}>
                {t("formue.type.brukskonto")}
            </Checkbox>
            <Checkbox name={"hasSparekonto" satisfies keyof FormueDto} value={"hasSparekonto"}>
                {t("formue.type.sparekonto")}
            </Checkbox>
            <Checkbox name={"hasBsu" satisfies keyof FormueDto} value={"hasBsu"}>
                {t("formue.type.bsu")}
            </Checkbox>
            <Checkbox name={"hasLivsforsikring" satisfies keyof FormueDto} value={"hasLivsforsikring"}>
                {t("formue.type.livsforsikring")}
            </Checkbox>
            <Checkbox name={"hasVerdipapirer" satisfies keyof FormueDto} value={"hasVerdipapirer"}>
                {t("formue.type.verdipapirer")}
            </Checkbox>
            <Checkbox name={"hasSparing" satisfies keyof FormueDto} value={"hasSparing"}>
                {t("formue.type.annet")}
            </Checkbox>
            <UnmountClosed isOpened={formue?.hasSparing}>
                <LocalizedTextarea {...registerAnnet} label={t("formue.annetLabel")} maxLength={MAX_CHARS} />
            </UnmountClosed>
        </CheckboxGroup>
    );
};

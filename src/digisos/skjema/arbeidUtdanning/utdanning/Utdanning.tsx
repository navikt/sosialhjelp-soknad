import * as React from "react";
import {useTranslation} from "react-i18next";
import {Radio} from "@navikt/ds-react";
import Underskjema from "../../../../nav-soknad/components/underskjema";
import {HorizontalRadioGroup, VerticalRadioGroup} from "../../../../nav-soknad/components/form/HorizontalRadioGroup";
import {TranslatedError} from "../../begrunnelse";
import {Control, Controller, useWatch} from "react-hook-form";
import {ArbeidOgUtdanningType} from "../index";

type UtdanningViewProps = {
    control: Control<ArbeidOgUtdanningType>;
};

const UtdanningInput = React.forwardRef<HTMLDivElement, UtdanningViewProps>(({control}, ref) => {
    const {t} = useTranslation("skjema");
    const erStudent = useWatch({control, name: "utdanning.erStudent"});

    return (
        <div ref={ref}>
            <Controller
                control={control}
                name="utdanning.erStudent"
                render={({field: {onChange, value: erStudent, name, ref}, formState: {errors}}) => (
                    <VerticalRadioGroup
                        name={name}
                        onChange={(valueStr) => onChange({target: {value: valueStr === "true"}})}
                        value={erStudent?.toString() || null}
                        legend={t("dinsituasjon.studerer.sporsmal")}
                        error={errors.utdanning?.erStudent && <TranslatedError error={errors.utdanning?.erStudent} />}
                    >
                        <Radio value={"true"}>{t("dinsituasjon.studerer.true")}</Radio>
                        <Radio value={"false"}>{t("dinsituasjon.studerer.false")}</Radio>
                    </VerticalRadioGroup>
                )}
            />
            <Controller
                control={control}
                name="utdanning.studengradErHeltid"
                render={({field: {onChange, value: studengradErHeltid, name, ref}, formState: {errors}}) => (
                    <Underskjema jaNeiSporsmal visible={!!erStudent}>
                        <HorizontalRadioGroup
                            onChange={(value) => onChange({target: {value: value === "true"}})}
                            value={(erStudent && studengradErHeltid?.toString()) || null}
                            legend={t("dinsituasjon.studerer.grad.sporsmal")}
                        >
                            <Radio value={"true"}>{t("dinsituasjon.studerer.grad.heltid")}</Radio>
                            <Radio value={"false"}>{t("dinsituasjon.studerer.grad.deltid")}</Radio>
                        </HorizontalRadioGroup>
                    </Underskjema>
                )}
            />
        </div>
    );
});

export default UtdanningInput;

import * as React from "react";
import {useTranslation} from "react-i18next";
import {Radio, RadioGroup} from "@navikt/ds-react";
import Underskjema from "../../../nav-soknad/components/underskjema";
import {Control, Controller, useWatch} from "react-hook-form";
import {ArbeidOgUtdanningType} from "../index";
import {YesNoInput} from "../../../nav-soknad/components/form/YesNoInput";

type UtdanningViewProps = {
    control: Control<ArbeidOgUtdanningType>;
};

const UtdanningInput = React.forwardRef<HTMLDivElement, UtdanningViewProps>(({control}, ref) => {
    const {t} = useTranslation("skjema");
    const erStudent = useWatch({control, name: "utdanning.erStudent"});

    return (
        <div ref={ref} className={"space-y-2"}>
            <Controller
                control={control}
                name="utdanning.erStudent"
                render={({field: {onChange, value: erStudent}, formState: {errors}}) => (
                    <YesNoInput
                        legend={t("dinsituasjon.studerer.sporsmal")}
                        defaultValue={erStudent ?? null}
                        onChange={(value) => onChange({target: {value}})}
                    />
                )}
            />
            <Controller
                control={control}
                name="utdanning.studengradErHeltid"
                render={({field: {onChange, value: studengradErHeltid, name, ref}, formState: {errors}}) => (
                    <Underskjema jaNeiSporsmal visible={!!erStudent}>
                        <RadioGroup
                            onChange={(value) => onChange({target: {value: value === "true"}})}
                            value={(erStudent && studengradErHeltid?.toString()) || null}
                            legend={t("dinsituasjon.studerer.grad.sporsmal")}
                        >
                            <Radio value={"true"}>{t("dinsituasjon.studerer.grad.heltid")}</Radio>
                            <Radio value={"false"}>{t("dinsituasjon.studerer.grad.deltid")}</Radio>
                        </RadioGroup>
                    </Underskjema>
                )}
            />
        </div>
    );
});

export default UtdanningInput;

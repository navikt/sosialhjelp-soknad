import * as React from "react";
import {ReactNode, Ref} from "react";
import {Radio, RadioGroup, RadioGroupProps} from "@navikt/ds-react";

/**
 * En <Radio> som er stylet for bruk til ja/nei/null-valg i <BooleanInput />
 */
const BooleanInputRadio = ({value, label}: {value: string; label: ReactNode}) => (
    <Radio value={value.toString()}>{label}</Radio>
);

export type BaseBooleanInputProps = {
    legend: ReactNode;
    description?: ReactNode;
    onChange: (value: boolean) => void;
    defaultValue?: boolean | null;
    value?: boolean | null;
    name: string;
    trueLabel?: string;
    falseLabel?: string;
    ref?: React.Ref<HTMLInputElement>;
} & Pick<RadioGroupProps, "error" | "onBlur" | "className">;

interface GenericBooleanInputProps {
    // True and false labels
    radioLabels: [ReactNode, ReactNode];
}

const BooleanInput = (
    {
        radioLabels: [defaultTrueLabel, defaultFalseLabel],
        defaultValue,
        onChange,
        onBlur,
        legend,
        description,
        name,
        value,
        error,
        trueLabel,
        falseLabel,
        className,
    }: BaseBooleanInputProps & GenericBooleanInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
) => (
    <RadioGroup
        legend={legend}
        description={description}
        name={name}
        onBlur={onBlur}
        error={error}
        ref={ref as Ref<HTMLFieldSetElement>}
        onChange={(value) => onChange(value === "true")}
        value={value?.toString()}
        defaultValue={defaultValue?.toString()}
        className={className}
    >
        <BooleanInputRadio value={"true"} label={trueLabel ? trueLabel : defaultTrueLabel} />
        <BooleanInputRadio value={"false"} label={falseLabel ? falseLabel : defaultFalseLabel} />
    </RadioGroup>
);

export default React.forwardRef(BooleanInput);

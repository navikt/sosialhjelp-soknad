import * as React from "react";
import {ReactNode} from "react";
import {Radio, RadioGroup} from "@navikt/ds-react";

/**
 * En <Radio> som er stylet for bruk til ja/nei/null-valg i <BooleanInput />
 */
const BooleanInputRadio = ({value, label}: {value: string; label: ReactNode}) => (
    <Radio value={value.toString()}>{label}</Radio>
);

export interface BaseBooleanInputProps {
    legend: ReactNode;
    description?: ReactNode;
    defaultValue: boolean | null | undefined;
    onChange: (value: boolean) => void;
}

interface GenericBooleanInputProps {
    // True and false labels
    radioLabels: [ReactNode, ReactNode];
}

export const BooleanInput = ({
    radioLabels: [trueLabel, falseLabel],
    defaultValue,
    onChange,
    legend,
    description,
}: BaseBooleanInputProps & GenericBooleanInputProps) => (
    <RadioGroup
        legend={legend}
        description={description}
        onChange={(value) => onChange(value === "true")}
        defaultValue={defaultValue}
    >
        <BooleanInputRadio value={"true"} label={trueLabel} />
        <BooleanInputRadio value={"false"} label={falseLabel} />
    </RadioGroup>
);

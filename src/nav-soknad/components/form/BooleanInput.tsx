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
    defaultValue?: boolean | null;
    value?: boolean | null;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    name: string;
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
    name,
    value,
}: BaseBooleanInputProps & GenericBooleanInputProps) => (
    <RadioGroup
        legend={legend}
        description={description}
        name={name}
        onChange={(value: string) => {
            const event = {
                target: {
                    name,
                    value: value === "true",
                    checked: value === "true",
                },
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            onChange(event);
        }}
        value={value?.toString()}
        defaultValue={typeof defaultValue === "boolean" ? defaultValue.toString() : undefined}
    >
        <BooleanInputRadio value={"true"} label={trueLabel} />
        <BooleanInputRadio value={"false"} label={falseLabel} />
    </RadioGroup>
);

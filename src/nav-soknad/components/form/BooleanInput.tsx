import * as React from "react";
import {ReactNode} from "react";
import {HStack, Radio, RadioGroup} from "@navikt/ds-react";
import cx from "classnames";

const roundedBorder = "border-[1px] border-[val(--a-border-strong)] rounded-lg py-2 px-6";
const responsiveWidth = "!grow min-w-sm";
/**
 * En <Radio> som er stylet for bruk til ja/nei/null-valg i <BooleanInput />
 */
const BooleanInputRadio = ({value, label}: {value: string; label: ReactNode}) => (
    <Radio className={cx(roundedBorder, responsiveWidth)} value={value.toString()}>
        {label}
    </Radio>
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
        <HStack align={"stretch"} gap={{xs: "2", lg: "4"}}>
            <BooleanInputRadio value={"true"} label={trueLabel} />
            <BooleanInputRadio value={"false"} label={falseLabel} />
        </HStack>
    </RadioGroup>
);

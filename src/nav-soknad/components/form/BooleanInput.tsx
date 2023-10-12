import * as React from "react";
import {ReactNode} from "react";
import {HStack, Radio, RadioGroup} from "@navikt/ds-react";
import cx from "classnames";

const roundedBorder = "border-[1px] border-[val(--a-border-strong)] rounded-lg py-2 px-6";
const responsiveWidth = "!grow min-w-sm";
/**
 * En <Radio> som er stylet for bruk til ja/nei/null-valg i <BooleanInput />
 */
const BooleanInputRadio = ({value, label}: {value: boolean; label: ReactNode}) => (
    <Radio className={cx(roundedBorder, responsiveWidth)} value={value?.toString()}>
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
    radioLabels: [ReactNode, ReactNode];
}

export const BooleanInput = ({
    radioLabels: [falseLabel, trueLabel],
    defaultValue,
    onChange,
    legend,
    description,
}: BaseBooleanInputProps & GenericBooleanInputProps) => (
    <RadioGroup legend={legend} description={description} onChange={onChange} defaultValue={defaultValue}>
        <HStack align={"stretch"} gap={{xs: "2", lg: "4"}}>
            <BooleanInputRadio value={false} label={falseLabel} />
            <BooleanInputRadio value={true} label={trueLabel} />
        </HStack>
    </RadioGroup>
);

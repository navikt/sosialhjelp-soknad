import * as React from "react";
import {ReactNode, Ref} from "react";
import {Radio, RadioGroup, RadioGroupProps, ReadMore} from "@navikt/ds-react";

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
    moreInfoTittel?: string;
    moreInfoForklaring?: string;
    ref?: React.Ref<HTMLInputElement>;
} & Pick<RadioGroupProps, "error" | "onBlur">;

interface GenericBooleanInputProps {
    // True and false labels
    radioLabels: [ReactNode, ReactNode];
}

export const BooleanInput = React.forwardRef(
    (
        {
            radioLabels: [trueLabel, falseLabel],
            defaultValue,
            onChange,
            onBlur,
            legend,
            description,
            name,
            value,
            error,
            moreInfoTittel,
            moreInfoForklaring,
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
        >
            {moreInfoTittel && moreInfoForklaring && <ReadMore header={moreInfoTittel}>{moreInfoForklaring}</ReadMore>}
            <BooleanInputRadio value={"true"} label={trueLabel} />
            <BooleanInputRadio value={"false"} label={falseLabel} />
        </RadioGroup>
    )
);

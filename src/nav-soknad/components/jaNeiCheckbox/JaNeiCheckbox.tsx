import {HStack, Radio, RadioGroup} from "@navikt/ds-react";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {ReactNode} from "react";

const className = "border-[1px] border-[val(--a-border-strong)] !grow min-w-sm rounded-lg py-2 px-6";

/**
 * Lar bruker velge ja eller nei. Erstatter JaNeiSporsmal.tsx.
 *
 * @param legend - overskrift
 * @param description - beskrivelse (valgfri)
 * @param defaultValue - default-verdi
 * @param onChange - callback som kalles når bruker velger ja eller nei
 */
export const JaNeiCheckbox = ({
    legend,
    description,
    defaultValue,
    onChange,
}: {
    legend: ReactNode;
    description?: ReactNode;
    defaultValue: boolean | null;
    onChange: (value: boolean) => void;
}) => {
    const {t} = useTranslation("skjema");

    return (
        <RadioGroup
            legend={legend}
            description={description && <div className={"pb-1"}>{description}</div>}
            defaultValue={defaultValue?.toString()}
            onChange={(value) => onChange(value === "true")}
        >
            <HStack align={"stretch"} gap={{xs: "2", lg: "4"}}>
                <Radio className={className} value={"true"}>{`${t(`avbryt.ja`)}`}</Radio>
                <Radio className={className} value={"false"}>{`${t(`avbryt.nei`)}`}</Radio>
            </HStack>
        </RadioGroup>
    );
};

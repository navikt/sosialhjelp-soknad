import * as React from "react";
import Sporsmal, {LegendTittleStyle} from "../components/sporsmal/Sporsmal";
import {useTranslation} from "react-i18next";
import {HStack, Radio, RadioGroup} from "@navikt/ds-react";

interface JaNeiSporsmalProps {
    faktumKey: string;
    skjemaTilhorerValg?: "ja" | "nei";
    id?: string;
    legendTittelStyle?: LegendTittleStyle;
    tekster: any;
    verdi: null | boolean;
    onChange: (verdi: boolean) => void;
    visPlaceholder?: boolean;
    children?: React.ReactNode;
}

const className = "border-[1px] border-[val(--a-border-strong)] !grow min-w-sm rounded-lg py-2 px-6";

const JaNeiSporsmal = ({faktumKey, children, verdi, onChange, tekster, legendTittelStyle}: JaNeiSporsmalProps) => {
    const {t} = useTranslation("skjema");
    return (
        <Sporsmal
            tekster={tekster}
            stil={children ? "jaNeiSporsmal" : "normal"}
            legendTittelStyle={legendTittelStyle || LegendTittleStyle.DEFAULT}
        >
            <RadioGroup
                className={"!mb-4"}
                legend={tekster.label}
                value={verdi?.toString()}
                onChange={(value) => onChange(value === "true")}
            >
                <HStack align={"stretch"} gap={{xs: "2", lg: "4"}}>
                    <Radio className={className} value={"true"}>{`${t(`${faktumKey}.true`)}`}</Radio>
                    <Radio className={className} value={"false"}>{`${t(`${faktumKey}.false`)}`}</Radio>
                </HStack>
            </RadioGroup>
            {verdi && children}
        </Sporsmal>
    );
};

export default JaNeiSporsmal;

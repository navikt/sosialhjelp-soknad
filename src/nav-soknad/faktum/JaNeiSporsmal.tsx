import * as React from "react";
import Sporsmal, {LegendTittleStyle} from "../components/sporsmal/Sporsmal";
import RadioEnhanced from "./RadioEnhanced";
import {useTranslation} from "react-i18next";
import {HGrid} from "@navikt/ds-react";

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

const JaNeiSporsmal = ({faktumKey, children, verdi, onChange, tekster, legendTittelStyle}: JaNeiSporsmalProps) => {
    const {t} = useTranslation("skjema");

    return (
        <Sporsmal
            tekster={tekster}
            stil={children ? "jaNeiSporsmal" : "normal"}
            legendTittelStyle={legendTittelStyle || LegendTittleStyle.DEFAULT}
        >
            <HGrid columns={{lg: 2}} gap={{sm: "0", lg: "4"}}>
                <RadioEnhanced
                    checked={verdi === true}
                    className="jaNeiSpormal"
                    label={`${t(`${faktumKey}.true`)}`}
                    onChange={() => onChange(true)}
                    value={"true"}
                />
                <RadioEnhanced
                    checked={verdi === false}
                    className="jaNeiSpormal"
                    label={`${t(`${faktumKey}.false`)}`}
                    onChange={() => onChange(false)}
                    value={"false"}
                />
            </HGrid>
            {children && verdi && children}
        </Sporsmal>
    );
};

export default JaNeiSporsmal;

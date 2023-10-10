import * as React from "react";
import ValgMedUnderskjema from "../components/valgMedUnderskjema";
import Underskjema from "../components/underskjema";
import Sporsmal, {LegendTittleStyle} from "../components/sporsmal/Sporsmal";
import RadioEnhanced from "./RadioEnhanced";
import {useTranslation} from "react-i18next";

interface JaNeiSporsmalProps {
    faktumKey: string;
    skjemaTilhorerValg?: "ja" | "nei";
    visible?: boolean;
    id?: string;
    legendTittelStyle?: LegendTittleStyle;
    tekster: any;
    verdi: null | boolean;
    onChange?: (verdi: boolean) => void;
    visPlaceholder?: boolean;
    children?: React.ReactNode;
}

const erMobilVisning = () =>
    Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    ) < 480;

const JaNeiSporsmal = (props: JaNeiSporsmalProps) => {
    const handleOnChange = (verdi: any) => {
        props.onChange && props.onChange(verdi);
    };
    const {faktumKey, children, verdi} = props;
    const {t} = useTranslation("skjema");
    const harUnderSkjema = children !== undefined;
    const visUnderSkjema = harUnderSkjema && verdi === true;

    let idRadioJa: string;
    let idRadioNei: string;
    if (props.id) {
        idRadioJa = props.id + "_radio_ja";
        idRadioNei = props.id + "_radio_nei";
    } else {
        idRadioJa = faktumKey.replace(/\./g, "_") + "_radio_ja";
        idRadioJa = idRadioJa.replace(/__/g, "_");
        idRadioNei = faktumKey.replace(/\./g, "_") + "_radio_nei";
        idRadioNei = idRadioNei.replace(/__/g, "_");
    }
    const radioName = faktumKey.replace(/\./g, "_") + "_radio";

    const mobilVisning = erMobilVisning();

    if (props.visible === false) return null;

    return (
        <Sporsmal
            tekster={props.tekster}
            stil={harUnderSkjema ? "jaNeiSporsmal" : "normal"}
            legendTittelStyle={props.legendTittelStyle || LegendTittleStyle.DEFAULT}
        >
            <ValgMedUnderskjema
                underskjema={children ? <Underskjema visible={visUnderSkjema}>{children}</Underskjema> : <span />}
            >
                <RadioEnhanced
                    checked={verdi === true}
                    className="jaNeiSpormal"
                    label={`${t(`${props.faktumKey}.true`)}`}
                    id={idRadioJa}
                    name={radioName}
                    onChange={() => handleOnChange(true)}
                    value={"true"}
                />
                <RadioEnhanced
                    checked={verdi === false}
                    className="jaNeiSpormal"
                    label={`${t(`${props.faktumKey}.false`)}`}
                    id={idRadioNei}
                    name={radioName}
                    onChange={() => handleOnChange(false)}
                    value={"false"}
                />
            </ValgMedUnderskjema>
        </Sporsmal>
    );
};

export default JaNeiSporsmal;

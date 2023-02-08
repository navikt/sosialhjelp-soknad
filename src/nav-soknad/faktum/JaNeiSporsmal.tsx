import * as React from "react";
import ValgMedUnderskjema from "../components/valgMedUnderskjema";
import Underskjema from "../components/underskjema";
import Sporsmal, {LegendTittleStyle} from "../components/sporsmal/Sporsmal";
import RadioEnhanced from "./RadioEnhanced";

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

class JaNeiSporsmal extends React.Component<JaNeiSporsmalProps, {}> {
    handleOnChange(verdi: any) {
        this.props.onChange && this.props.onChange(verdi);
    }

    render() {
        const {faktumKey, children, verdi} = this.props;

        const harUnderSkjema = children !== undefined;
        const visUnderSkjema = harUnderSkjema && verdi === true;

        let idRadioJa: string;
        let idRadioNei: string;
        if (this.props.id) {
            idRadioJa = this.props.id + "_radio_ja";
            idRadioNei = this.props.id + "_radio_nei";
        } else {
            idRadioJa = faktumKey.replace(/\./g, "_") + "_radio_ja";
            idRadioJa = idRadioJa.replace(/__/g, "_");
            idRadioNei = faktumKey.replace(/\./g, "_") + "_radio_nei";
            idRadioNei = idRadioNei.replace(/__/g, "_");
        }
        const radioName = faktumKey.replace(/\./g, "_") + "_radio";

        const mobilVisning = erMobilVisning();

        if (this.props.visible === false) return null;

        return (
            <Sporsmal
                tekster={this.props.tekster}
                stil={harUnderSkjema ? "jaNeiSporsmal" : "normal"}
                legendTittelStyle={this.props.legendTittelStyle || LegendTittleStyle.DEFAULT}
            >
                <ValgMedUnderskjema
                    underskjema={children ? <Underskjema visible={visUnderSkjema}>{children}</Underskjema> : <span />}
                >
                    <RadioEnhanced
                        checked={verdi === true}
                        className="jaNeiSpormal"
                        faktumKey={this.props.faktumKey}
                        id={idRadioJa}
                        name={radioName}
                        onChange={() => this.handleOnChange(true)}
                        value={"true"}
                        visPlaceholder={this.props.visPlaceholder}
                    />
                    {!mobilVisning && (
                        <RadioEnhanced
                            checked={verdi === false}
                            className="jaNeiSpormal"
                            faktumKey={this.props.faktumKey}
                            id={idRadioNei}
                            name={radioName}
                            onChange={() => this.handleOnChange(false)}
                            value={"false"}
                            visPlaceholder={this.props.visPlaceholder}
                        />
                    )}
                </ValgMedUnderskjema>
                {mobilVisning && (
                    <RadioEnhanced
                        faktumKey={this.props.faktumKey}
                        id={idRadioNei}
                        value={"false"}
                        checked={!verdi}
                        name={radioName}
                        onChange={() => this.handleOnChange(false)}
                        className={
                            "jaNeiSpormal inputPanel__mobil--nei " + visUnderSkjema
                                ? "inputPanel__mobil--uten-underSkjema"
                                : ""
                        }
                        visPlaceholder={this.props.visPlaceholder}
                    />
                )}
            </Sporsmal>
        );
    }
}

export default JaNeiSporsmal;

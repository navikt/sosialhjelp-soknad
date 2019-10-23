import * as React from "react";
import ValgMedUnderskjema from "../components/valgMedUnderskjema";
import Underskjema from "../components/underskjema";
import Sporsmal, {LegendTittleStyle} from "../components/sporsmal/Sporsmal";
import {erMobilVisning} from "../utils/domUtils";
import RadioEnhanced from "./RadioEnhanced";


interface Props {
    faktumKey: string;
    skjemaTilhorerValg?: "ja" | "nei";
    visible?: boolean;
    id?: string;
    legendTittelStyle?: LegendTittleStyle;
    tekster: any;
    verdi: null | boolean;
    onChange?: (verdi: boolean) => void;
    visPlaceholder?: boolean;
}

class JaNeiSporsmal extends React.Component<Props, {}> {

    handleOnChange(verdi: any): void {
        if (this.props.onChange) {
            this.props.onChange(verdi);
        }
    }

    render() {
        const {
            faktumKey,
            children,
            verdi
        } = this.props;

        const harUnderSkjema = children !== undefined;
        const visUnderSkjema = harUnderSkjema && verdi === true;

        let idRadioJa: string = "";
        let idRadioNei: string = "";
        if (this.props.id) {
            idRadioJa = this.props.id + "_radio_ja";
            idRadioNei = this.props.id + "_radio_nei";
        } else {
            idRadioJa = faktumKey.replace(/\./g, "_") + "_radio_ja";
            idRadioJa = idRadioJa.replace(/__/g, "_");
            idRadioNei = faktumKey.replace(/\./g, "_") + "_radio_nei";
            idRadioNei = idRadioNei.replace(/__/g, "_");
        }

        const mobilVisning = erMobilVisning();

        if (this.props.visible === false) {
            return null;
        }
        return (
            <Sporsmal
                tekster={this.props.tekster}
                stil={harUnderSkjema ? "jaNeiSporsmal" : "normal"}
                legendTittelStyle={this.props.legendTittelStyle || LegendTittleStyle.DEFAULT}
            >
                <ValgMedUnderskjema
                    underskjema={children ?
                        <Underskjema visible={visUnderSkjema}>{children}</Underskjema> : <span/>
                    }
                >
                    <RadioEnhanced
                        getName={() => idRadioJa}
                        faktumKey={this.props.faktumKey}
                        id={idRadioJa}
                        value={"true"}
                        checked={verdi && verdi === true}
                        className="inputPanel__smal"
                        onChange={() => this.handleOnChange(true)}
                        visPlaceholder={this.props.visPlaceholder}
                    />

                    {!mobilVisning && (
                        <RadioEnhanced
                            faktumKey={this.props.faktumKey}
                            id={idRadioNei}
                            value={"false"}
                            checked={verdi !== null && verdi === false}
                            getName={() => idRadioNei}
                            onChange={() => this.handleOnChange(false)}
                            className="inputPanel__smal"
                            visPlaceholder={this.props.visPlaceholder}
                        />
                    )}
                </ValgMedUnderskjema>
                {mobilVisning && (
                    <RadioEnhanced
                        faktumKey={this.props.faktumKey}
                        id={idRadioNei}
                        value={"false"}
                        checked={verdi !== null && verdi === false}
                        getName={() => idRadioNei}
                        onChange={() => this.handleOnChange(false)}
                        className={
                            "inputPanel__smal inputPanel__mobil--nei " +
                            visUnderSkjema ? "inputPanel__mobil--uten-underSkjema" : ""}
                        visPlaceholder={this.props.visPlaceholder}
                    />
                )}
            </Sporsmal>
        );
    }

}

export default JaNeiSporsmal;

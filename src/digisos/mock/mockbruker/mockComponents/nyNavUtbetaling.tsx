import * as React from 'react';
import {Collapse} from "react-collapse";
import MockInput from "./mockInput";

interface Props {
    onLeggTilNyNavUtbetaling: (nyNavUtbetaling: NyNavUtbetalingObject, nyNavYtelseListe: NyNavYtelseObject) => void;
}

interface State {
    isOpened: boolean;
    ident: number;
    posteringsdato: string;
    utbetalingsdato: string;
    forfallsdato: string;
    ytelsestype: string,
    ytelseskomponenttype: string,
    ytelseskomponentbeloep: number,
    periodeFom: string,
    periodeTom: string,
}

export class NyNavYtelseObject {
    ytelsestype: string = "";
    ytelseskomponenttype: string = "";
    ytelseskomponentbeloep: number = 0;
    periodeFom: string = "";
    periodeTom: string = "";
}

export class NyNavUtbetalingObject {
    ident: string = "";
    posteringsdato: string = "";
    utbetalingsdato: string = "";
    forfallsdato: string = "";
    ytelsesListe: NyNavYtelseObject[] = [];
}

export class NyNavUtbetaling extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        let dato = new Date();
        let fomDato = new Date();
        fomDato.setMonth(fomDato.getMonth() - 1);
        fomDato.setDate(1);
        let tomDato = new Date();
        tomDato.setDate(-1);
        this.state = {
            isOpened: false,
            posteringsdato: dato.getFullYear() + "-" + (dato.getMonth() < 9 ? "0" : "") + (dato.getMonth() + 1) + "-" + (dato.getDate() < 9 ? "0" : "") + (dato.getDate() + 1),
            utbetalingsdato: dato.getFullYear() + "-" + (dato.getMonth() < 9 ? "0" : "") + (dato.getMonth() + 1) + "-" + (dato.getDate() < 9 ? "0" : "") + (dato.getDate() + 1),
            forfallsdato: dato.getFullYear() + "-" + (dato.getMonth() < 9 ? "0" : "") + (dato.getMonth() + 1) + "-" + (dato.getDate() < 9 ? "0" : "") + (dato.getDate() + 1),
            ident: 12345678901,
            ytelsestype: "Dagpenger",
            ytelseskomponenttype: "Ordinær og utvidet",
            ytelseskomponentbeloep: 10101,
            periodeFom: fomDato.getFullYear() + "-" + (fomDato.getMonth() < 9 ? "0" : "") + (fomDato.getMonth() + 1) + "-" + (fomDato.getDate() < 9 ? "0" : "") + (fomDato.getDate() + 1),
            periodeTom: tomDato.getFullYear() + "-" + (tomDato.getMonth() < 9 ? "0" : "") + (tomDato.getMonth() + 1) + "-" + (tomDato.getDate() < 9 ? "0" : "") + (tomDato.getDate() + 1),
        }
    }

    lagreNyUtbetaling() {
        let nyNavUtbetaling: NyNavUtbetalingObject = {
            ident: this.state.ident.toString(),
            posteringsdato: this.state.utbetalingsdato,
            utbetalingsdato: this.state.utbetalingsdato,
            forfallsdato: this.state.utbetalingsdato,
            ytelsesListe: [],
        };
        let nyNavYtelse: NyNavYtelseObject = {
            ytelsestype: this.state.ytelsestype,
            ytelseskomponenttype: this.state.ytelseskomponenttype,
            ytelseskomponentbeloep: this.state.ytelseskomponentbeloep,
            periodeFom: this.state.periodeFom,
            periodeTom: this.state.periodeTom,
        };

        this.props.onLeggTilNyNavUtbetaling(nyNavUtbetaling, nyNavYtelse);
        this.setState({isOpened: false})
    }


    render() {
        const buttonClassName = this.state.isOpened ? "mock-hide" : "mock-show";
        const manederList: string[] = [];
        let dato = new Date();
        let sistKalendermaaned = "";
        while (manederList.length < 4) {
            dato.setMonth(dato.getMonth() - 1);
            const kalendermaaned: string = dato.getFullYear() + "-" + (dato.getMonth() < 9 ? "0" : "") + (dato.getMonth() + 1);
            if (kalendermaaned !== sistKalendermaaned) {
                manederList.push(kalendermaaned);
                sistKalendermaaned = kalendermaaned;
            }
        }

        return (
            <div>
                <Collapse isOpened={this.state.isOpened}>
                    <div className="mock-newThingWrapper">
                        <div className="mock-newThing-tittel">Legg til NAV utbetaling:</div>
                        <div className="mock-newThing-body">
                            <MockInput label="Beløp:"
                                       onChange={(evt: any) => this.setState({ytelseskomponentbeloep: evt.target.value})}
                                       value={this.state.ytelseskomponentbeloep.toString()}/>
                            <MockInput label="Utbetalingsdato:"
                                       onChange={(evt: any) => this.setState({utbetalingsdato: evt.target.value})}
                                       value={this.state.utbetalingsdato}/>
                            <MockInput label="Ytelsestype:"
                                       onChange={(evt: any) => this.setState({ytelsestype: evt.target.value})}
                                       value={this.state.ytelsestype}/>
                            <button onClick={() => this.lagreNyUtbetaling()}>Ok</button>
                            <button onClick={() => this.setState({isOpened: false})}>Avbryt</button>
                        </div>
                    </div>
                </Collapse>

                <button className={buttonClassName} onClick={() => this.setState({isOpened: true})}>+</button>
            </div>
        )
    }
}
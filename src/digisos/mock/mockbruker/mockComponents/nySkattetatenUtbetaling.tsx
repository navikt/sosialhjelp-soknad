import * as React from 'react';
import {Collapse} from "react-collapse";
import MockInput from "./mockInput";
import {Select} from "nav-frontend-skjema";

interface Props {
    onLeggTilNyUtbetaling: (maned: string, orgNummer: number, utbetaling: NySkattetatenInntektObject, trekk: NySkattetatenForskuddstrekkObject | undefined) => void;
}

interface State {
    isOpened: boolean;
    utbetalingsmaned: string;
    utbetalingsbelop: number;
    orgNummer: number;
    utbetalingstype: Inntektstyper;
    inngaarIGrunnlagForTrekk: boolean;
    forskuddstrekk: number;
}

class NySkattetatenKategoriObject {
}

export class NySkattetatenForskuddstrekkObject {
    beskrivelse: string = "Mocktrekk";
    beloep: number = -1;
}

export class NySkattetatenInntektObject {
    // noinspection JSUnusedGlobalSymbols
    skatteOgAvgiftsregel?: string = "";
    // noinspection JSUnusedGlobalSymbols
    fordel?: string = "";
    // noinspection JSUnusedGlobalSymbols
    utloeserArbeidsgiveravgift?: boolean = false;
    inngaarIGrunnlagForTrekk: boolean = true;
    beloep: number = -1;
    loennsinntekt?: NySkattetatenKategoriObject | undefined = undefined;
    ytelseFraOffentlige?: NySkattetatenKategoriObject | undefined = undefined;
    pensjonEllerTrygd?: NySkattetatenKategoriObject | undefined = undefined;
    lottOgPartInnenFiske?: NySkattetatenKategoriObject | undefined = undefined;
    dagmammaIEgenBolig?: NySkattetatenKategoriObject | undefined = undefined;
    naeringsinntekt?: NySkattetatenKategoriObject | undefined = undefined;
    aldersUfoereEtterlatteAvtalefestetOgKrigspensjon?: NySkattetatenKategoriObject | undefined = undefined;
}

export class NyPeriodeOgUtbetaler {
    kalendermaaned: string = "";
    opplysningspliktigId: string = "";
    inntekt: NySkattetatenInntektObject[] = [];
    forskuddstrekk: NySkattetatenForskuddstrekkObject[] = [];
}

export enum Inntektstyper {
    LONN = "LONN",
    OFFENTLIG = "OFFENTLIG",
    PENSJON = "PENSJON",
    FISKE = "FISKE",
    DAGMAMMA = "DAGMAMMA",
    NERING = "NERING",
    KRIGSPENSJON = "KRIGSPENSJON",
}

export const typeList: { navn: string, id: string }[] = [
    {navn: "Lønnsinntekt", id: Inntektstyper.LONN},
    {navn: "Ytelse fra offentlige", id: Inntektstyper.OFFENTLIG},
    {navn: "Pensjon eller trygd", id: Inntektstyper.PENSJON},
    {navn: "Lott og part innenFiske", id: Inntektstyper.FISKE},
    {navn: "Dagmamma i egen bolig", id: Inntektstyper.DAGMAMMA},
    {navn: "Naeringsinntekt", id: Inntektstyper.NERING},
    {navn: "Aldersuføre, Etterlatte, Avtalefestet og Krigspensjon", id: Inntektstyper.KRIGSPENSJON},
];

export class NySkattetatenUtbetaling extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        let dato = new Date();
		dato.setMonth(dato.getMonth() - 1);
        this.state = {
            isOpened: false,
            utbetalingsmaned: dato.getFullYear() + "-" + (dato.getMonth() < 9 ? "0" : "") + (dato.getMonth() + 1),
            utbetalingsbelop: 242,
            orgNummer: 123456789,
            utbetalingstype: Inntektstyper.LONN,
            inngaarIGrunnlagForTrekk: true,
            forskuddstrekk: 0,
        }
    }

    lagreNyUtbetaling() {

        const nyInntekt: NySkattetatenInntektObject = {
            inngaarIGrunnlagForTrekk: this.state.inngaarIGrunnlagForTrekk,
            beloep: this.state.utbetalingsbelop,
        };
        if(this.state.utbetalingstype === Inntektstyper.LONN) {
        	nyInntekt.loennsinntekt = {};
		} else if (this.state.utbetalingstype === Inntektstyper.OFFENTLIG) {
			nyInntekt.ytelseFraOffentlige = {};
		} else if (this.state.utbetalingstype === Inntektstyper.PENSJON) {
			nyInntekt.pensjonEllerTrygd = {};
		} else if (this.state.utbetalingstype === Inntektstyper.FISKE) {
			nyInntekt.lottOgPartInnenFiske = {};
		} else if (this.state.utbetalingstype === Inntektstyper.DAGMAMMA) {
			nyInntekt.dagmammaIEgenBolig = {};
		} else if (this.state.utbetalingstype === Inntektstyper.NERING) {
			nyInntekt.naeringsinntekt = {};
		} else if (this.state.utbetalingstype === Inntektstyper.KRIGSPENSJON) {
			nyInntekt.aldersUfoereEtterlatteAvtalefestetOgKrigspensjon = {};
		}

        let nyForskuddstrekk: NySkattetatenForskuddstrekkObject | undefined = undefined;
        if(this.state.forskuddstrekk !== 0) {
            nyForskuddstrekk = {
                beloep: this.state.forskuddstrekk,
                beskrivelse: "",
            };
        }

        this.props.onLeggTilNyUtbetaling(this.state.utbetalingsmaned, this.state.orgNummer, nyInntekt, nyForskuddstrekk);
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
                        <div className="mock-newThing-tittel">Legg til Skatteetaten utbetaling:</div>
                        <div className="mock-newThing-body">
                            <MockInput label="Beløp:"
                                       onChange={(evt: any) => this.setState({utbetalingsbelop: evt.target.value})}
                                       value={this.state.utbetalingsbelop.toString()}/>
                            <MockInput label="Trekk:"
                                       onChange={(evt: any) => this.setState({forskuddstrekk: evt.target.value})}
                                       value={this.state.forskuddstrekk.toString()}/>
                            <MockInput label="OrgNummer:"
                                       onChange={(evt: any) => this.setState({orgNummer: evt.target.value})}
                                       value={this.state.orgNummer.toString()}/>
                            <Select label='Maned:'
                                    onChange={(evt: any) => this.setState({utbetalingsmaned: evt.target.value})}>
                                {manederList.map((maaned: string) => {
                                    return <option value={maaned} key={maaned}>
                                        {maaned}
                                    </option>
                                })}
                            </Select>
                            <Select label='Inntektstype:'
                                    onChange={(evt: any) => this.setState({utbetalingstype: evt.target.value})}>
                                {typeList.map((type: { navn: string, id: string }) => {
                                    return <option value={type.id} key={type.id}>
                                        {type.navn}
                                    </option>
                                })}
                            </Select>
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
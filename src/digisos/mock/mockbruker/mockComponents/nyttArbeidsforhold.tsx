import * as React from "react";
import {Select} from "nav-frontend-skjema";
import {Collapse} from "react-collapse";
import MockInput from "./mockInput";

interface Props {
    onLeggTilNyttArbeidsforhold: (data: any) => void;
}

interface State {
    isOpened: boolean;
    type: ArbeidsforholdType;
    id: string;
    startDato: string;
    sluttDato: string;
    stillingsProsent: string;
    navn: string;
    arbeidsgivernummer: string;
    ident: string;
    orgnummer: string;
}

export enum ArbeidsforholdType {
    PERSON = "person",
    ORGANISASJON = "organisasjon",
}

export interface NyttArbeidsforholdObject {
    type: string;
    id: string;
    startDato: string;
    sluttDato: string;
    stillingsProsent: string;
    navn: string;
    arbeidsgivernummer: string;
    ident: string;
    orgnummer: string;
}

class NyttArbeidsforhold extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isOpened: false,
            type: ArbeidsforholdType.PERSON,
            id: "1",
            startDato: "2018-01-01",
            sluttDato: "2018-02-01",
            stillingsProsent: "100",
            navn: "arbeidsgiver-2018",
            arbeidsgivernummer: "1337",
            ident: "12345678901",
            orgnummer: "123",
        };
    }

    lagreNyttArbeidsforhold() {
        const nyttArbeidsforholdObject: NyttArbeidsforholdObject = {
            type: this.state.type,
            id: this.state.id,
            startDato: this.state.startDato,
            sluttDato: this.state.sluttDato,
            stillingsProsent: this.state.stillingsProsent,
            navn: this.state.navn,
            arbeidsgivernummer: this.state.arbeidsgivernummer,
            ident: this.state.ident,
            orgnummer: this.state.orgnummer,
        };

        this.props.onLeggTilNyttArbeidsforhold(nyttArbeidsforholdObject);
        this.setState({isOpened: false});
    }

    render() {
        const plussButtonClassname = this.state.isOpened ? "mock-hide" : "mock-show";

        return (
            <div>
                <Collapse isOpened={this.state.isOpened}>
                    <div className="mock-newThingWrapper">
                        <div className="mock-newThing-tittel">Legg til nytt arbeidsforhold:</div>
                        <div className="mock-newThing-body">
                            <MockInput
                                label="Id:"
                                onChange={(evt: any) => this.setState({id: evt.target.value})}
                                value={this.state.id}
                            />
                            <MockInput
                                label="Startdato:"
                                onChange={(evt: any) => this.setState({startDato: evt.target.value})}
                                value={this.state.startDato}
                            />
                            <MockInput
                                label="Sluttdato:"
                                onChange={(evt: any) => this.setState({sluttDato: evt.target.value})}
                                value={this.state.sluttDato}
                            />
                            <MockInput
                                label="Stillingsprosent:"
                                onChange={(evt: any) => this.setState({stillingsProsent: evt.target.value})}
                                value={this.state.stillingsProsent}
                            />

                            <Select
                                label="Velg type arbeidsforhold"
                                onChange={(event: any) => this.setState({type: event.target.value})}
                            >
                                <option value={ArbeidsforholdType.PERSON} key={ArbeidsforholdType.PERSON}>
                                    Arbeidsgiver med ident
                                </option>
                                <option value={ArbeidsforholdType.ORGANISASJON} key={ArbeidsforholdType.ORGANISASJON}>
                                    Arbeidsgiver med orgnummer
                                </option>
                            </Select>

                            {this.state.type === ArbeidsforholdType.PERSON && (
                                <div>
                                    <MockInput
                                        label="Ident:"
                                        onChange={(evt: any) => this.setState({ident: evt.target.value})}
                                        value={this.state.ident}
                                    />
                                </div>
                            )}

                            {this.state.type === ArbeidsforholdType.ORGANISASJON && (
                                <div>
                                    <MockInput
                                        label="Orgnummer:"
                                        onChange={(evt: any) => this.setState({orgnummer: evt.target.value})}
                                        value={this.state.orgnummer}
                                    />
                                </div>
                            )}
                            <button onClick={() => this.lagreNyttArbeidsforhold()}>Legg til</button>
                            <button onClick={() => this.setState({isOpened: false})}>Avbryt</button>
                        </div>
                    </div>
                </Collapse>
                <button className={plussButtonClassname} onClick={() => this.setState({isOpened: true})}>
                    +
                </button>
            </div>
        );
    }
}

export default NyttArbeidsforhold;

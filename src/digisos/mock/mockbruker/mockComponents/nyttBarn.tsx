import * as React from "react";
import {Radio} from "nav-frontend-skjema";
import {Collapse} from "react-collapse";
import MockInput from "./mockInput";

interface Props {
    onLeggTilNyttBarn: (data: any) => void;
}

interface State {
    isOpened: boolean;
    ident: string;
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
    sammeBostedsadresse: boolean;
    doedsdato: boolean;
    doedsdato_value: string;
}

export interface NyttBarnObject {
    ident: string;
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
    sammeBostedsadresse: boolean;
    doedsdato: boolean;
    doedsdato_value: string;
}

export class NyttBarn extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isOpened: false,
            ident: "01010591736",
            fornavn: "Anakin",
            mellomnavn: "",
            etternavn: "Skywalker",
            sammeBostedsadresse: true,
            doedsdato: false,
            doedsdato_value: "2000-01-01",
        };
    }

    lagreNyttBarn() {
        const nyttBarnObject: NyttBarnObject = {
            ident: this.state.ident,
            fornavn: this.state.fornavn,
            mellomnavn: this.state.mellomnavn,
            etternavn: this.state.etternavn,
            sammeBostedsadresse: this.state.sammeBostedsadresse,
            doedsdato: this.state.doedsdato,
            doedsdato_value: this.state.doedsdato_value,
        };

        this.props.onLeggTilNyttBarn(nyttBarnObject);
        this.setState({isOpened: false});
    }

    render() {
        const buttonClassName = this.state.isOpened ? "mock-hide" : "mock-show";

        return (
            <div>
                <Collapse isOpened={this.state.isOpened}>
                    <div className="mock-newThingWrapper">
                        <div className="mock-newThing-tittel">Legg til nytt barn:</div>
                        <div className="mock-newThing-body">
                            <MockInput
                                label="Fornavn:"
                                onChange={(evt: any) => this.setState({fornavn: evt.target.value})}
                                value={this.state.fornavn}
                            />

                            <MockInput
                                label="Mellomnavn:"
                                onChange={(evt: any) => this.setState({mellomnavn: evt.target.value})}
                                value={this.state.mellomnavn}
                            />

                            <MockInput
                                label="Etternavn:"
                                onChange={(evt: any) => this.setState({etternavn: evt.target.value})}
                                value={this.state.etternavn}
                            />

                            <div>
                                <label>Har samme bostedsadresse</label>
                                <Radio
                                    label={"Ja"}
                                    name={"bostedsadresse"}
                                    value={"ja"}
                                    onChange={() => this.setState({sammeBostedsadresse: true})}
                                    defaultChecked={true}
                                />
                                <Radio
                                    label={"Nei"}
                                    name={"bostedsadresse"}
                                    value={"nei"}
                                    onChange={() => this.setState({sammeBostedsadresse: false})}
                                />
                            </div>
                            <div>
                                <label>Har dødsdato</label>
                                <Radio
                                    label={"Nei"}
                                    name={"doedsdato"}
                                    value={"nei"}
                                    onChange={() => this.setState({doedsdato: false})}
                                    defaultChecked={true}
                                />
                                <Radio
                                    label={"Ja"}
                                    name={"doedsdato"}
                                    value={"ja"}
                                    onChange={() => this.setState({doedsdato: true})}
                                />
                            </div>
                            <Collapse isOpened={this.state.doedsdato}>
                                <label>DødsDato</label>
                                <input
                                    onChange={(evt: any) => this.setState({doedsdato_value: evt.target.value})}
                                    value={this.state.doedsdato_value}
                                />
                            </Collapse>

                            <button onClick={() => this.lagreNyttBarn()}>Ok</button>
                            <button onClick={() => this.setState({isOpened: false})}>Avbryt</button>
                        </div>
                    </div>
                </Collapse>

                <button className={buttonClassName} onClick={() => this.setState({isOpened: true})}>
                    +
                </button>
            </div>
        );
    }
}

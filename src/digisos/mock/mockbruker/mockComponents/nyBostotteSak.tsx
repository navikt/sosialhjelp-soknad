import * as React from 'react';
import {Collapse} from "react-collapse";
import MockInput from "./mockInput";
import {Select} from "nav-frontend-skjema";

interface Props {
    onLeggTilNySak: (data: any) => void;
}

interface State {
    isOpened: boolean;
    saksmnd: number;
    saksar: number;
    saksstatus: StatusType;
    saksbeskrivelse: string;
    vedtaksstatus?: VedtaksStatus;
    saksrolle: RolleType;
}

export class Vedtak {
    beskrivelse: string = "";
    status: string = "";
}

export class NySakObject {
    mnd: number = -1;
    ar: number = -1;
    status: string = "";
    vedtak?: Vedtak = undefined;
    rolle: string = "";
}

enum StatusType {
    UNDER_BEHANDLING = "UNDER_BEHANDLING",
    VEDTATT = "VEDTATT"
}

enum VedtaksStatus {
    INNVILGET = "INNVILGET",
    AVSLAG = "AVSLAG",
    AVVIST = "AVVIST"
}

enum Vedtakskode {
    V00 = "Innvilget bostøtte",
    V02 = "Ingen støtteberettigede",
    V03 = "For høy inntekt ift boutgift",
    V04 = "Boligen utenfor ordningen",
    V05 = "Ikke i folkereg. på sit-dato",
    V07 = "Innlevert etter søknadsfrist",
    V09 = "Manglende opplysninger",
    V11 = "Hovedperson er død",
    V12 = "For høy anslått inntekt",
    V48 = "Biperson ikke bosatt på søknadsadresse",
}

enum RolleType {
    HOVEDPERSON = "HOVEDPERSON"
}

export class NyBostotteSak extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        const now = new Date();

        this.state = {
            isOpened: false,
            saksmnd: now.getMonth()+1,
            saksar: now.getFullYear(),
            saksstatus: StatusType.UNDER_BEHANDLING,
            saksbeskrivelse: "",
            vedtaksstatus: undefined,
            saksrolle: RolleType.HOVEDPERSON,
        }
    }

    lagreNySak() {
        var vedtak = undefined;
        if(this.state.saksstatus === "VEDTATT") {
            vedtak = new Vedtak();
            vedtak.beskrivelse = this.state.saksbeskrivelse;
            vedtak.status = VedtaksStatus.AVSLAG;
            if (this.state.vedtaksstatus === "INNVILGET") {
                vedtak.status = VedtaksStatus.INNVILGET;
            }
            if (this.state.vedtaksstatus === "AVVIST") {
                vedtak.status = VedtaksStatus.AVVIST;
            }
        }
        const nySak: NySakObject = {
            ar: this.state.saksar,
            mnd: this.state.saksmnd,
            status: this.state.saksstatus,
            vedtak: vedtak,
            rolle: this.state.saksrolle,
        };

        this.props.onLeggTilNySak(nySak);
        this.setState({isOpened: false})
    }

    updateVedtak(value: string) {
        this.setState({saksbeskrivelse: value});
        if(value === Vedtakskode.V00) {
            this.setState({vedtaksstatus: VedtaksStatus.INNVILGET})
        } else if(value === Vedtakskode.V09) {
            this.setState({vedtaksstatus: VedtaksStatus.AVVIST})
        } else {
            this.setState({vedtaksstatus: VedtaksStatus.AVSLAG})
        }
    }

    render() {

        const buttonClassName = this.state.isOpened ? "mock-hide" : "mock-show";

        return (
            <div>
                <Collapse isOpened={this.state.isOpened}>
                    <div className="mock-newThingWrapper">
                        <div className="mock-newThing-tittel">Legg til bostotte utbetaling:</div>
                        <div className="mock-newThing-body">

                            <div className="mock-newThing-tittel">Legg til bostotte sak:</div>
                            <MockInput label="Måned:"
                                       onChange={(evt: any) => this.setState({saksmnd: evt.target.value})}
                                       value={this.state.saksmnd.toString()}/>
                            <MockInput label="År:" onChange={(evt: any) => this.setState({saksar: evt.target.value})}
                                       value={this.state.saksar.toString()}/>
                            <Select label='Status:'
                                    onChange={(evt: any) => {
                                        this.setState({saksstatus: evt.target.value});
                                        if (evt.target.value === StatusType.UNDER_BEHANDLING) {
                                            this.setState({saksbeskrivelse: ""});
                                            this.setState({vedtaksstatus: undefined});
                                        } else {
                                            this.setState({saksbeskrivelse: Vedtakskode.V00});
                                            this.setState({vedtaksstatus: VedtaksStatus.INNVILGET});
                                        }
                                    }}>
                                <option value={StatusType.UNDER_BEHANDLING} key={StatusType.UNDER_BEHANDLING}>
                                    Under behandling
                                </option>
                                <option value={StatusType.VEDTATT} key={StatusType.VEDTATT}>
                                    Vedtatt
                                </option>
                            </Select>
                            {this.state.saksstatus === StatusType.VEDTATT && (
                                <Select label='Beskrivelse (når status vedtatt):'
                                onChange={(evt: any) => this.updateVedtak(evt.target.value)}>
                                <option value={Vedtakskode.V00} key={Vedtakskode.V00}>
                                  {Vedtakskode.V00}
                                </option>
                                <option value={Vedtakskode.V02} key={Vedtakskode.V02}>
                                    {Vedtakskode.V02}
                                </option>
                                <option value={Vedtakskode.V03} key={Vedtakskode.V03}>
                                    {Vedtakskode.V03}
                                </option>
                                <option value={Vedtakskode.V04} key={Vedtakskode.V04}>
                                    {Vedtakskode.V04}
                                </option>
                                <option value={Vedtakskode.V05} key={Vedtakskode.V05}>
                                    {Vedtakskode.V05}
                                </option>
                                <option value={Vedtakskode.V07} key={Vedtakskode.V07}>
                                    {Vedtakskode.V07}
                                </option>
                                <option value={Vedtakskode.V09} key={Vedtakskode.V09}>
                                    {Vedtakskode.V09}
                                </option>
                                <option value={Vedtakskode.V11} key={Vedtakskode.V11}>
                                    {Vedtakskode.V11}
                                </option>
                                <option value={Vedtakskode.V12} key={Vedtakskode.V12}>
                                    {Vedtakskode.V12}
                                </option>
                                <option value={Vedtakskode.V48} key={Vedtakskode.V48}>
                                    {Vedtakskode.V48}
                                </option>
                                </Select>
                            )}
                            <button onClick={() => this.lagreNySak()}>Ok</button>
                            <button onClick={() => this.setState({isOpened: false})}>Avbryt</button>
                        </div>

                    </div>
                </Collapse>

                <button className={buttonClassName} onClick={() => this.setState({isOpened: true})}>+</button>
            </div>
        )
    }
}
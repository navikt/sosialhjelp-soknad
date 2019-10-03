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
	saksrolle: RolleType;
}

export class NySakObject {
	mnd: number = -1;
	ar: number = -1;
	status: string = "";
	vedtak: {} = {};
	rolle: string = "";
}

enum StatusType {
	UNDER_BEHANDLING = "UNDER_BEHANDLING",
	VEDTATT = "VEDTATT"
}

enum RolleType {
	HOVEDPERSON = "HOVEDPERSON",
	BIPERSON = "BIPERSON"
}

export class NyBostotteSak extends React.Component<Props, State>{

	constructor(props: Props){
		super(props);

		this.state = {
			isOpened: false,
			saksmnd: 9,
			saksar: 2019,
			saksstatus: StatusType.UNDER_BEHANDLING,
			saksbeskrivelse: "Vedtaks beskrivelse",
			saksrolle: RolleType.HOVEDPERSON,
		}
	}

	lagreNySak(){
		const nySak: NySakObject = {
			ar: this.state.saksar,
			mnd: this.state.saksmnd,
			status: this.state.saksstatus,
			vedtak: { beskrivelse: this.state.saksbeskrivelse },
			rolle: this.state.saksrolle,
		};

		this.props.onLeggTilNySak(nySak);
		this.setState({isOpened: false})
	}


	render(){

		const buttonClassName = this.state.isOpened ? "mock-hide" : "mock-show";

		return (
			<div>
				<Collapse isOpened={this.state.isOpened}>
					<div className="mock-newThingWrapper">
						<div className="mock-newThing-tittel">Legg til bostotte utbetaling:</div>
						<div className="mock-newThing-body">

							<div className="mock-newThing-tittel">Legg til bostotte sak:</div>
							<MockInput label="Måned:" onChange={(evt: any) => this.setState({saksmnd: evt.target.value})} value={this.state.saksmnd.toString()}/>
							<MockInput label="År:" onChange={(evt: any) => this.setState({saksar: evt.target.value})} value={this.state.saksar.toString()}/>
							<Select label='Status:' onChange={(evt: any) => this.setState({saksstatus: evt.target.value})}>
								<option value={StatusType.UNDER_BEHANDLING} key={StatusType.UNDER_BEHANDLING}>
									Under behandling
								</option>
								<option value={StatusType.VEDTATT} key={StatusType.VEDTATT}>
									Vedtatt
								</option>
							</Select>
							<MockInput label="Beskrivelse:" onChange={(evt: any) => this.setState({saksbeskrivelse: evt.target.value})} value={this.state.saksbeskrivelse}/>
							<Select label='Rolle:' onChange={(evt: any) => this.setState({saksrolle: evt.target.value})}>
								<option value={RolleType.HOVEDPERSON} key={RolleType.HOVEDPERSON}>
									Hovedperson
								</option>
								<option value={RolleType.BIPERSON} key={RolleType.BIPERSON}>
									Biperson
								</option>
							</Select>

							<button onClick={() => this.lagreNySak()}>Ok</button>
							<button onClick={() => this.setState({isOpened: false})}>Avbryt</button>
						</div>

					</div>
				</Collapse>

				<button className={ buttonClassName } onClick={() => this.setState({isOpened: true})}>+</button>
			</div>
		)
	}
}
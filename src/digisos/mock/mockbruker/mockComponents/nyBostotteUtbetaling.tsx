import * as React from 'react';
import {Collapse} from "react-collapse";
import MockInput from "./mockInput";
import {Select} from "nav-frontend-skjema";

interface Props {
	onLeggTilNyUtbetaling: (data: any) => void;
}

interface State {
	isOpened: boolean;
	utbetalingsdato: string;
	utbetalingsbelop: number;
	utbetalingsmottaker: string;
	utbetalingsrolle: string;
}

export class NyUtbetalingObject {
	utbetalingsdato: string = "";
	belop: number = -1;
	mottaker: string = "";
	rolle: string = "";
}

enum MottakerType {
	KOMMUNE = "KOMMUNE",
	HUSSTAND = "HUSSTAND"
}

enum RolleType {
	HOVEDPERSON = "HOVEDPERSON"
}

export class NyBostotteUtbetaling extends React.Component<Props, State>{

	constructor(props: Props){
		super(props);

		this.state = {
			isOpened: false,
			utbetalingsdato: "2019-09-01",
			utbetalingsbelop: 6000,
			utbetalingsmottaker: MottakerType.HUSSTAND,
			utbetalingsrolle: RolleType.HOVEDPERSON,
		}
	}

	lagreNyUtbetaling(){
		const nyUtbetaling: NyUtbetalingObject = {
			utbetalingsdato: this.state.utbetalingsdato,
			belop: this.state.utbetalingsbelop,
			mottaker: this.state.utbetalingsmottaker,
			rolle: this.state.utbetalingsrolle,
		};

		this.props.onLeggTilNyUtbetaling(nyUtbetaling);
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

							<MockInput label="Dato:" onChange={(evt: any) => this.setState({utbetalingsdato: evt.target.value})} value={this.state.utbetalingsdato}/>
							<MockInput label="Beløp:" onChange={(evt: any) => this.setState({utbetalingsbelop: evt.target.value})} value={this.state.utbetalingsbelop.toString()}/>
							<Select label='Mottaker:' onChange={(evt: any) => this.setState({utbetalingsmottaker: evt.target.value})}>
								<option value={MottakerType.HUSSTAND} key={MottakerType.HUSSTAND}>
									Husstand
								</option>
								<option value={MottakerType.KOMMUNE} key={MottakerType.KOMMUNE}>
									Kommune
								</option>
							</Select>

							<button onClick={() => this.lagreNyUtbetaling()}>Ok</button>
							<button onClick={() => this.setState({isOpened: false})}>Avbryt</button>
						</div>

					</div>
				</Collapse>

				<button className={ buttonClassName } onClick={() => this.setState({isOpened: true})}>+</button>
			</div>
		)
	}
}
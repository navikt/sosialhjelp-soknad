import * as React from 'react';
import {Collapse} from "react-collapse";
import MockInput from "./mockInput";

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

export class Utbetaling {
	utbetalingsdato: String = "";
	utbetalingsbelop: Number = -1;
	utbetalingsmottaker: String = "";
	utbetalingsrolle: String = "";
}

export class NyBostotteUtbetaling extends React.Component<Props, State>{

	constructor(props: Props){
		super(props);

		this.state = {
			isOpened: false,
			utbetalingsdato: "2019-09-01",
			utbetalingsbelop: 6000,
			utbetalingsmottaker: "Hans Olo",
			utbetalingsrolle: "HOVEDPERSON",
		}
	}

	lagreNyUtbetaling(){
		var nyUtbetaling: Utbetaling = new Utbetaling();
		nyUtbetaling.utbetalingsdato = this.state.utbetalingsdato;
		nyUtbetaling.utbetalingsbelop = this.state.utbetalingsbelop;
		nyUtbetaling.utbetalingsmottaker = this.state.utbetalingsmottaker;
		nyUtbetaling.utbetalingsrolle = this.state.utbetalingsrolle;

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
							<MockInput label="Mottaker:" onChange={(evt: any) => this.setState({utbetalingsmottaker: evt.target.value})} value={this.state.utbetalingsmottaker}/>
							<MockInput label="Rolle:" onChange={(evt: any) => this.setState({utbetalingsrolle: evt.target.value})} value={this.state.utbetalingsrolle}/>

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
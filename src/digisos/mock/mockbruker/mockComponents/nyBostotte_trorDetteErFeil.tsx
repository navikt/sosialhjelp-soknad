import * as React from 'react';
import {Collapse} from "react-collapse";
import MockInput from "./mockInput";

interface Props {
	onLeggTilNyBostotte: (data: any) => void;
}

interface State {
	isOpened: boolean;
	utbetalingsdato: string;
	utbetalingsbelop: number;
	utbetalingsmottaker: string;
	utbetalingsrolle: string;

	saksmnd: number;
	saksar: number;
	saksstatus: string;
}

export class Utbetaling {
	utbetalingsdato: String = "";
}

export class Sak {
	mnd: number = -1;
	ar: number = -1;
	status: string = "";
}

export class NyttBostotteObject {
	utbetalinger: Utbetaling[] = [];
	saker: Sak[] = [];
	leggTilUtbetaling(data: Utbetaling){
		this.utbetalinger.push(data);
	};
	leggTilSak(data: Sak){
		this.saker.push(data);
	};
}

export class NyBostotte_trorDetteErFeil extends React.Component<Props, State>{

	constructor(props: Props){
		super(props);

		this.state = {
			isOpened: false,
			utbetalingsdato: "2019-09-01",
			utbetalingsbelop: 6000,
			utbetalingsmottaker: "Hans Olo",
			utbetalingsrolle: "HOVEDPERSON",
			saksmnd: 9,
			saksar: 2019,
			saksstatus: "VEDTATT",
		}
	}

	lagreNyttBarn(){
		var nyttBostotteObject: NyttBostotteObject = new NyttBostotteObject();
		var nyUtbetaling: Utbetaling = new Utbetaling();
		nyUtbetaling.utbetalingsdato = this.state.utbetalingsdato;
		nyttBostotteObject.leggTilUtbetaling(nyUtbetaling);
		var nySak: Sak = new Sak();
		nySak.ar = this.state.saksar;
		nySak.mnd = this.state.saksmnd;
		nySak.status = this.state.saksstatus;
		nyttBostotteObject.leggTilSak(nySak);

		this.props.onLeggTilNyBostotte(nyttBostotteObject);
		this.setState({isOpened: false})
	}


	render(){

		const buttonClassName = this.state.isOpened ? "mock-hide" : "mock-show";

		return (
			<div>
				<Collapse isOpened={this.state.isOpened}>
					<div className="mock-newThingWrapper">
						<div className="mock-newThing-body">

							<div className="mock-newThing-tittel">Legg til bostotte utbetaling:</div>
							<MockInput label="Dato:" onChange={(evt: any) => this.setState({utbetalingsdato: evt.target.value})} value={this.state.utbetalingsdato}/>
							<MockInput label="Beløp:" onChange={(evt: any) => this.setState({utbetalingsbelop: evt.target.value})} value={this.state.utbetalingsbelop.toString()}/>
							<MockInput label="Mottaker:" onChange={(evt: any) => this.setState({utbetalingsmottaker: evt.target.value})} value={this.state.utbetalingsmottaker}/>
							<MockInput label="Rolle:" onChange={(evt: any) => this.setState({utbetalingsrolle: evt.target.value})} value={this.state.utbetalingsrolle}/>

							<div className="mock-newThing-tittel">Legg til bostotte sak:</div>
							<MockInput label="Måned:" onChange={(evt: any) => this.setState({saksmnd: evt.target.value})} value={this.state.saksmnd.toString()}/>
							<MockInput label="År:" onChange={(evt: any) => this.setState({saksar: evt.target.value})} value={this.state.saksar.toString()}/>
							<MockInput label="Status:" onChange={(evt: any) => this.setState({saksstatus: evt.target.value})} value={this.state.saksstatus}/>

							<button onClick={() => this.lagreNyttBarn()}>Ok</button>
							<button onClick={() => this.setState({isOpened: false})}>Avbryt</button>
						</div>

					</div>
				</Collapse>

				<button className={ buttonClassName } onClick={() => this.setState({isOpened: true})}>+</button>
			</div>
		)
	}
}
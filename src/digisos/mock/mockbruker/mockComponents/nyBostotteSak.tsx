import * as React from 'react';
import {Collapse} from "react-collapse";
import MockInput from "./mockInput";

interface Props {
	onLeggTilNySak: (data: any) => void;
}

interface State {
	isOpened: boolean;

	saksmnd: number;
	saksar: number;
	saksstatus: string;
}

export class NySakObject {
	mnd: number = -1;
	ar: number = -1;
	status: string = "";
}

export class NyBostotteSak extends React.Component<Props, State>{

	constructor(props: Props){
		super(props);

		this.state = {
			isOpened: false,
			saksmnd: 9,
			saksar: 2019,
			saksstatus: "VEDTATT",
		}
	}

	lagreNySak(){
		const nySak: NySakObject = {
			ar: this.state.saksar,
			mnd: this.state.saksmnd,
			status: this.state.saksstatus,
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
							<MockInput label="Status:" onChange={(evt: any) => this.setState({saksstatus: evt.target.value})} value={this.state.saksstatus}/>

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
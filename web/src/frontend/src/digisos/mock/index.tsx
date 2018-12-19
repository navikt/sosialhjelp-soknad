import * as React from "react";
import { connect } from "react-redux";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import "whatwg-fetch";


import PredefinerteBrukere from "./PredefinerteBrukere";
import EgendefinertBruker from "./EgendefinertBruker";
import {SystemdataMockAPI} from "./systemdataMockAPI/systemdataMockAPI";


export interface PersonJsonData {
	"adresser" : object;
	"arbeid" : object;
	"brukerprofil": object;
	"familie": object;
	"norg": object;
	"organisasjon": object;
	"telefon": object;
	"utbetaling": object;
}

export interface PersonJsonDescription {
	"name": string;
	"adresser": string;
	"telefon" :  string;
	"bankkonto":  string;
	"arbeid":  string;
	"gift": string;
	"barn":  string;
	"utbetalinger":  string;
}


export interface StateProps {
	router: any
}

type Props = StateProps & DispatchProps;

class Mock extends React.Component<Props, {}> {

	componentDidMount() {
		const mockdataName = "systemdataMock";
		window[mockdataName] = SystemdataMockAPI;

		/*
		window[mockdataName] =  (melding: string) => {
			document.getElementById("root").innerHTML = "okok" + melding;
		};
		*/
	}

	render() {
		return (
			<div>
				<div className="mock-body">
					<EgendefinertBruker />
				</div>
				<p className="sectionBreak" />
				<div className="mock-predefinerte-brukere-bolk">
					<PredefinerteBrukere />
				</div>
			</div>
		);
	}
}

export default connect((state: StateProps) => ({
	router: state.router
}))(Mock);


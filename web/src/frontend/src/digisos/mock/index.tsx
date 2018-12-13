import * as React from "react";
import { connect } from "react-redux";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import "whatwg-fetch";
import {getApiBaseUrl, getCookie} from "../../nav-soknad/utils/rest-utils";
import {tilStart} from "../../nav-soknad/redux/navigasjon/navigasjonActions";

import endpoints from "./endpoints.json";


import PredefinerteBrukere from "./predefinerteBrukere";
import EgendefinertBruker from "./EgendefinertBruker";


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

	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		const mockdataName = "systemdataMock";
		window[mockdataName] =  (melding: string) => {
			console.warn("My life, for Aiur. Melding: " + melding);
			return "Returned from window function";
		};
	}

	settMockData(path: string, payload: object) {
		const url = getApiBaseUrl() + "internal/mock/tjeneste/" + path;
		const OPTIONS: RequestInit = {
			headers: new Headers({
				"accept": "application/json, text/plain, */*",
				"Content-Type": "application/json",
				"X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API")
			}),
			method: "POST",
			credentials: "same-origin",
			body: JSON.stringify(payload)
		};
		return fetch(url, OPTIONS)
			.then((response: Response) => {
				return ;
			});
	}

	handleClick(person: PersonJsonData){
		this.settMockData(endpoints.adresser, person.adresser);
		this.settMockData(endpoints.arbeid, person.arbeid);
		this.settMockData(endpoints.brukerprofil, person.brukerprofil);
		this.settMockData(endpoints.familie, person.familie);
		this.settMockData(endpoints.norg, person.norg);
		this.settMockData(endpoints.organisasjon, person.organisasjon);
		this.settMockData(endpoints.telefon, person.telefon);
		this.settMockData(endpoints.utbetaling, person.utbetaling);

		this.props.dispatch(tilStart());
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


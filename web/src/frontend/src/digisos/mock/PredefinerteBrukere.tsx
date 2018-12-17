import * as React from "react";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import "whatwg-fetch";
import {getApiBaseUrl, getCookie} from "../../nav-soknad/utils/rest-utils";
import {tilStart} from "../../nav-soknad/redux/navigasjon/navigasjonActions";

import endpoints from "./systemdataMockAPI/endpoints.json";


import JimDescription from "./jsonPredefinedPeople/jim/description.json";
import JimJsonData from "./jsonPredefinedPeople/jim/index";
import SarahDescription from "./jsonPredefinedPeople/sarah/description.json"
import SarahJsonData from "./jsonPredefinedPeople/sarah";
import HierarchDescription from "./jsonPredefinedPeople/hierarch/description.json"
import HierarchJsonData from "./jsonPredefinedPeople/hierarch";
import NeoDescription from "./jsonPredefinedPeople/neo/description.json"
import NeoJsonData from "./jsonPredefinedPeople/neo";
import {PersonJsonData, PersonJsonDescription, StateProps} from "./index";
import {connect} from "react-redux";


type Props = DispatchProps & StateProps;

class PredefinerteBrukere extends React.Component<Props, {}> {

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

	returnPersonBlock(data: PersonJsonData, description: PersonJsonDescription){
		return (
			<div className="mock-person-block">
				<div className="mock-person-block-left">
					<button className="mock-choose-person-button" onClick={() => this.handleClick(data)}>{">"}</button>
				</div>
				<div className="mock-person-block-right">
					<h3 className="mock-person-header">{description.name}</h3>
					<table className="mock-person-table">
						<tbody>
						<tr>
							<td className="mock-table-element-title">Adresse:</td><td>{description.adresser}</td>
						</tr>
						<tr>
							<td className="mock-table-element-title">Telefon:</td><td>{description.telefon}</td>
						</tr>
						<tr>
							<td className="mock-table-element-title">Bankkonto:</td><td>{description.bankkonto}</td>
						</tr>
						<tr>
							<td className="mock-table-element-title">Arbeid:</td><td>{description.arbeid}</td>
						</tr>
						<tr>
							<td className="mock-table-element-title">Sivilstatus:</td><td>{description.gift}</td>
						</tr>
						<tr>
							<td className="mock-table-element-title">Barn:</td><td>{description.barn}</td>
						</tr>
						<tr>
							<td className="mock-table-element-title">Utbetalinger:</td><td>{description.utbetalinger}</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}

	render() {

		return (
			<div className="mock-body">
				<div className="mock-body-center">
					{ this.returnPersonBlock(JimJsonData, JimDescription) }
					{ this.returnPersonBlock(SarahJsonData, SarahDescription) }
					{ this.returnPersonBlock(HierarchJsonData, HierarchDescription) }
					{ this.returnPersonBlock(NeoJsonData, NeoDescription) }
				</div>
			</div>
		);
	}
}

export default connect((state: StateProps) => ({
	router: state.router
}))(PredefinerteBrukere);

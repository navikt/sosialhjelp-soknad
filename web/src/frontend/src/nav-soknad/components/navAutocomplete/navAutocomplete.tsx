import * as React from "react";
import { fetchToJson } from "../../utils/rest-utils";

// import { lesAdresser } from "../../nav-soknad/redux/kommuner/kommuneActions";

const Autocomplete = require("react-autocomplete");

interface StateProps {
	value: string;
	adresser: any[];
}

class NavAutocomplete extends React.Component<{}, StateProps> {

	constructor(props: {}) {
		super(props);
		this.state = {
			value: "",
			adresser: []
		};
	}

	matchStateToTerm(state: any, value: any) {
		return (
			state.adresse.toLowerCase().indexOf(value.toLowerCase()) !== -1
			// ||
			// state.abbr.toLowerCase().indexOf(value.toLowerCase()) !== -1
		);
	}

	sortStates(a: any, b: any, value: any) {
		const aLower = a.adresse.toLowerCase();
		const bLower = b.adresse.toLowerCase();
		const valueLower = value.toLowerCase();
		const queryPosA = aLower.indexOf(valueLower);
		const queryPosB = bLower.indexOf(valueLower);
		if (queryPosA !== queryPosB) {
			return queryPosA - queryPosB;
		}
		return aLower < bLower ? -1 : 1;
	}

	hentAdresser() {
		return [
			{
				"adresse": "SANNERGATA",
				"kommunenummer": "0216",
				"kommunenavn": "Nesodden",
				"postnummer": null,
				"poststed": null,
				"geografiskTilknytning": "0216",
				"gatekode": "02081",
				"bydel": null
			},
			{
				"adresse": "SANNERGATA",
				"kommunenummer": "0403",
				"kommunenavn": "Hamar",
				"postnummer": null,
				"poststed": null,
				"geografiskTilknytning": "0403",
				"gatekode": "02081",
				"bydel": null
			},
			{
				"adresse": "SANNERGATA",
				"kommunenummer": "0631",
				"kommunenavn": "Flesberg",
				"postnummer": "3614",
				"poststed": "KONGSBERG",
				"geografiskTilknytning": "0631",
				"gatekode": "02081",
				"bydel": ""
			},
			{
				"adresse": "SANNERGATA",
				"kommunenummer": "0438",
				"kommunenavn": "Alvdal",
				"postnummer": "2560",
				"poststed": "ALVDAL",
				"geografiskTilknytning": "0438",
				"gatekode": "02081",
				"bydel": null
			}
		];
	}

	onChange( event: any, value: string) {
		console.warn("===> nytt requiest : " + value);
		this.setState({ value });
		if (value.length >= 3) {
			fetchToJson("informasjon/adressesok?sokestreng=" + value)
				.then((response: any) => {
					/// console.warn(JSON.stringify(response, null, 4));
					console.warn("==> response " + response.length);
					this.setState({adresser: response});
				})
				.catch((error: any) => {
					console.error(error);
				});
		} else {
			this.setState({adresser: []});
		}
	}

	formatItem(item: any) {
		return `${item.adresse}, ${item.postnummer} ${item.poststed}`;
	}

	render() {
		return (
			<div className="navAutcomplete">
				<Autocomplete
					value={this.state.value}
					inputProps={{id: "states-autocomplete"}}
					wrapperStyle={{position: "relative", display: "inline-block"}}
					items={ this.state.adresser.slice(0, 8) }
					getItemValue={(item: any) => item.adresse}
					shouldItemRender={this.matchStateToTerm}
					sortItems={this.sortStates}
					onChange={(event: any, value: string) => this.onChange(event, value)}
					onSelect={(value: any) => this.setState({value})}
					renderMenu={(children: any) => (
						<div className="menu">
							{children}
						</div>
					)}
					renderItem={(item: any, isHighlighted: any) => (
						<div
							className={`item ${isHighlighted ? "item-highlighted" : ""}`}
							key={Math.random()}
						>{this.formatItem(item)}</div>
					)}
				/>
			</div>
		);
	}
}

export default NavAutocomplete;

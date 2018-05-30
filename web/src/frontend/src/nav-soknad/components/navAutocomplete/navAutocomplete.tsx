import * as React from "react";
// import { lesAdresser } from "../../nav-soknad/redux/kommuner/kommuneActions";

const Autocomplete = require("react-autocomplete");

interface StateProps {
	value: string;
}

class NavAutocomplete extends React.Component<{}, StateProps> {

	constructor(props: {}) {
		super(props);
		this.state = {
			value: ""
		};
	}

	matchStateToTerm(state: any, value: any) {
		return (
			state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
			state.abbr.toLowerCase().indexOf(value.toLowerCase()) !== -1
		);
	}

	sortStates(a: any, b: any, value: any) {
		const aLower = a.name.toLowerCase();
		const bLower = b.name.toLowerCase();
		const valueLower = value.toLowerCase();
		const queryPosA = aLower.indexOf(valueLower);
		const queryPosB = bLower.indexOf(valueLower);
		if (queryPosA !== queryPosB) {
			return queryPosA - queryPosB;
		}
		return aLower < bLower ? -1 : 1;
	}

	matchStateToTermWithHeaders(state: any, value: any) {
		return (
			state.header ||
			state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
			state.abbr.toLowerCase().indexOf(value.toLowerCase()) !== -1
		);
	}


	getStates() {
		return [
			{abbr: "AL", name: "Alabama"},
			{abbr: "AK", name: "Alaska"},
			{abbr: "AZ", name: "Arizona"},
			{abbr: "AR", name: "Arkansas"},
			{abbr: "CA", name: "California"},
			{abbr: "CO", name: "Colorado"},
			{abbr: "CT", name: "Connecticut"},
			{abbr: "DE", name: "Delaware"},
			{abbr: "FL", name: "Florida"},
			{abbr: "GA", name: "Georgia"},
			{abbr: "HI", name: "Hawaii"},
			{abbr: "ID", name: "Idaho"},
			{abbr: "IL", name: "Illinois"},
			{abbr: "IN", name: "Indiana"},
			{abbr: "IA", name: "Iowa"},
			{abbr: "KS", name: "Kansas"},
			{abbr: "KY", name: "Kentucky"},
			{abbr: "LA", name: "Louisiana"},
			{abbr: "ME", name: "Maine"},
			{abbr: "MD", name: "Maryland"},
			{abbr: "MA", name: "Massachusetts"},
			{abbr: "MI", name: "Michigan"},
			{abbr: "MN", name: "Minnesota"},
			{abbr: "MS", name: "Mississippi"},
			{abbr: "MO", name: "Missouri"},
			{abbr: "MT", name: "Montana"},
			{abbr: "NE", name: "Nebraska"},
			{abbr: "NV", name: "Nevada"},
			{abbr: "NH", name: "New Hampshire"},
			{abbr: "NJ", name: "New Jersey"},
			{abbr: "NM", name: "New Mexico"},
			{abbr: "NY", name: "New York"},
			{abbr: "NC", name: "North Carolina"},
			{abbr: "ND", name: "North Dakota"},
			{abbr: "OH", name: "Ohio"},
			{abbr: "OK", name: "Oklahoma"},
			{abbr: "OR", name: "Oregon"},
			{abbr: "PA", name: "Pennsylvania"},
			{abbr: "RI", name: "Rhode Island"},
			{abbr: "SC", name: "South Carolina"},
			{abbr: "SD", name: "South Dakota"},
			{abbr: "TN", name: "Tennessee"},
			{abbr: "TX", name: "Texas"},
			{abbr: "UT", name: "Utah"},
			{abbr: "VT", name: "Vermont"},
			{abbr: "VA", name: "Virginia"},
			{abbr: "WA", name: "Washington"},
			{abbr: "WV", name: "West Virginia"},
			{abbr: "WI", name: "Wisconsin"},
			{abbr: "WY", name: "Wyoming"}
		];
	}

	getCategorizedStates() {
		return [
			{header: "West"},
			{abbr: "AZ", name: "Arizona"},
			{abbr: "CA", name: "California"},
			{abbr: "CO", name: "Colorado"},
			{abbr: "ID", name: "Idaho"},
			{abbr: "MT", name: "Montana"},
			{abbr: "NV", name: "Nevada"},
			{abbr: "NM", name: "New Mexico"},
			{abbr: "OK", name: "Oklahoma"},
			{abbr: "OR", name: "Oregon"},
			{abbr: "TX", name: "Texas"},
			{abbr: "UT", name: "Utah"},
			{abbr: "WA", name: "Washington"},
			{abbr: "WY", name: "Wyoming"},
			{header: "Southeast"},
			{abbr: "AL", name: "Alabama"},
			{abbr: "AR", name: "Arkansas"},
			{abbr: "FL", name: "Florida"},
			{abbr: "GA", name: "Georgia"},
			{abbr: "KY", name: "Kentucky"},
			{abbr: "LA", name: "Louisiana"},
			{abbr: "MS", name: "Mississippi"},
			{abbr: "NC", name: "North Carolina"},
			{abbr: "SC", name: "South Carolina"},
			{abbr: "TN", name: "Tennessee"},
			{abbr: "VA", name: "Virginia"},
			{abbr: "WV", name: "West Virginia"},
			{header: "Midwest"},
			{abbr: "IL", name: "Illinois"},
			{abbr: "IN", name: "Indiana"},
			{abbr: "IA", name: "Iowa"},
			{abbr: "KS", name: "Kansas"},
			{abbr: "MI", name: "Michigan"},
			{abbr: "MN", name: "Minnesota"},
			{abbr: "MO", name: "Missouri"},
			{abbr: "NE", name: "Nebraska"},
			{abbr: "OH", name: "Ohio"},
			{abbr: "ND", name: "North Dakota"},
			{abbr: "SD", name: "South Dakota"},
			{abbr: "WI", name: "Wisconsin"},
			{header: "Northeast"},
			{abbr: "CT", name: "Connecticut"},
			{abbr: "DE", name: "Delaware"},
			{abbr: "ME", name: "Maine"},
			{abbr: "MD", name: "Maryland"},
			{abbr: "MA", name: "Massachusetts"},
			{abbr: "NH", name: "New Hampshire"},
			{abbr: "NJ", name: "New Jersey"},
			{abbr: "NY", name: "New York"},
			{abbr: "PA", name: "Pennsylvania"},
			{abbr: "RI", name: "Rhode Island"},
			{abbr: "VT", name: "Vermont"},
			{header: "Pacific"},
			{abbr: "AK", name: "Alaska"},
			{abbr: "HI", name: "Hawaii"},
		];
	}

	render() {
		return (
			<div className="navAutcomplete">
				<Autocomplete
					value={this.state.value}
					inputProps={{id: "states-autocomplete"}}
					wrapperStyle={{position: "relative", display: "inline-block"}}
					items={this.getStates().slice(0,8)}
					getItemValue={(item: any) => item.name}
					shouldItemRender={this.matchStateToTerm}
					sortItems={this.sortStates}
					onChange={(event: any, value: any) => this.setState({value})}
					onSelect={(value: any) => this.setState({value})}
					renderMenu={(children: any) => (
						<div className="menu">
							{children}
						</div>
					)}
					renderItem={(item: any, isHighlighted: any) => (
						<div
							className={`item ${isHighlighted ? "item-highlighted" : ""}`}
							key={item.abbr}
						>{item.name}</div>
					)}
				/>
			</div>
		);
	}
}

export default NavAutocomplete;


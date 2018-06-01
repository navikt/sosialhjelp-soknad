import * as React from "react";
import { fetchToJson } from "../../utils/rest-utils";
import DigisosIkon from "../../../nav-soknad/components/digisosIkon/digisosIkon";
import NavFrontendSpinner from "nav-frontend-spinner";

// import { lesAdresser } from "../../nav-soknad/redux/kommuner/kommuneActions";

function setCaretPosition(ctrl: any, pos: number) {
	// Modern browsers
	if (ctrl.setSelectionRange) {
		ctrl.focus();
		ctrl.setSelectionRange(pos, pos);

		// IE8 and below
	} else if (ctrl.createTextRange) {
		const range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd("character", pos);
		range.moveStart("character", pos);
		range.select();
	}
}

const Autocomplete = require("react-autocomplete");

const enum autcompleteTilstand {
	INITIELL = "INITIELL",
	SOKER = "SOKER",
	ADRESSE_OK = "ADRESSE_OK",
	ADRESSE_UGYLDIG = "ADRESSE_UGYLDIG"
}

interface StateProps {
	value: string;
	adresser: any[];
	adresserWithId: any[];
	valueIsValid: undefined | false | true;
	cursorPosisjon: number;
	searching: boolean; // TODO Fjerne denne
	antallAktiveSok: number;
	tilstand: autcompleteTilstand;
	valgtAdresse: undefined | {
		"adresse": null | string,
		"kommunenummer": null | string,
		"kommunenavn": null | string,
		"postnummer": null | string,
		"poststed": null | string,
		"geografiskTilknytning":  null | string,
		"gatekode":  null | string,
		"bydel":  null | string,
	};
}

class NavAutocomplete extends React.Component<{onDataVerified: any}, StateProps> {

	constructor(props: {onDataVerified: any}) {
		super(props);
		this.state = {
			value: "",
			cursorPosisjon: 0,
			valgtAdresse: {
				"adresse": null,
				"kommunenummer": null,
				"kommunenavn": null,
				"postnummer": null,
				"poststed": null,
				"geografiskTilknytning": null,
				"gatekode": null,
				"bydel": null
			},
			adresser: [],
			adresserWithId: [],
			valueIsValid: undefined,
			searching: true,
			antallAktiveSok: 0,
			tilstand: autcompleteTilstand.INITIELL
		};
	}

	matchStateToTerm(state: any, value: any) {
		return (
			state.adresse.toLowerCase().indexOf(value.toLowerCase()) !== -1
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

	componentDidUpdate() {
		if (this.state.cursorPosisjon > 0) {
			const input = document.getElementById("states-autocomplete");
			setCaretPosition(input, this.state.cursorPosisjon);
			this.setState({cursorPosisjon: 0});
		}
	}

	onChange( event: any, value: string) {
		this.setState({ value });
		if (value.length >= 3) {
			this.setState({ antallAktiveSok: this.state.antallAktiveSok +1 });
			fetchToJson("informasjon/adressesok?sokestreng=" + value)
				.then((response: any) => {
					this.setState({ adresser: response });
					this.setState({ antallAktiveSok: this.state.antallAktiveSok -1 });
				})
				.catch((error: any) => {
					console.error(error);
					this.setState({ antallAktiveSok: this.state.antallAktiveSok -1 });
				});
			this.setState({valueIsValid: true});
		} else {
			this.setState({adresser: [], valueIsValid: false});
		}
	}

	onSelect(value: any, item: any) {
		this.setState({
			value: this.formatItem(item, true),
			cursorPosisjon: item.adresse.length + 1,
			valgtAdresse: item
		});
		this.props.onDataVerified(item);
	}

	formatItem(item: any, addSpaceAfterAddress: boolean) {
		let value = item.adresse;
		if (addSpaceAfterAddress) {
			value += " ";
		}
		if (item.postnummer !== null && item.poststed !== null) {
			value += ", " + item.postnummer + " " + item.poststed;
		} else {
			if (item.kommunenavn !== null) {
				value += ", " + item.kommunenavn;
			}
		}
		return value;
	}

	visIkon() {
			let ikkeValid: boolean = true;
			let advarsel: boolean = false;
			let ok: boolean = false;
			if (this.state.valueIsValid === undefined) {
				ikkeValid = true;
			} else if (this.state.valueIsValid === false) {
				ikkeValid = false;
				advarsel = true;
				ok = false;
			} else {
				advarsel = false;
				ikkeValid = false;
				ok = true;
			}
			return (
				<span className="valideringsStatus">
					{this.state.antallAktiveSok > 0 && (
						<span className="navAutcomplete__spinner">
							<NavFrontendSpinner  type="XS" />
						</span>
					)}
					{this.state.antallAktiveSok === 0 && (
						<span>
							{ikkeValid && <DigisosIkon navn="searchAddresse" />}
							{advarsel && <DigisosIkon navn="reportProblemCircle" />}
							{ok && <DigisosIkon navn="checkCircle" />}
						</span>
					)}
				</span>
			);
	}

	render() {
		return (
			<div className="navAutcomplete">
				<Autocomplete
					value={this.state.value}
					inputProps={{id: "states-autocomplete", placeholder: "Gatenavn, kommune eller postnummer" }}
					wrapperStyle={{position: "relative", display: "inline-block"}}
					items={ this.state.adresser.slice(0, 8) }
					getItemValue={(item: any) => item.adresse}
					shouldItemRender={this.matchStateToTerm}
					sortItems={this.sortStates}
					onChange={(event: any, value: string) => this.onChange(event, value)}
					onSelect={(value: any, item: any) => this.onSelect(value, item)}
					renderMenu={(children: any) => (
						<div className="menu">
							{children}
						</div>
					)}
					renderItem={(item: any, isHighlighted: any) => (
						<div
							className={`item ${isHighlighted ? "item-highlighted" : ""}`}
							key={Math.random()}
						>{this.formatItem(item, false)}</div>
					)}
				/>
				{ this.visIkon()}
				<div>
					{this.state.valgtAdresse.kommunenavn !== null && (
						<p>Søknaden vil bli sendt til { this.state.valgtAdresse.kommunenavn } kommune.</p>
					)}
				</div>
			</div>
		);
	}
}

export default NavAutocomplete;

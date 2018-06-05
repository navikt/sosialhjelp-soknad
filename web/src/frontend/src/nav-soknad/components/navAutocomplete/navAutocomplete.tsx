import * as React from "react";
import { fetchToJson } from "../../utils/rest-utils";
import DigisosIkon from "../../../nav-soknad/components/digisosIkon/digisosIkon";
import NavFrontendSpinner from "nav-frontend-spinner";

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
	ADRESSE_UGYLDIG = "ADRESSE_UGYLDIG",
	ADRESSE_IKKE_VALGT = "ADRESSE_IKKE_VALGT"
}

interface Adresse {
	"adresse": null | string;
	"husnummer": null | string;
	"husbokstav": null | string;
	"kommunenummer": null | string;
	"kommunenavn": null | string;
	"postnummer": null | string;
	"poststed": null | string;
	"geografiskTilknytning":  null | string;
	"gatekode":  null | string;
	"bydel":  null | string;
}

interface StateProps {
	value: string;
	adresser: Adresse[];
	adresserWithId: any[];
	valueIsValid: undefined | false | true;
	cursorPosisjon: number;
	searching: boolean; // TODO Fjerne denne
	antallAktiveSok: number;
	tilstand: autcompleteTilstand;
	valgtAdresse?: Adresse;
	//abortController: any;
	//abortSignal: any;
	sokPostponed: boolean;
}

class NavAutocomplete extends React.Component<{onDataVerified: any}, StateProps> {

	constructor(props: {onDataVerified: any}) {
		super(props);

		//const abortController = new AbortController();
		//const abortSignal = abortController.signal;

		this.state = {
			value: "",
			cursorPosisjon: 0,
			valgtAdresse: {
				"adresse": null,
				"husnummer": null,
				"husbokstav": null,
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
			tilstand: autcompleteTilstand.INITIELL,
			//abortController: abortController,
			//abortSignal: abortSignal,
			sokPostponed: false
		};
	}

	componentDidUpdate() {
		if (this.state.cursorPosisjon > 0) {
			const input = document.getElementById("states-autocomplete");
			setCaretPosition(input, this.state.cursorPosisjon);
			this.setState({ cursorPosisjon: 0 });
		}
	}

	onSelect(value: string, adresse: Adresse) {

		console.warn(adresse);
		this.setState({
			value: this.formaterAdresseString(adresse),
			cursorPosisjon: this.settCursorPosisjon(adresse),
			valgtAdresse: adresse,
			tilstand: autcompleteTilstand.ADRESSE_OK
		});
		this.props.onDataVerified(adresse);
	}

	invalidateFetch(value: string) {
		this.props.onDataVerified(null);
		this.setState({ value , tilstand: autcompleteTilstand.ADRESSE_UGYLDIG});
	}

	shouldFetch(value: string) {
		return value.length >= 3;
	}

	executeFetch(value: string) {
		this.setState({sokPostponed: false});
		this.setState({antallAktiveSok: this.state.antallAktiveSok + 1});
		fetchToJson("informasjon/adressesok?sokestreng=" + value)
			.then((response: any) => {
				this.setState({adresser: response});
				this.setState({antallAktiveSok: this.state.antallAktiveSok - 1});
				if (this.state.sokPostponed) {
					const newValue = this.state.value;
					this.invalidateFetch(newValue);
					if (this.shouldFetch(newValue)) {
						this.executeFetch(newValue);
					}
				}
			})
			.catch((error: any) => {
				console.error(error);
				this.setState({
					antallAktiveSok: this.state.antallAktiveSok - 1,
					tilstand: autcompleteTilstand.ADRESSE_UGYLDIG
				});
			});
	}

	onChange( event: any, value: string) {
		//this.abortController.abort();
		this.invalidateFetch(value);
		if (this.shouldFetch(value)) {
			if (this.state.antallAktiveSok === 0) {
				this.executeFetch(value);
			} else {
				this.setState({sokPostponed: true});
			}
			this.setState({tilstand: this.state.adresser.length === 1 ? autcompleteTilstand.ADRESSE_OK : autcompleteTilstand.ADRESSE_IKKE_VALGT});
		} else {
			this.setState({adresser: [], tilstand: autcompleteTilstand.ADRESSE_UGYLDIG});
		}
	}

	formaterAdresseString(adresse: Adresse) {
		let value = adresse.adresse;
		const husbokstav: string = adresse.husbokstav ? adresse.husbokstav : "";
		if (adresse.postnummer !== null && adresse.poststed !== null) {
			if (adresse.husnummer !== "") {
				value += " " + adresse.husnummer + husbokstav + ", " + adresse.postnummer + " " + adresse.poststed;
			} else {
				value += " , " + adresse.postnummer + " " + adresse.poststed;
			}
		} else if (adresse.kommunenavn !== null) {

			if (adresse.husnummer !== "") {
				value += " " + adresse.husnummer + husbokstav + ", " + adresse.kommunenavn;
			} else {
				value += " , " + adresse.kommunenavn;
			}
		}

		return value;
	}

	settCursorPosisjon(adresse: Adresse){
		// const husnummer: string = adresse.husnummer ? adresse.husnummer : " ";
		// const husbokstav: string = adresse.husbokstav ? adresse.husbokstav : "";
		const husbokstav = adresse.husbokstav ? adresse.husbokstav : "";

		return adresse.husnummer ? adresse.adresse.length + adresse.husnummer.length + husbokstav.length + 1 : adresse.adresse.length + 1;
			// adresse.adresse.length + husnummer.length + husbokstav.length;

	}

	visIkon() {
			return (
				<span className="valideringsStatus">
					{this.state.antallAktiveSok > 0 && (
						<span className="navAutcomplete__spinner">
							<NavFrontendSpinner  type="XS" />
						</span>
					)}
					{this.state.antallAktiveSok === 0 && (
						<span>
							{this.state.tilstand === autcompleteTilstand.INITIELL && <DigisosIkon navn="searchAddresse" />}
							{this.state.tilstand === autcompleteTilstand.ADRESSE_OK && <DigisosIkon navn="checkCircle" />}
							{this.state.tilstand === autcompleteTilstand.ADRESSE_UGYLDIG && <DigisosIkon navn="advarselSirkel" />}
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
					onChange={(event: any, value: string) => this.onChange(event, value)}
					onSelect={(value: any, item: any) => this.onSelect(value, item)}
					renderMenu={(children: any) => (
						<span>
						{children.toString() === "" && (<span/>)}
						{children.toString() !== "" && (
							<div className="menu">
								{children}
							</div>)}
						</span>
					)}
					renderItem={(item: any, isHighlighted: any) => (
						<div
							className={`item ${isHighlighted ? "item-highlighted" : ""}`}
							key={Math.random()}
						>{this.formaterAdresseString(item)}</div>
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

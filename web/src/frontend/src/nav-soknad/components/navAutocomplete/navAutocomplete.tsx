import * as React from "react";
import { fetchToJson } from "../../utils/rest-utils";
import DigisosIkon from "../../../nav-soknad/components/digisosIkon/digisosIkon";
import NavFrontendSpinner from "nav-frontend-spinner";
import { Faktum } from "../../types";

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

export const enum autcompleteTilstand {
	INITIELL = "INITIELL",
	SOKER = "SOKER",
	ADRESSE_OK = "ADRESSE_OK",
	ADRESSE_UGYLDIG = "ADRESSE_UGYLDIG",
	ADRESSE_IKKE_VALGT = "ADRESSE_IKKE_VALGT",
	HUSNUMMER_IKKE_SATT = "HUSNUMMER_IKKE_SATT"
}

export interface Adresse {
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
	antallAktiveSok: number;
	tilstand: autcompleteTilstand;
	valgtAdresse: Adresse | null;
	sokPostponed: boolean;
	open: boolean;
}

interface Props {
	onValgtVerdi: (data: any) => void;
	onOppdaterTilstand?: (tilstand: autcompleteTilstand) => void;
	adresseFaktum: Faktum;
}

class NavAutocomplete extends React.Component<Props, StateProps> {

	constructor(props: Props) {
		super(props);

		const angittAdresse: Adresse = this.hentAdresseFraFaktum(props.adresseFaktum.properties);
		const value = this.formaterAdresseString(angittAdresse);
		this.state = {
			value,
			cursorPosisjon: 0,
			valgtAdresse: null,
			// valgtAdresse: {
			// 	"adresse": null,
			// 	"husnummer": null,
			// 	"husbokstav": null,
			// 	"kommunenummer": null,
			// 	"kommunenavn": null,
			// 	"postnummer": null,
			// 	"poststed": null,
			// 	"geografiskTilknytning": null,
			// 	"gatekode": null,
			// 	"bydel": null
			// },
			adresser: [],
			adresserWithId: [],
			valueIsValid: undefined,
			antallAktiveSok: 0,
			tilstand: autcompleteTilstand.INITIELL,
			sokPostponed: false,
			open: false,
		};
	}

	hentAdresseFraFaktum(properties: any): Adresse {
		const angittAdresse: Adresse = {
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
		};
		const gatenavnKey = "gatenavn";
		angittAdresse.adresse = properties[ gatenavnKey ];
		const keys = [
			"type", "husnummer", "husbokstav", "kommunenummer",
			"kommunenavn", "postnummer", "poststed", "geografiskTilknytning",
		];
		keys.map((key: string) => {
			angittAdresse[ key ] = properties[ key ];
		});
		return angittAdresse;
	}

	componentDidUpdate(prevProps: Props, prevState: StateProps) {
		if (this.state.cursorPosisjon > 0) {
			const input = document.getElementById("states-autocomplete");
			setCaretPosition(input, this.state.cursorPosisjon);
			this.setState({ cursorPosisjon: 0 });
		}
		if (prevState.tilstand !== this.state.tilstand && this.props.onOppdaterTilstand) {
			this.props.onOppdaterTilstand(this.state.tilstand);
		}
	}

	handleSelect(value: string, adresse: Adresse) {
		this.setState({
			value: this.formaterAdresseString(adresse),
			cursorPosisjon: this.settCursorPosisjon(adresse),
			valgtAdresse: adresse,
			adresser: [],
			tilstand: adresse.husnummer ?
				autcompleteTilstand.ADRESSE_OK :
				autcompleteTilstand.HUSNUMMER_IKKE_SATT
		});
		if (adresse) {
			this.props.onValgtVerdi(adresse);
		}
	}

	invalidateFetch(value: string) {
		this.props.onValgtVerdi(null);
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

	handleChange(event: any, value: string) {
		if (this.state.valgtAdresse) {
			const valgtAdresseToFormattedString = this.formaterAdresseString(this.state.valgtAdresse);
			const previousFirstPart: string = valgtAdresseToFormattedString.split(",")[0];
			const previousLastPart: string = valgtAdresseToFormattedString.split(",")[1];

			if (value.indexOf(previousFirstPart, 0) === -1 || value.indexOf(previousLastPart, 0) === -1) {
				console.warn("nå ble noe forrandret i input feltet som gjør tilstand ugyldig ");
				this.setState({valgtAdresse: null, tilstand: autcompleteTilstand.ADRESSE_UGYLDIG});
			} else {
				const addedPart = /(\d+)[a-zA-Z]*/g.exec(value);
				const valgtAdresse = this.state.valgtAdresse;
				valgtAdresse.husnummer = /\d+/g.exec(addedPart[0])[0];
				if (/[a-zA-Z]+/g.exec(addedPart[0])) {
					valgtAdresse.husbokstav = /[a-zA-Z]+/g.exec(addedPart[0])[0];
				}
				this.setState({valgtAdresse});
			}
		}
		console.warn(this.state.valgtAdresse);

		this.invalidateFetch(value);
		if (this.shouldFetch(value)) {
			if (this.state.antallAktiveSok === 0) {
				console.warn("debug1: fetching: '" + value + "'");
				this.executeFetch(value);
			} else {
				this.setState({sokPostponed: true});
			}
			this.setState({tilstand: this.state.adresser.length === 1
					? autcompleteTilstand.ADRESSE_OK
					: autcompleteTilstand.ADRESSE_IKKE_VALGT});
		} else {
			this.setState({adresser: [], tilstand: autcompleteTilstand.ADRESSE_UGYLDIG});
		}

		if (this.state.valgtAdresse) {
			this.props.onValgtVerdi(this.state.valgtAdresse);
		}
	}

	formaterAdresseString(adresse: Adresse) {
		let returverdi = adresse.adresse;
		const husbokstav: string = adresse.husbokstav != null ? adresse.husbokstav : "";
		try {
			if (adresse.postnummer != null && adresse.poststed != null) {
				if (adresse.husnummer !== "" && adresse.husnummer !== null) {
					returverdi += " " + adresse.husnummer + husbokstav + ", " + adresse.postnummer + " " + adresse.poststed;
				} else {
					if (adresse.postnummer !== null && adresse.poststed !== null) {
						returverdi += " , " + adresse.postnummer + " " + adresse.poststed;
					}
				}
			} else if (adresse.kommunenavn != null) {
				if (adresse.husnummer !== "" && adresse.husnummer !== null) {
					returverdi += " " + adresse.husnummer + husbokstav + ", " + adresse.kommunenavn;
				} else {
					returverdi += " , " + adresse.kommunenavn;
				}
			}
		} catch (error) {
			console.warn("error: " + error);
		}

		return returverdi;
	}

	settCursorPosisjon(adresse: Adresse) {
		const husbokstav = adresse.husbokstav ? adresse.husbokstav : "";

		return adresse.husnummer ?
			(adresse.adresse.length +
			adresse.husnummer.length +
			husbokstav.length + 1)
			: (adresse.adresse.length + 1);
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
							{this.state.tilstand === autcompleteTilstand.HUSNUMMER_IKKE_SATT && <DigisosIkon navn="advarselSirkel" />}
						</span>
					)}
				</span>
			);
	}

	handleInputBlur() {
		if (this.state.valgtAdresse) {
			this.setState({tilstand: autcompleteTilstand.ADRESSE_OK});
		}
	}

	getRenderItem(item: any, isHighlighted: any) {
		if (this.state.tilstand === autcompleteTilstand.ADRESSE_OK) {
			return (
				<div
					className={`item ${isHighlighted ? "item-highlighted" : ""}`}
					key={Math.random()}
				>{this.formaterAdresseString(item)}</div>
			);
		} else {
			return (
				<div
					className={`item ${isHighlighted ? "item-highlighted" : ""}`}
					key={Math.random()}
				>{this.formaterAdresseString(item)}</div>
			);
		}
	}

	open(): boolean {
		return this.state.adresser.length > 1;
	}

	render() {
		return (
			<div className="navAutcomplete">
				<Autocomplete
					value={this.state.value}
					inputProps={{
						id: "states-autocomplete",
						placeholder: "Gatenavn, kommune eller postnummer",
						onBlur: () => this.handleInputBlur()
					}}
					wrapperStyle={{position: "relative", display: "inline-block"}}
					items={ this.state.adresser.slice(0, 8) }
					getItemValue={(item: any) => item.adresse}
					onChange={(event: any, value: string) => this.handleChange(event, value)}
					onSelect={(value: any, item: any) => this.handleSelect(value, item)}
					renderMenu={(children: any) => (
						<span>
						{children.toString() === "" && (<span/>)}
						{children.toString() !== "" && (
							<div className="menu">
								{children}
							</div>)}
						</span>
					)}
					renderItem={(item: any, isHighlighted: any) => this.getRenderItem(item, isHighlighted)}
					open={this.open()}
				/>
				{ this.visIkon()}
				{
					this.state.tilstand === autcompleteTilstand.HUSNUMMER_IKKE_SATT &&
					(<p>"Hvis du har husnummer må du legge til det (før kommaet)"</p>)
				}
			</div>
		);
	}
}

export default NavAutocomplete;

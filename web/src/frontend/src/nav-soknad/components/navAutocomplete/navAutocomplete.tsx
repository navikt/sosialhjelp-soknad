import * as React from "react";
import { fetchToJson } from "../../utils/rest-utils";
import DigisosIkon from "../../../nav-soknad/components/digisosIkon/digisosIkon";
import NavFrontendSpinner from "nav-frontend-spinner";
import { Faktum } from "../../types";

const Autocomplete = require("react-autocomplete");

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
	previousFirstPart: null | string;
	previousLastPart: null | string;
}

interface Props {
	onValgtVerdi: (data: any) => void;
	onOppdaterTilstand?: (tilstand: autcompleteTilstand) => void;
	adresseFaktum: Faktum;
}

class NavAutocomplete extends React.Component<Props, StateProps> {

	constructor(props: Props) {
		super(props);

		this.state = {
			value: "",
			cursorPosisjon: 0,
			valgtAdresse: null,
			adresser: [],
			adresserWithId: [],
			valueIsValid: undefined,
			antallAktiveSok: 0,
			tilstand: autcompleteTilstand.INITIELL,
			sokPostponed: false,
			open: false,
			previousFirstPart: null,
			previousLastPart: null
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

		const temp = this.formaterAdresseString(adresse).split(",")[0];
		const temp2 = /[a-zA-Z]/.exec(temp[0]);

		this.setState({
			value: this.formaterAdresseString(adresse),
			cursorPosisjon: this.hvorSkalTekstfeltMarkorSettes(adresse),
			valgtAdresse: adresse,
			adresser: [],
			tilstand: adresse.husnummer ?
				autcompleteTilstand.ADRESSE_OK :
				autcompleteTilstand.HUSNUMMER_IKKE_SATT,
			previousFirstPart: temp2[0],
			previousLastPart: this.formaterAdresseString(adresse).split(",")[1],
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

			if (value.indexOf(this.state.previousFirstPart, 0) === -1 || value.indexOf(this.state.previousLastPart, 0) === -1) {
				this.setState({
					value,
					valgtAdresse: null,
					tilstand: autcompleteTilstand.ADRESSE_UGYLDIG,
					previousFirstPart: null,
					previousLastPart: null
				});
				this.props.onValgtVerdi(null);
			} else {
				const everythingBeforeComma = value.split(",")[0];
				const addedPart = /(\d+)[a-zA-Z]*/g.exec(everythingBeforeComma);
				const valgtAdresse = this.state.valgtAdresse;
				valgtAdresse.husnummer = addedPart ? /\d+/g.exec(addedPart[0])[0] : null;
				if (addedPart) {
					if (/[a-zA-Z]+/g.exec(addedPart[0])) {
						valgtAdresse.husbokstav = /[a-zA-Z]+/g.exec(addedPart[0])[0];
					} else {
						valgtAdresse.husbokstav = null;
					}

					this.setState({
						value,
						valgtAdresse,
						tilstand: valgtAdresse.husnummer ?
							autcompleteTilstand.ADRESSE_OK :
							autcompleteTilstand.ADRESSE_UGYLDIG
					});
					this.props.onValgtVerdi(valgtAdresse);
				} else {
					this.props.onValgtVerdi(null);
					this.handleChange(null, this.state.valgtAdresse.adresse);
				}
			}
		} else {
			this.invalidateFetch(value);
			if (this.shouldFetch(value)) {
				if (this.state.antallAktiveSok === 0) {
					this.executeFetch(value);
				} else {
					this.setState({sokPostponed: true});
				}
				this.setState({tilstand: autcompleteTilstand.ADRESSE_UGYLDIG});
			} else {
				this.setState({adresser: [], tilstand: autcompleteTilstand.ADRESSE_UGYLDIG});
			}
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

	hvorSkalTekstfeltMarkorSettes(adresse: Adresse) {
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

import * as React from "react";
import { fetchToJson } from "../../utils/rest-utils";
import DigisosIkon from "../../../nav-soknad/components/digisosIkon/digisosIkon";
import NavFrontendSpinner from "nav-frontend-spinner";
import { Faktum } from "../../types";
import { State } from "../../../digisos/redux/reducers";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { DispatchProps } from "../../redux/reduxTypes";
import { AdresseAutocompleteStatus, settStatus, settValgtAdresse, settVerdi } from "./adresseAutocompleteReducer";
import { finnFaktum } from "../../utils";

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

export interface Adresse {
	"adresse": null | string;
	"husnummer": null | string;
	"husbokstav": null | string;
	"kommunenummer": null | string;
	"kommunenavn": null | string;
	"postnummer": null | string;
	"poststed": null | string;
	"geografiskTilknytning": null | string;
	"gatekode": null | string;
	"bydel": null | string;
}

interface StateProps {
	adresser: Adresse[];
	valueIsValid: undefined | false | true;
	cursorPosisjon: number;
	antallAktiveSok: number;
	sokPostponed: boolean;
	open: boolean;
}

interface OwnProps {
	fakta: Faktum[];
	value: string;
	status: AdresseAutocompleteStatus;
	valgtAdresse: Adresse;
	onValgtVerdi: (data: any) => void;
	adresseFaktum: Faktum;
}

type Props = OwnProps & InjectedIntlProps & DispatchProps;

class AdresseAutocomplete extends React.Component<Props, StateProps> {

	constructor(props: Props) {
		super(props);
		this.state = {
			cursorPosisjon: 0,
			adresser: [],
			valueIsValid: undefined,
			antallAktiveSok: 0,
			sokPostponed: false,
			open: false,
		};

		const adresseFaktum = finnFaktum("kontakt.adresse.bruker", this.props.fakta);

		let value: any = null;

		const GATENAVN = "gatenavn";
		const HUSNUMMER = "husnummer";
		const HUSBOKSTAV = "husbokstav";
		const KOMMUNENUMMER = "kommunenummer";
		const KOMMUNENAVN = "kommunenavn";
		const POSTNUMMER = "postnummer";
		const POSTSTED = "poststed";
		const GEOGRAFISKTILKNYTNING = "geografisktilknytning";

		if (adresseFaktum && adresseFaktum.properties && adresseFaktum.properties[GATENAVN]) {

			const adresse: Adresse = {
				"adresse": adresseFaktum.properties[GATENAVN],
				"husnummer": adresseFaktum.properties[HUSNUMMER],
				"husbokstav": adresseFaktum.properties[HUSBOKSTAV],
				"kommunenummer": adresseFaktum.properties[KOMMUNENUMMER],
				"kommunenavn": adresseFaktum.properties[KOMMUNENAVN],
				"postnummer": adresseFaktum.properties[POSTNUMMER],
				"poststed": adresseFaktum.properties[POSTSTED],
				"geografiskTilknytning": adresseFaktum.properties[GEOGRAFISKTILKNYTNING],
				"gatekode": null,
				"bydel": null
			};

			value = this.formaterAdresseString(adresse);
			this.props.dispatch(settVerdi(value));
			this.props.dispatch(settValgtAdresse(adresse));
			// this.props.onValgtVerdi(adresse);
		}

	}

	componentDidUpdate(prevProps: Props, prevState: StateProps) {
		if (this.state.cursorPosisjon > 0) {
			const input = document.getElementById("states-autocomplete");
			setCaretPosition(input, this.state.cursorPosisjon);
			this.setState({cursorPosisjon: 0});
		}
	}

	handleSelect(value: string, adresse: Adresse) {
		const status = adresse.husnummer ?
			AdresseAutocompleteStatus.ADRESSE_OK :
			AdresseAutocompleteStatus.HUSNUMMER_IKKE_SATT;

		this.props.dispatch(settVerdi(this.formaterAdresseString(adresse)));
		this.props.dispatch(settStatus(status));
		this.props.dispatch(settValgtAdresse(adresse));

		if (!adresse.husnummer) {
			this.setState({
				cursorPosisjon: this.hvorSkalTekstfeltMarkorSettes(adresse),
				adresser: []
			});
		} else {
			this.setState({
				adresser: []
			});
		}

		if (adresse) {
			this.props.onValgtVerdi(adresse);
		}
	}

	invalidateFetch(value: string) {
		this.props.onValgtVerdi(null);
		this.props.dispatch(settVerdi(value));
		this.props.dispatch(settStatus(AdresseAutocompleteStatus.ADRESSE_UGYLDIG));
	}

	shouldFetch(value: string) {
		return value.length >= 3;
	}

	executePostponedSearch() {
		const newValue = this.props.value;
		this.invalidateFetch(newValue);
		if (this.shouldFetch(newValue)) {
			this.executeFetch(newValue);
		}
	}

	executeFetch(value: string) {
		const MS_VENT_NYE_TEGN = 250;
		this.setState({sokPostponed: false});
		this.setState({antallAktiveSok: this.state.antallAktiveSok + 1});
		setTimeout(() => {
			if (this.state.sokPostponed) {
				this.setState({antallAktiveSok: this.state.antallAktiveSok - 1});
				this.executePostponedSearch();
				return;
			}
			fetchToJson("informasjon/adressesok?sokestreng=" + value)
				.then((response: any) => {
					this.setState({adresser: this.removeDuplicatesAfterTransform(response, this.formaterAdresseString).slice(0, 8)});
					this.setState({antallAktiveSok: this.state.antallAktiveSok - 1});
					if (this.state.sokPostponed) {
						this.executePostponedSearch();
					}
				})
				.catch((error: any) => {
					console.error(error);
					this.props.dispatch(settStatus(AdresseAutocompleteStatus.ADRESSE_UGYLDIG));
					this.setState({
						antallAktiveSok: this.state.antallAktiveSok - 1
					});
				});
		}, MS_VENT_NYE_TEGN);
	}

	handleChange(event: any, value: string) {
		this.invalidateFetch(value);
		if (this.shouldFetch(value)) {
			if (this.state.antallAktiveSok === 0) {
				this.executeFetch(value);
			} else {
				this.setState({sokPostponed: true});
			}
		} else {
			this.setState({adresser: []});
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
							<NavFrontendSpinner type="XS"/>
						</span>
					)}
				{this.state.antallAktiveSok === 0 && (
					<span>
						<DigisosIkon navn="searchAddresse"/>
					</span>
				)}
				</span>
		);
	}

	handleInputBlur() {
		if (this.state.adresser.length === 1){
			const chosenItem = this.state.adresser[0];
			this.handleSelect(chosenItem.adresse, chosenItem);
		}
	}

	/*
	 * Hack for å få museklikk på trefflisten i autocomplete til å fanges opp i Edge nettleser.
	 */
	handleItemClickInEdgeBrowser(event: any) {
		const items: HTMLCollection = document.getElementsByClassName("item-highlighted");
		if (items && items[0]) {
			const INNER_TEXT = "innerText";
			const valgtTekststreng = items[0][INNER_TEXT];
			const valgtAdresse = this.state.adresser.find((adresse: Adresse) => {
				return this.formaterAdresseString(adresse) === valgtTekststreng;
			});
			if (valgtAdresse) {
				this.handleSelect(valgtTekststreng, valgtAdresse);
			}
			event.preventDefault();
		}
	}

	renderMenu(children: any): React.ReactNode {
		return (
			<div className="menu" onClick={(event: any) => this.handleItemClickInEdgeBrowser(event)}>
				{children}
			</div>
		);
	}

	getRenderItem(item: any, isHighlighted: any) {
		if (this.props.status === AdresseAutocompleteStatus.ADRESSE_OK) {
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

	/**
	 * Returns the original array with duplicate elements removed. The duplicate
	 * check is executed on the elements returned by the transform function.
	 * 
	 * @param myArray The array to be filtered.
	 * @param transform A transform executed on the element before checking
	 * 		if it is duplicate.
	 * @return An array without the duplicated elements.
	 */
	removeDuplicatesAfterTransform(myArray: any[], transform: (item: any) => any) {
		const propArray = myArray.map(elem => transform(elem));
    	return myArray.filter((obj, pos) => {
        	return propArray.indexOf(propArray[pos]) === pos;
    	});
	}

	render() {
		return (
			<div className="navAutcomplete">
				<Autocomplete
					value={this.props.value}
					inputProps={{
						id: "states-autocomplete",
						placeholder: "",
						onBlur: () => this.handleInputBlur()
					}}
					wrapperStyle={{position: "relative", display: "inline-block"}}
					items={this.state.adresser}
					getItemValue={(item: any) => this.formaterAdresseString(item)}
					onChange={(event: any, value: string) => this.handleChange(event, value)}
					onSelect={(value: any, item: any) => this.handleSelect(value, item)}
					renderMenu={(children: any) => this.renderMenu(children)}
					renderItem={(item: any, isHighlighted: any) => this.getRenderItem(item, isHighlighted)}
					autoHighlight={true}
					selectOnBlur={false}
				/>
				{this.visIkon()}
				{this.props.status === AdresseAutocompleteStatus.HUSNUMMER_IKKE_SATT &&
					(<p className="skjemaelement__feilmelding">
						<FormattedMessage id="autocomplete.husnummer"/>
					</p>)
				}
				{this.props.status === AdresseAutocompleteStatus.ADRESSE_UGYLDIG &&
					(<p className="skjemaelement__feilmelding">
						<FormattedMessage id="autocomplete.ugyldig"/>
					</p>)
				}
			</div>
		);
	}

}

export default connect((state: State, props: any) => {
	return {
		value: state.adresseAutocomplete.value,
		status: state.adresseAutocomplete.status,
		valgtAdresse: state.adresseAutocomplete.valgtAdresse
	};
})(injectIntl(AdresseAutocomplete));

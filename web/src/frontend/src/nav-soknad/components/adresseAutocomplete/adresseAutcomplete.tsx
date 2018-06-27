import * as React from "react";
import { fetchToJson } from "../../utils/rest-utils";
import DigisosIkon from "../../../nav-soknad/components/digisosIkon/digisosIkon";
import NavFrontendSpinner from "nav-frontend-spinner";
import { Faktum } from "../../types";
import { State } from "../../../digisos/redux/reducers";
import { InjectedIntlProps, injectIntl } from "react-intl";
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
	adresserWithId: any[];
	valueIsValid: undefined | false | true;
	cursorPosisjon: number;
	antallAktiveSok: number;
	sokPostponed: boolean;
	open: boolean;
	previousFirstPart: null | string;
	previousLastPart: null | string;
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
			adresserWithId: [],
			valueIsValid: undefined,
			antallAktiveSok: 0,
			sokPostponed: false,
			open: false,
			previousFirstPart: null,
			previousLastPart: null,
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

		const temp = this.formaterAdresseString(adresse).split(",")[0];
		const temp2 = /[a-zA-Z]/.exec(temp[0]);

		const status = adresse.husnummer ?
			AdresseAutocompleteStatus.ADRESSE_OK :
			AdresseAutocompleteStatus.HUSNUMMER_IKKE_SATT;

		this.props.dispatch(settVerdi(this.formaterAdresseString(adresse)));
		this.props.dispatch(settStatus(status));
		this.props.dispatch(settValgtAdresse(adresse));

		this.setState({
			cursorPosisjon: this.hvorSkalTekstfeltMarkorSettes(adresse),
			adresser: [],
			previousFirstPart: temp2[0],
			previousLastPart: this.formaterAdresseString(adresse).split(",")[1],
		});
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

	executeFetch(value: string) {
		this.setState({sokPostponed: false});
		this.setState({antallAktiveSok: this.state.antallAktiveSok + 1});
		fetchToJson("informasjon/adressesok?sokestreng=" + value)
			.then((response: any) => {
				this.setState({adresser: response});
				this.setState({antallAktiveSok: this.state.antallAktiveSok - 1});
				if (this.state.sokPostponed) {
					const newValue = this.props.value;
					this.invalidateFetch(newValue);
					if (this.shouldFetch(newValue)) {
						this.executeFetch(newValue);
					}
				}
			})
			.catch((error: any) => {
				console.error(error);
				this.props.dispatch(settStatus(AdresseAutocompleteStatus.ADRESSE_UGYLDIG));
				this.setState({
					antallAktiveSok: this.state.antallAktiveSok - 1
				});
			});
	}

	handleChange(event: any, value: string) {
		if (this.props.valgtAdresse) {

			if (value.indexOf(this.state.previousFirstPart, 0) === -1 || value.indexOf(this.state.previousLastPart, 0) === -1) {

				this.props.dispatch(settVerdi(value));
				this.props.dispatch(settStatus(AdresseAutocompleteStatus.ADRESSE_UGYLDIG));
				this.props.dispatch(settValgtAdresse(null));

				this.setState({
					previousFirstPart: null,
					previousLastPart: null
				});
				this.props.onValgtVerdi(null);
			} else {
				const everythingBeforeComma = value.split(",")[0];
				const addedPart = /(\d+)[a-zA-Z]*/g.exec(everythingBeforeComma);

				const valgtAdresse = this.props.valgtAdresse;

				valgtAdresse.husnummer = addedPart ? /\d+/g.exec(addedPart[0])[0] : null;
				if (addedPart) {
					if (/[a-zA-Z]+/g.exec(addedPart[0])) {
						valgtAdresse.husbokstav = /[a-zA-Z]+/g.exec(addedPart[0])[0];
					} else {
						valgtAdresse.husbokstav = null;
					}

					this.props.dispatch(settVerdi(value));
					const status = valgtAdresse.husnummer ?
						AdresseAutocompleteStatus.ADRESSE_OK :
						AdresseAutocompleteStatus.ADRESSE_UGYLDIG;
					this.props.dispatch(settStatus(status));
					this.props.dispatch(settValgtAdresse(valgtAdresse));
					this.props.onValgtVerdi(valgtAdresse);
				} else {
					this.props.onValgtVerdi(null);
					this.handleChange(null, this.props.valgtAdresse.adresse);
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
			} else {
				this.setState({adresser: []});
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
							<NavFrontendSpinner type="XS"/>
						</span>
					)}
				{this.state.antallAktiveSok === 0 && (
					<span>
						{this.props.status === AdresseAutocompleteStatus.INITIELL && <DigisosIkon navn="searchAddresse"/>}
						{this.props.status === AdresseAutocompleteStatus.ADRESSE_OK && <DigisosIkon navn="checkCircle"/>}
						{this.props.status === AdresseAutocompleteStatus.ADRESSE_UGYLDIG &&
						<DigisosIkon navn="advarselSirkel"/>}
						{this.props.status === AdresseAutocompleteStatus.HUSNUMMER_IKKE_SATT &&
						<DigisosIkon navn="advarselSirkel"/>}
						</span>
				)}
				</span>
		);
	}

	handleInputBlur() {
		if (this.props.valgtAdresse) {
			this.props.dispatch(settStatus(AdresseAutocompleteStatus.ADRESSE_OK));
		}
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

	open(): boolean {
		// return this.state.adresser.length > 1;
		return true;
	}

	render() {
		return (
			<div className="navAutcomplete">
				<Autocomplete
					value={this.props.value}
					inputProps={{
						id: "states-autocomplete",
						placeholder: "Gatenavn, kommune eller postnummer",
						onBlur: () => this.handleInputBlur()
					}}
					wrapperStyle={{position: "relative", display: "inline-block"}}
					items={this.state.adresser.slice(0, 8)}
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
				{this.visIkon()}
				{
					this.props.status === AdresseAutocompleteStatus.HUSNUMMER_IKKE_SATT &&
					(<p>"Hvis du har husnummer må du legge til det (før kommaet)"</p>)
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

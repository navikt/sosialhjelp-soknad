import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import SearchIllustration from "../../../../nav-soknad/components/adresseAutocomplete/adresseAutcomplete";
import NavFrontendSpinner from "nav-frontend-spinner";
import DigisosIkon from "../../../../nav-soknad/components/digisosIkon/digisosIkon";
import { fetchToJson } from "../../../../nav-soknad/utils/rest-utils";
import {
	AdresseTypeaheadStatus, ekstraherHusnummerHusbokstav,
	formaterAdresseString,
	removeDuplicatesAfterTransform,
	setCaretPosition
} from "./AdresseUtils";

const Autocomplete = require("react-autocomplete");

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
	"type": null | string;
}

interface OwnProps {
	onVelgAnnenAdresse: (adresse: Adresse) => void;
	valgtAdresse?: string;
}

interface StateProps {
	adresser: Adresse[];
	valueIsValid: undefined | false | true;
	cursorPosisjon: number;
	antallAktiveSok: number;
	sokPostponed: boolean;
	open: boolean;
	focus: boolean;
	value: string;
	status: string;
	valgtAdresse: Adresse;
}

type Props = OwnProps & InjectedIntlProps;

class AdresseTypeahead extends React.Component<Props, StateProps> {

	constructor(props: Props) {
		super(props);
		this.state = {
			cursorPosisjon: 0,
			adresser: [],
			valueIsValid: undefined,
			antallAktiveSok: 0,
			sokPostponed: false,
			open: false,
			focus: false,
			value: this.props.valgtAdresse ? this.props.valgtAdresse : "",
			status: AdresseTypeaheadStatus.INITIELL,
			valgtAdresse: null
		};
	}

	handleChange(event: any, value: string) {
		let shouldFetch: boolean = true; // this.shouldFetch(value);
		this.setState({value});
		const {valgtAdresse} = this.state;
		if (valgtAdresse) {
			shouldFetch = false;
			const { husnummer, husbokstav } = ekstraherHusnummerHusbokstav(value);
			if (husnummer !== "") {
				this.setState({status: AdresseTypeaheadStatus.ADRESSE_OK});
			} else {
				this.setState({status: AdresseTypeaheadStatus.HUSNUMMER_IKKE_SATT});
			}
			valgtAdresse.husnummer = husnummer;
			valgtAdresse.husbokstav = husbokstav;
			this.props.onVelgAnnenAdresse(valgtAdresse);
		}
		if(value.length < 4) {
			this.setState({
				status: AdresseTypeaheadStatus.INITIELL,
				valgtAdresse: null
			});
		}

		if (shouldFetch) {
			if (this.state.antallAktiveSok === 0) {
				this.executeFetch(value);
			} else {
				this.setState({sokPostponed: true});
			}
		} else {
			this.setState({adresser: []});
		}
	}

	componentDidUpdate(prevProps: Props, prevState: StateProps) {
		if (this.state.cursorPosisjon > 0) {
			const input = document.getElementById("states-autocomplete");
			setCaretPosition(input, this.state.cursorPosisjon);
			this.setState({cursorPosisjon: 0});
		}
	}

	handleSelect(verdi: string, adresse: Adresse) {
		const status = adresse.husnummer ?
			AdresseTypeaheadStatus.ADRESSE_OK :
			AdresseTypeaheadStatus.HUSNUMMER_IKKE_SATT;
		this.setState({
			status, value: verdi,
			valgtAdresse: adresse
		});
		this.props.onVelgAnnenAdresse(adresse);

		if (!adresse.husnummer) {
			this.setState({
				cursorPosisjon: this.beregnTekstfeltMarkorPosisjon(adresse),
				adresser: []
			});
		} else {
			this.setState({
				adresser: []
			});
		}
	}

	beregnTekstfeltMarkorPosisjon(adresse: Adresse) {
		const husbokstav = adresse.husbokstav ? adresse.husbokstav : "";
		return adresse.husnummer ?
			(adresse.adresse.length +
				adresse.husnummer.length +
				husbokstav.length + 1)
			: (adresse.adresse.length + 1);
	}

	invalidateFetch(value: string) {
		this.props.onVelgAnnenAdresse(null);
		this.setState({
			status: AdresseTypeaheadStatus.ADRESSE_UGYLDIG,
			value
		});
	}

	shouldFetch(value: string) {
		console.warn("debug: value.length: " + value.length);
		return value.length >= 3;
	}

	executePostponedSearch() {
		const newValue = this.state.value;
		this.invalidateFetch(newValue);
		if (this.shouldFetch(newValue)) {
			this.executeFetch(newValue);
		}
	}

	executeFetch(value: string) {
		const { antallAktiveSok, sokPostponed } = this.state;
		const MS_VENT_NYE_TEGN = 250;
		this.setState({
			sokPostponed: false,
			antallAktiveSok: antallAktiveSok + 1
		});
		setTimeout(() => {
			if (sokPostponed) {
				this.setState({antallAktiveSok: antallAktiveSok - 1});
				this.executePostponedSearch();
				return;
			}
			fetchToJson("informasjon/adressesok?sokestreng=" + encodeURI(value))
				.then((response: any) => {
					const adresser = removeDuplicatesAfterTransform(response, formaterAdresseString).slice(0, 8);
					this.setState({
						adresser,
						antallAktiveSok: ((antallAktiveSok - 1) > 0) ? (antallAktiveSok - 1) : (0)
					});
					if (sokPostponed) {
						this.executePostponedSearch();
					}
				})
				.catch((error: any) => {
					console.error(error);
					this.setState({
						antallAktiveSok: ((antallAktiveSok - 1) > 0) ? (antallAktiveSok - 1) : (0),
						status: AdresseTypeaheadStatus.ADRESSE_UGYLDIG
					});
				});
		}, MS_VENT_NYE_TEGN);
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

	//
    // Hack for å få museklikk på trefflisten i autocomplete til å fanges opp i Edge nettleser.
    //
	handleItemClickInEdgeBrowser(event: any) {
		const items: HTMLCollection = document.getElementsByClassName("item-highlighted");
		if (items && items[0]) {
			const INNER_TEXT = "innerText";
			const valgtTekststreng = items[0][INNER_TEXT];
			const valgtAdresse = this.state.adresser.find((adresse: Adresse) => {
				return formaterAdresseString(adresse) === valgtTekststreng;
			});
			if (valgtAdresse) {
				this.handleSelect(valgtTekststreng, valgtAdresse);
			}
			event.preventDefault();
		}
	}

	renderMenu(children: any): React.ReactNode {
		return (
			<div
				className="menu"
				role="listbox"
				id="owned_listbox"
				onClick={(event: any) => this.handleItemClickInEdgeBrowser(event)}
			>
				{children}
			</div>
		);
	}

	renderItem(item: any, isHighlighted: any) {
		const { status } = this.state;
		if (status === AdresseTypeaheadStatus.ADRESSE_OK) {
			return (
				<a
					className={`item ${isHighlighted ? "item-highlighted" : ""}`}
					key={Math.random()}
				>{formaterAdresseString(item)}</a>
			);
		} else {
			return (
				<a
					className={`item ${isHighlighted ? "item-highlighted" : ""}`}
					key={Math.random()}
				>{formaterAdresseString(item)}</a>
			);
		}
	}

	render() {
		const { value, status, adresser, focus } = this.state;
		return (
			<div className="navAutcomplete" id="digisosTypeahead">
				<Autocomplete
					value={value}
					inputProps={{
						id: "states-autocomplete",
						placeholder: "",
						"aria-owns": "owned_listbox"
					}}
					wrapperStyle={{position: "relative", display: "inline-block"}}
					items={adresser}
					getItemValue={(item: any) => formaterAdresseString(item)}
					onChange={(event: any, verdi: string) => this.handleChange(event, verdi)}
					onSelect={(verdi: any, item: any) => this.handleSelect(verdi, item)}
					renderMenu={(children: any) => this.renderMenu(children)}
					renderItem={(item: any, isHighlighted: any) => this.renderItem(item, isHighlighted)}
					autoHighlight={true}
					selectOnBlur={false}
				/>
				{this.visIkon()}
				{status === AdresseTypeaheadStatus.HUSNUMMER_IKKE_SATT && (
					<p className="skjemaelement__feilmelding">
						<FormattedMessage id="autocomplete.husnummer"/>
					</p>
				)}
				{focus && adresser.length === 0 && status === AdresseTypeaheadStatus.ADRESSE_UGYLDIG && (
					<div className="menu menu--feilmelding">
						<SearchIllustration />
						<br/>
						<FormattedMessage id="autocomplete.ugyldig"/>
					</div>
				)}
				{!focus && adresser.length === 0 && status === AdresseTypeaheadStatus.ADRESSE_UGYLDIG && (
					<p className="skjemaelement__feilmelding">
						<FormattedMessage id="autocomplete.ugyldig"/>
					</p>
				)}
			</div>
		);
	}
}

export default injectIntl(AdresseTypeahead);

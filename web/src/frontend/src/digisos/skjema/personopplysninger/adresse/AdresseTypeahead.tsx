import { InjectedIntlProps, injectIntl } from "react-intl";
import * as React from "react";
import {
	AdresseTypeaheadStatus,
	beregnTekstfeltMarkorPosisjon,
	formaterAdresseString,
	removeDuplicatesAfterTransform, setCaretPosition
} from "./AdresseUtils";
import { fetchToJson } from "../../../../nav-soknad/utils/rest-utils";
import { AdressesokTreff } from "./AdresseTypes";
import AdressesokIkon from "./AdressesokIkon";

const Autocomplete = require("react-autocomplete");

interface OwnProps {
	onVelgAnnenAdresse: (adresse: AdressesokTreff) => void;
	valgtAdresse?: string;
	onNullstill?: () => void;
}

type Props = OwnProps & InjectedIntlProps;

interface State {
	verdi: string;
	adresser: AdressesokTreff[];
	timeout: any;
	status: string;
	cursorPosisjon: number;
}

class AdresseTypeahead extends React.Component<Props, State> {

	mouseClick!: boolean;

	constructor(props: Props) {
		super(props);
		this.state = {
			verdi: this.props.valgtAdresse ? this.props.valgtAdresse : "",
			adresser: [],
			timeout: null,
			status: AdresseTypeaheadStatus.INITIELL,
			cursorPosisjon: 0,
		};
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		if (this.state.cursorPosisjon > 0) {
			const input = document.getElementById("states-autocomplete");
			setCaretPosition(input, this.state.cursorPosisjon);
			this.setState({cursorPosisjon: 0});
		}
	}

	onChange(event: any, verdi: string) {
		this.setState({verdi});
		// Vent til bruker er ferdig med å taste før det gjøres søk:
		clearTimeout(this.state.timeout);
		const timeout = setTimeout(() => {
			if (verdi.length !== 0) {
				this.searchOnServer(verdi);
			} else {
				if (this.props.onNullstill) {
					this.props.onNullstill();
				}
			}
		}, 500);
		this.setState({timeout});
	}

	searchOnServer(value: string) {
		this.setState({status: AdresseTypeaheadStatus.SOKER});
		fetchToJson("informasjon/adressesok?sokestreng=" + encodeURI(value))
			.then((response: any) => {
				const adresser = removeDuplicatesAfterTransform(response, formaterAdresseString).slice(0, 8);
				this.setState({
					adresser,
					status: AdresseTypeaheadStatus.ADRESSE_OK
				});
			})
			.catch((error: any) => {
				console.error(error);
				this.setState({status: AdresseTypeaheadStatus.ADRESSE_UGYLDIG});
			});
	}

	onSelect(verdi: string, adresse: AdressesokTreff, mouseClick: boolean) {
		if(mouseClick === true) {
			this.mouseClick = true;
		}
		if (this.mouseClick === true && mouseClick === false) {
			// console.warn("Warning: both click and select events detected.");
		} else {
			const status = adresse.husnummer ?
				AdresseTypeaheadStatus.ADRESSE_OK :
				AdresseTypeaheadStatus.HUSNUMMER_IKKE_SATT;
			this.setState({status,verdi});
			this.props.onVelgAnnenAdresse(adresse);
			if (!adresse.husnummer) {
				this.setState({
					cursorPosisjon: beregnTekstfeltMarkorPosisjon(adresse),
					adresser: []
				});
			} else {
				this.setState({
					adresser: []
				});
			}
		}
	}

	handleItemClickInMicrosoftEdgeBrowser(event: any) {
		const items: HTMLCollection = document.getElementsByClassName("item-highlighted");
		if (items && items[0]) {
			const INNER_TEXT = "innerText";
			let item_: any = items[0];
			const valgtTekststreng = item_[INNER_TEXT] ? item_[INNER_TEXT] : "";
			const valgtAdresse = this.state.adresser.find((adresse: AdressesokTreff) => {
				return formaterAdresseString(adresse) === valgtTekststreng;
			});
			if (valgtAdresse) {
				this.onSelect(valgtTekststreng, valgtAdresse, true);
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
				onClick={(event: any) => this.handleItemClickInMicrosoftEdgeBrowser(event)}
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
		const { verdi, adresser, status } = this.state;
		return (
			<div className="navAutcomplete" id="digisosTypeahead">
				<Autocomplete
					value={verdi}
					inputProps={{
						id: "states-autocomplete",
						placeholder: "",
						"aria-owns": "owned_listbox"
					}}
					wrapperStyle={{position: "relative", display: "inline-block"}}
					items={adresser}
					getItemValue={(item: any) => formaterAdresseString(item)}
					onChange={(event: any, value: string) => this.onChange(event, value)}
					onSelect={(value: any, item: any) => this.onSelect(value, item, false)}
					renderMenu={(children: any) => this.renderMenu(children)}
					renderItem={(item: any, isHighlighted: any) => this.renderItem(item, isHighlighted)}
					autoHighlight={true}
					selectOnBlur={false}
				/>
				<AdressesokIkon visSpinner={status === AdresseTypeaheadStatus.SOKER}/>
			</div>
		);
	}
}

export default injectIntl(AdresseTypeahead);

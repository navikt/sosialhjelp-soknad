import * as React from "react";
import KommuneTilNavEnhetMapper from "./KommuneTilNavEnhetMapper";
import alleKommuner from "./alleKommuner";
import DigisosIkon from "../../../../../nav-soknad/components/digisosIkon/digisosIkon";
import { lesKommunenrFraUrl } from "../../../../../nav-soknad/utils";
import { InjectedIntlProps, injectIntl } from "react-intl";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { getApiBaseUrl } from "../../../../../nav-soknad/utils/rest-utils";

const Autocomplete = require("react-autocomplete");

export interface Kommune {
	id: string;
	navn: string;
}

interface State {
	sokestreng: string;
	sokeresultat: Kommune[];
	alleKommuner: Kommune[];
	tilgjengeligeKommuner: string[];
	valgtKommuneNavn: string;
	valgtKommuneId: string|null;
	kommuneHarSoknad: boolean;
	visManglerKommuneFeilmelding: boolean;
}

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class KommunesokView extends React.Component<Props, State> {
	internalIsMounted: boolean = false;

	constructor(props: Props) {
		super(props);
		this.state = {
			sokestreng: "",
			sokeresultat: [],
			tilgjengeligeKommuner: [],
			valgtKommuneNavn: "",
			valgtKommuneId: null,
			kommuneHarSoknad: false,
			visManglerKommuneFeilmelding: false,
			alleKommuner
		};
	}

	componentDidMount(): void {
		this.internalIsMounted = true;
		this.lesInnTilgjengeligeKommuner();
		this.lesInnAlleKommuner();
		this.settValgtKommuneFraUrlParam();
	}

	componentWillUnmount() {
		this.internalIsMounted = false;
	}

	lesInnAlleKommuner() {
		// Gå via proxy i stedet for å kontakte statens kartverk direkte:
		// const url = "https://register.geonorge.no/api/subregister/sosi-kodelister/kartverket/kommunenummer-alle.json";
		const url = "https://www.nav.no/sosialhjelp/innsyn-api/api/veiviser/kommunenummer";
		fetch(url)
			.then((res: any) => res.json())
			.then((data: any) => {
				const kommuner = this.parseAlleKommunerData(data);
				if (this.internalIsMounted) {
					console.warn("Debug: Full liste over kommuner lest inn.");
					this.setState({ alleKommuner: kommuner });
					this.settValgtKommuneFraUrlParam();
				}
				// console.warn(JSON.stringify(kommuner, null, 4));
			})
			.catch((error: any) => {
				console.warn('Feil ved innlesning av full kommuneliste:', error);
			});
	}

	settValgtKommuneFraUrlParam() {
		const kommunenr = lesKommunenrFraUrl();
		const valgtKommune = this.state.alleKommuner.find((item: Kommune) => {
			const itemKommunenr = parseInt(item.id.toString(),10).toString();
			return itemKommunenr === parseInt(kommunenr, 10).toString();
		});
		console.warn("valgtKommune: " + JSON.stringify(valgtKommune, null, 4));
		if (valgtKommune) {
			this.handleSelect(null, valgtKommune);
		}
	}

	parseAlleKommunerData(data: any) {
		const kommuner: any[] = [];
		const CONTAINED_ITEMS = "containeditems";
		const DESCRIPTION = "description";
		const LABEL = "label";
		const STATUS = "status";
		const responseData = data[ CONTAINED_ITEMS ].filter((item: any) => item[ STATUS ] === "Gyldig");
		responseData.map((item: any) => {
			kommuner.push({
				id: item[ LABEL ],
				navn: item[ DESCRIPTION ]
			});
		});
		kommuner.sort((a: Kommune, b: Kommune) => {
			if (a.navn > b.navn) {
				return 1;
			} else if (a.navn < b.navn) {
				return -1;
			} else {
				return 0;
			}
		});
		return kommuner;
	}

	lesInnTilgjengeligeKommuner() {
		// Hardkodet liste med kommuner som failerover, i tilfelle backend ikke svarer:
		const tilgjengeligeKommuner: string[] = KommuneTilNavEnhetMapper;

		if (this.internalIsMounted) {
			this.setState({tilgjengeligeKommuner});
		}

		// Skal gå mot https://tjenester.nav.no/soknadsosialhjelp-server/informasjon/tilgjengelige_kommuner i prod
		fetch(getApiBaseUrl() + "informasjon/tilgjengelige_kommuner")
			.then((res: any) => res.json())
			.then((data: any) => {
				if (this.internalIsMounted) {
					console.warn("Debug: påkoblede kommuner lest inn");
					this.setState({ tilgjengeligeKommuner: data});
				} else {
					console.warn("Advarsel. Kommunesok ikke montert feil.");
				}
			})
			.catch((error: any) => {
				console.warn('Feil ved innlesing av påkoblede kommuner:', error);
			});
	}

	handleChange(event: any, verdi: string) {
		const sokeresultat = alleKommuner.filter((item: Kommune) => {
			return item.navn.match(new RegExp("^" + verdi + ".*", "i"));
		}).slice(0, 5);
		this.setState({sokestreng: verdi, sokeresultat});
	}

	handleSelect(verdi: any, item: Kommune) {
		console.warn("kommune valgt: " + item.id);
		// PUT /soknadsosialhjelp-server/soknader/110000001/personalia/navEnheter {orgnr ...

		let kommuneHarSoknad: boolean = false;
		if (this.state.tilgjengeligeKommuner.find((nummer: string) => nummer === item.id) ) {
			kommuneHarSoknad = true;
		}
		this.setState({
			sokestreng: item.navn,
			valgtKommuneId: item.id,
			valgtKommuneNavn: item.navn,
			kommuneHarSoknad,
			visManglerKommuneFeilmelding: false
		});


		// Gjør kall mot rest endepunkt som returnerer alle søknadsmottakere i en gitt kommune
		console.warn("Hente liste fra nytt REST endepunkt");
		fetch(getApiBaseUrl() + "informasjon/kommunesok?kommunenr=" + item.id)
			.then((res: any) => res.json())
			.then((data: any) => {
				if (this.internalIsMounted) {
					console.warn("===> Debug: tilgjengelige navEnheter i kommune lest inn");
					console.warn(JSON.stringify(data, null, 4));
					// this.setState({ tilgjengeligeKommuner: data});
				} else {
					console.warn("Advarsel. Kommunesok ikke montert feil.");
				}
			})
			.catch((error: any) => {
				console.warn('Feil ved innlesing av påkoblede kommuner:', error);
			});
	}

	visIkon() {
		return (
			<span className="valideringsStatus">
				<DigisosIkon navn="searchAddresse"/>
			</span>
		);
	}

	// onVelgSoknadsmottaker(navEnhet: any) {
	// 	console.warn("onVelgSoknadsmottaker: " + JSON.stringify(navEnhet, null, 4));
	// }

	renderMenu(children: any): React.ReactNode {
		return (
			<div
				className="menu"
				role="listbox"
				id="owned_listbox"
			>
				{children}
			</div>
		);
	}

	renderItem(item: Kommune, isHighlighted: any) {
		return (
			<a
				className={`item ${isHighlighted ? "item-highlighted" : ""}`}
				key={item.id}
			>{item.navn}</a>
		);
	}

	render() {
		const autocompleteClassName = this.state.visManglerKommuneFeilmelding ? "navAutcomplete__feil" : "";
		const placeholderTekst = this.props.intl.formatMessage({ id: "matrikkel.sok.placeholder"});
		const manglerKommuneFeilmelding = this.props.intl.formatMessage({ id: "matrikkel.mangler.kommune"});

		// const navEnheter = [
		// 	{
		// 		"orgnr": "910230158",
		// 		"enhetsnavn": "NAV Bergenhus",
		// 		"kommunenavn": "Bergen",
		// 		"valgt": false
		// 	},
		// 	{
		// 		"orgnr": "910230964",
		// 		"enhetsnavn": "NAV Årstad",
		// 		"kommunenavn": "Bergen",
		// 		"valgt": false
		// 	}
		// ];

		return (
			<div>
				<div className={"navAutcomplete " + autocompleteClassName} id="digisosTypeahead">
					<Autocomplete
						value={this.state.sokestreng}
						inputProps={{
							id: "kommuner-autocomplete",
							placeholder: placeholderTekst
						}}
						wrapperStyle={{position: "relative", display: "inline-block"}}
						items={this.state.sokeresultat}
						getItemValue={(item: Kommune) => item.navn}
						onChange={(event: any, verdi: string) => this.handleChange(event, verdi)}
						onSelect={(verdi: any, item: any) => this.handleSelect(verdi, item)}
						renderMenu={(children: any) => this.renderMenu(children)}
						renderItem={(item: Kommune, isHighlighted: any) => this.renderItem(item, isHighlighted)}
						autoHighlight={true}
						selectOnBlur={false}
					/>
					{this.visIkon()}
				</div>
				{this.state.visManglerKommuneFeilmelding && (
					<p className="navAutcomplete__feilmelding">
						{manglerKommuneFeilmelding}
					</p>
				)}
				{/*{this.state.valgtKommuneId && (*/}
				{/*	<div>*/}
				{/*		<b>Debug:</b>*/}
				{/*		<pre>Kommune: {this.state.valgtKommuneNavn} / {this.state.valgtKommuneId}</pre>*/}
				{/*		<pre>Søknad tilgjengelig: {JSON.stringify(this.state.kommuneHarSoknad, null, 4)}</pre>*/}
				{/*		{navEnheter.length > 1 && (*/}
				{/*			<SoknadsmottakerVelger*/}
				{/*				label={getIntlTextOrKey(this.props.intl,*/}
				{/*					"kontakt.system.oppholdsadresse.velgKontor")}*/}
				{/*				ikkeVisPanel={true}*/}
				{/*				navEnheter={navEnheter}*/}
				{/*				visible={true}*/}
				{/*				onVelgSoknadsmottaker={(navEnhet: NavEnhet) => this.onVelgSoknadsmottaker(navEnhet)}*/}
				{/*			/>*/}
				{/*		)}*/}

				{/*	</div>*/}
				{/*)}*/}
			</div>
		);
	}

}

export default connectSoknadsdataContainer(injectIntl(KommunesokView));

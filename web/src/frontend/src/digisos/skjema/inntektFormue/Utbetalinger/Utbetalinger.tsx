import * as React from 'react';
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { InjectedIntlProps, injectIntl } from "react-intl";
import {SoknadsSti} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {Utbetalinger} from "./utbetalingerTypes";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import {Bostotte} from "../bostotte/bostotteTypes";


const FAKTUM_UTBETALINGER = "inntekt.inntekter";

type Props = SoknadsdataContainerProps & InjectedIntlProps;


export class UtbetalingerView extends React.Component<Props, {}>{

	constructor(props: Props){
		super(props);
	}

	componentDidMount(): void {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.UTBETALINGER);
	}

	handleClickJaNeiSpsm(verdi: boolean){
		const {brukerBehandlingId, soknadsdata} = this.props;
		const utbetalinger: Bostotte = soknadsdata.inntekt.utbetalinger;
		utbetalinger.bekreftelse = verdi;
		this.props.oppdaterSoknadsdataSti(SoknadsSti.UTBETALINGER, utbetalinger);
		this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.UTBETALINGER, utbetalinger);
	}

	handleClickRadio(idToToggle: string){
		const IDTOTOGGLE: string = idToToggle;
		const {brukerBehandlingId, soknadsdata} = this.props;
		const utbetalinger: Bostotte = soknadsdata.inntekt.utbetalinger;
		utbetalinger[IDTOTOGGLE] = !utbetalinger[IDTOTOGGLE];
		this.props.oppdaterSoknadsdataSti(SoknadsSti.UTBETALINGER, utbetalinger);
		this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.UTBETALINGER, utbetalinger);
	}

	// "bekreftelse" : null | boolean;
	// "utbytte" : boolean;
	// "salg" : boolean;
	// "forsikring" : boolean;
	// "annet" : boolean;
	// "beskrivelseAvAnnet" : string;

	render(){

		const { soknadsdata } = this.props;

		const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
		console.warn(utbetalinger);

		return(
			<JaNeiSporsmal
				tekster={getFaktumSporsmalTekst(this.props.intl, FAKTUM_UTBETALINGER)}
				faktumKey={"inntekt.inntekter"}
				verdi={utbetalinger.bekreftelse}
				onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi)}
				legendTittelStyle={LegendTittleStyle.FET_NORMAL}
			>
				<Sporsmal
					tekster={getFaktumSporsmalTekst(this.props.intl, "inntekt.inntekter.true.type")}
				>
					<RadioEnhanced
						getName={() => "utbytte"}
						id="utbytte"
						faktumKey={"inntekt.inntekter.true.type"}
						value="utbytte"
						checked={ utbetalinger.utbytte === true}
						onChange={() => this.handleClickRadio("utbytte")}
					/>
					<RadioEnhanced
						getName={() => "salg"}
						id="salg"
						faktumKey={"inntekt.inntekter.true.type"}
						value="salg"
						checked={ utbetalinger.salg === true}
						onChange={() => this.handleClickRadio("salg")}
					/>
					<RadioEnhanced
						getName={() => "forsikringsutbetalinger"}
						id="forsikringsutbetalinger"
						faktumKey={"inntekt.inntekter.true.type"}
						value="forsikringsutbetalinger"
						checked={ utbetalinger.forsikring === true}
						onChange={() => this.handleClickRadio("forsikring")}
					/>
					<RadioEnhanced
						getName={() => "annet"}
						id="annet"
						faktumKey={"inntekt.inntekter.true.type"}
						value="annet"
						checked={ utbetalinger.annet === true}
						onChange={() => this.handleClickRadio("annet")}
					/>
				</Sporsmal>
			</JaNeiSporsmal>
		)
	}
}



export default connectSoknadsdataContainer(injectIntl(UtbetalingerView));

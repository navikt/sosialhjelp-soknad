import * as React from 'react';
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import {FormattedHTMLMessage, InjectedIntlProps, injectIntl} from "react-intl";
import {SoknadsSti} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {Utbetalinger} from "./utbetalingerTypes";
import CheckboxEnhanced from "../../../../nav-soknad/faktum/CheckboxEnhanced";

// const MAX_CHARS = 500;
const UTBETALINGER = "inntekt.inntekter";

type Props = SoknadsdataContainerProps & InjectedIntlProps;


export class UtbetalingerView extends React.Component<Props, {}>{

	constructor(props: Props){
		super(props);
	}

	componentDidMount(): void {
		console.warn("Component did mount");
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.UTBETALINGER);
	}

	handleClickJaNeiSpsm(verdi: boolean){
		console.warn("handle klikk ja nei");
		const {brukerBehandlingId, soknadsdata} = this.props;
		const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
		utbetalinger.bekreftelse = verdi;
		if (!verdi){
			utbetalinger.salg = false;
			utbetalinger.utbytte = false;
			utbetalinger.forsikring = false;
			utbetalinger.annet = false;
			utbetalinger.beskrivelseAvAnnet = "";
		}
		this.props.oppdaterSoknadsdataSti(SoknadsSti.UTBETALINGER, utbetalinger);
		this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.UTBETALINGER, utbetalinger);
	}

	handleClickRadio(idToToggle: string){
		console.warn("handle click radio: " + idToToggle);
		const {brukerBehandlingId, soknadsdata} = this.props;
		const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
		utbetalinger[idToToggle] = !utbetalinger[idToToggle];
		this.props.oppdaterSoknadsdataSti(SoknadsSti.UTBETALINGER, utbetalinger);
		this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.UTBETALINGER, utbetalinger);
	}

    onChangeAnnet(value: string){
        console.warn("onChange input value : " + value);
        const { soknadsdata} = this.props;
        const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
        utbetalinger.beskrivelseAvAnnet = value;
        this.props.oppdaterSoknadsdataSti(SoknadsSti.UTBETALINGER, utbetalinger);
    }

	onBlurAnnet(){
        const {brukerBehandlingId, soknadsdata} = this.props;
        const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
        console.warn("onBlur save beskrivelseAvAnnet:" + utbetalinger.beskrivelseAvAnnet);
        this.props.oppdaterSoknadsdataSti(SoknadsSti.UTBETALINGER, utbetalinger);
        this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.UTBETALINGER, utbetalinger);
	}


	render(){

		const { soknadsdata } = this.props;

		const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;

		return(
			<JaNeiSporsmal
				tekster={getFaktumSporsmalTekst(this.props.intl, UTBETALINGER)}
				faktumKey={UTBETALINGER}
				verdi={utbetalinger.bekreftelse}
				onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi)}
				legendTittelStyle={LegendTittleStyle.FET_NORMAL}
			>
				<Sporsmal
					tekster={getFaktumSporsmalTekst(this.props.intl, UTBETALINGER + ".true.type")}
				>
                    <CheckboxEnhanced
                        id = {"utbetalinger_utbytte_checkbox"}
						name = {"utbytte"}
						checked = {utbetalinger && utbetalinger.utbytte ? utbetalinger.utbytte : false}
						disabled = {false}
						label = {<FormattedHTMLMessage id={UTBETALINGER + ".true.type.utbytte"}/>}
						visPanel = {true}
						onClick = {() => this.handleClickRadio("utbytte")}
                    />
                    {/*<CheckboxEnhanced*/}
                        {/*id = {"utbetalinger_salg_checkbox"}*/}
                        {/*name = {"salg"}*/}
                        {/*checked = {utbetalinger && utbetalinger.salg ? utbetalinger.salg : false}*/}
                        {/*disabled = {false}*/}
                        {/*label = {<FormattedHTMLMessage id={UTBETALINGER + ".true.type.salg"}/>}*/}
                        {/*visPanel = {true}*/}
                        {/*onClick = {() => this.handleClickRadio("salg")}*/}
                    {/*/>*/}
                    {/*<CheckboxEnhanced*/}
                        {/*id = {"utbetalinger_forsikring_checkbox"}*/}
                        {/*name = {"forsikring"}*/}
                        {/*checked = {utbetalinger && utbetalinger.forsikring ? utbetalinger.forsikring : false}*/}
                        {/*disabled = {false}*/}
                        {/*label = {<FormattedHTMLMessage id={UTBETALINGER + ".true.type.forsikring"}/>}*/}
                        {/*visPanel = {true}*/}
                        {/*onClick = {() => this.handleClickRadio("forsikring")}*/}
                    {/*/>*/}
                    {/*<CheckboxEnhanced*/}
                        {/*id = {"utbetalinger_annet_checkbox"}*/}
                        {/*name = {"annet"}*/}
                        {/*checked = {utbetalinger && utbetalinger.annet ? utbetalinger.annet : false}*/}
                        {/*disabled = {false}*/}
                        {/*label = {<FormattedHTMLMessage id={UTBETALINGER + ".true.type.annet"}/>}*/}
                        {/*visPanel = {true}*/}
                        {/*onClick = {() => this.handleClickRadio("annet")}*/}
                    {/*/>*/}
                    {/*<NivaTreSkjema*/}
                        {/*visible={utbetalinger.bekreftelse && utbetalinger.annet}*/}
                        {/*size="small"*/}
                    {/*>*/}
						{/*<TextareaEnhanced*/}
							{/*id="utbetalinger_annet_textarea"*/}
							{/*placeholder=""*/}
							{/*onChange={(evt: any) => this.onChangeAnnet(evt.target.value)}*/}
							{/*onBlur={() => this.onBlurAnnet()}*/}
							{/*faktumKey=""*/}
							{/*labelId={ UTBETALINGER + ".true.type.annet.true.beskrivelse.label"}*/}
							{/*maxLength={MAX_CHARS}*/}
							{/*value={utbetalinger.beskrivelseAvAnnet}*/}
						{/*/>*/}
					{/*</NivaTreSkjema>*/}
				</Sporsmal>
			</JaNeiSporsmal>
		)
	}
}



export default connectSoknadsdataContainer(injectIntl(UtbetalingerView));

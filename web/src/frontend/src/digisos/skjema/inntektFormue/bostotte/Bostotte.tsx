import * as React from "react";
import { LegendTittleStyle } from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { getFaktumSporsmalTekst } from "../../../../nav-soknad/utils";
import {FormattedHTMLMessage, InjectedIntlProps, injectIntl} from "react-intl";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import {Bostotte} from "./bostotteTypes";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../../nav-soknad/components/svg/DigisosFarger";

const FAKTUM_BOSTOTTE = "inntekt.bostotte";

type Props = SoknadsdataContainerProps  & InjectedIntlProps;

class BostotteView extends React.Component<Props, {}> {

	componentDidMount(): void {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BOSTOTTE);
	}

	handleClickJaNeiSpsm(verdi: boolean) {
		const {brukerBehandlingId, soknadsdata} = this.props;
		const bostotte: Bostotte = soknadsdata.inntekt.bostotte;
		bostotte.bekreftelse = verdi;
		this.props.oppdaterSoknadsdataSti(SoknadsSti.BOSTOTTE, bostotte);
		this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.BOSTOTTE, bostotte);

	}

	render() {
		const {soknadsdata} = this.props;
		const bostotte : Bostotte = soknadsdata.inntekt.bostotte;
		return (
			<div className="skjema-sporsmal">
				<JaNeiSporsmal
					tekster={getFaktumSporsmalTekst(this.props.intl, FAKTUM_BOSTOTTE)}
					faktumKey={FAKTUM_BOSTOTTE}
					verdi={bostotte.bekreftelse}
					onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi)}
					legendTittelStyle={LegendTittleStyle.FET_NORMAL}
				/>
				<Informasjonspanel
					synlig={bostotte.bekreftelse === false}
					ikon={InformasjonspanelIkon.ELLA}
					farge={DigisosFarge.VIKTIG}
				>
					<FormattedHTMLMessage id="informasjon.husbanken.bostotte"/>
				</Informasjonspanel>
			</div>
		);
	}
}

export default connectSoknadsdataContainer(injectIntl(BostotteView));

import * as React from "react";
import Sporsmal, { LegendTittleStyle } from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst, IntlProps} from "../../../../nav-soknad/utils";
import { injectIntl } from "react-intl";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";

const FAKTUM_STUDIER = "dinsituasjon.studerer";
const FAKTUM_STUDERER = "dinsituasjon.studerer.true.grad";

type Props = SoknadsdataContainerProps & IntlProps;

class UtdanningView extends React.Component<Props, {}> {

	componentDidMount(): void {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.UTDANNING);
	}

	handleClickJaNeiSpsm(verdi: boolean) {
		const {brukerBehandlingId, soknadsdata} = this.props;
		const utdanning = soknadsdata.utdanning;
		utdanning.erStudent = verdi;
		this.props.oppdaterSoknadsdataSti(SoknadsSti.UTDANNING, utdanning);
		this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.UTDANNING, utdanning);
	}

	handleClickHeltidDeltid(verdi: boolean) {
		const {brukerBehandlingId, soknadsdata} = this.props;
		const utdanning = soknadsdata.utdanning;
		utdanning.studengradErHeltid = verdi;
		this.props.oppdaterSoknadsdataSti(SoknadsSti.UTDANNING, utdanning);
		this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.UTDANNING, utdanning);
	}

	render() {
		const {soknadsdata} = this.props;
		const utdanning = soknadsdata.utdanning;
		const {erStudent, studengradErHeltid} = utdanning;
		return (
			<div className="skjema-sporsmal">
				<JaNeiSporsmal
					tekster={getFaktumSporsmalTekst(this.props.intl, FAKTUM_STUDIER)}
					faktumKey={FAKTUM_STUDIER}
					verdi={erStudent}
					onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi)}
					legendTittelStyle={LegendTittleStyle.FET_NORMAL}
				>
					<Sporsmal
						tekster={getFaktumSporsmalTekst(this.props.intl, FAKTUM_STUDERER)}
					>
						<RadioEnhanced
							getName={() => "studerer_radio_heltid"}
							id="studerer_radio_heltid"
							faktumKey={FAKTUM_STUDERER}
							value="heltid"
							checked={studengradErHeltid !== null && studengradErHeltid === true}
							onChange={() => this.handleClickHeltidDeltid(true)}
						/>
						<RadioEnhanced
							getName={() => "studerer_radio_deltid"}
							id="studerer_radio_deltid"
							faktumKey={FAKTUM_STUDERER}
							value="deltid"
							checked={studengradErHeltid !== null && studengradErHeltid === false}
							onChange={() => this.handleClickHeltidDeltid(false)}
						/>
					</Sporsmal>
				</JaNeiSporsmal>
			</div>
		);
	}
}

export default connectSoknadsdataContainer(injectIntl(UtdanningView));

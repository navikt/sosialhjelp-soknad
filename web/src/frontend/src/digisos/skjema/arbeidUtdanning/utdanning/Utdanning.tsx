import * as React from "react";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { getFaktumSporsmalTekst } from "../../../../nav-soknad/utils";
import { InjectedIntlProps, injectIntl } from "react-intl";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import { State } from "../../../redux/reducers";
import { Utdanning as UtdanningType} from "./utdanningActions";
import { Valideringsfeil } from "../../../../nav-soknad/validering/types";
import { setFaktumValideringsfeil } from "../../../../nav-soknad/redux/valideringActions";
import { oppdaterSoknadsdataAction } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { connect } from "react-redux";
import { hentUtdanningAction, oppdaterUtdanningAction } from "./utdanningActions";

const FAKTUM_STUDIER = "dinsituasjon.studerer";
const FAKTUM_STUDERER = "dinsituasjon.studerer.true.grad";

interface OwnProps {
	brukerBehandlingId?: string;
	utdanning?: null | UtdanningType;
	hentUtdanning?: (brukerBehandlingId: string) => void;
	oppdaterUtdanning?: (brukerBehandlingId: string, Utdanning: UtdanningType) => void;
	nullstillValideringsfeil?: (faktumKey: string) => void;
	setFaktumValideringsfeil?: (valideringsfeil: Valideringsfeil, faktumKey: string) => void;
	oppdaterSoknadsdata?: (verdi: any) => void;
	feil?: any;
	
}

type Props = OwnProps & InjectedIntlProps;

class UtdanningView extends React.Component<Props, {}> {

	componentDidMount(): void {
		this.props.hentUtdanning(this.props.brukerBehandlingId);
	}

	handleClickJaNeiSpsm(verdi: boolean) {
		const utdanning: UtdanningType = {
			erStudent: verdi,
			studengradErHeltid: this.props.utdanning.studengradErHeltid
			// studengradErHeltid: verdi === false ? null : this.props.utdanning.studengradErHeltid // Nullstille?
		};
		this.props.oppdaterUtdanning(this.props.brukerBehandlingId, utdanning);
	}

	handleClickHeltidDeltid(verdi: boolean) {
		const utdanning: UtdanningType = {
			erStudent: this.props.utdanning.erStudent,
			studengradErHeltid: verdi
		};
		this.props.oppdaterUtdanning(this.props.brukerBehandlingId, utdanning);
	}

	render() {
		const {erStudent, studengradErHeltid} = this.props.utdanning;
		return (
			<div style={{ border: "3px dotted red", display: "block" }}>
				<JaNeiSporsmal
					tekster={getFaktumSporsmalTekst(this.props.intl, FAKTUM_STUDIER)}
					faktumKey={FAKTUM_STUDIER}
					verdi={erStudent}
					onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi)}
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

const mapStateToProps = (state: State) => ({
	brukerBehandlingId: state.soknad.data.brukerBehandlingId,
	feil: state.validering.feil,
	utdanning: state.soknadsdata.utdanning
});

const mapDispatchToProps = (dispatch: any) => ({
	hentUtdanning: (brukerBehandlingId: string) => {
		dispatch(hentUtdanningAction(brukerBehandlingId))
	},
	setFaktumValideringsfeil: (valideringsfeil: Valideringsfeil, faktumKey: string) => {
		dispatch(setFaktumValideringsfeil(valideringsfeil, faktumKey))
	},
	oppdaterUtdanning: (brukerBehandlingId: string, Utdanning: UtdanningType) => {
		dispatch(oppdaterUtdanningAction(brukerBehandlingId, Utdanning));
	},
	oppdaterSoknadsdata: (data: any) => {
		dispatch(oppdaterSoknadsdataAction(data))
	},
	nullstillValideringsfeil: (faktumKey: string) => {
		dispatch(setFaktumValideringsfeil(null, faktumKey));
	}
});

export {UtdanningView};

export default connect<{}, {}, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(injectIntl(UtdanningView));

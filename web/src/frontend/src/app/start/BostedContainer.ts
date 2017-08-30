import { connect } from "react-redux";
import { FaktumState } from "../../skjema/reducer";
import { SoknadState } from "../../redux/soknad/types";
import { bindActionCreators } from "redux";
import { opprettSoknad } from "../../redux/soknad/actions";
import Bosted, { DispatchToProps } from "./Bosted";

const mapDispatchToProps = (dispatch: any): DispatchToProps => ({
	action: bindActionCreators({opprettSoknad}, dispatch)
});

const mapStateToProps = (state: { faktumStore: FaktumState, soknad: SoknadState }): {} => ({
	fakta: state.faktumStore.fakta,
	status: state.soknad.status,
	brukerBehandlingId: state.soknad.brukerBehandlingId
});

export default connect<{}, DispatchToProps, {}>(mapStateToProps, mapDispatchToProps)(Bosted);

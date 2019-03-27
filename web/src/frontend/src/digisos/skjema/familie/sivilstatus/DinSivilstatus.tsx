import * as React from "react";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { Sivilstatus, Status } from "./FamilieTypes";
import SivilstatusComponent from "./SivilstatusComponent";
import EktefelleDetaljer from "./EktefelleDetaljer";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class DinSivilstatusView extends React.Component<Props, {}> {

	componentDidMount() {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.SIVILSTATUS);
	}

	render() {
		const { soknadsdata } = this.props;
		const sivilstatus: Sivilstatus = soknadsdata.familie.sivilstatus;
		if (sivilstatus && sivilstatus.sivilstatus === Status.GIFT && sivilstatus.kildeErSystem === true) {
			return <EktefelleDetaljer/>
		} else {
			return (<SivilstatusComponent/>);
		}
	}
}

export default connectSoknadsdataContainer(injectIntl(DinSivilstatusView));

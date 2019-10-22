import * as React from "react";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import { SoknadsSti } from "../../../redux/soknadsdata/soknadsdataReducer";
import { Sivilstatus, Status } from "./FamilieTypes";
import SivilstatusComponent from "./SivilstatusComponent";
import EktefelleDetaljer from "./EktefelleDetaljer";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";

type Props = SoknadsdataContainerProps;

interface State {
	oppstartsModus: boolean;
}

class DinSivilstatusView extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			oppstartsModus: true
		};
	}

	componentDidMount() {
		const {behandlingsId} = this.props;
		if (behandlingsId){
			this.props.hentSoknadsdata(behandlingsId, SoknadsSti.SIVILSTATUS);
		}
	}

	componentWillUpdate() {
		const { soknadsdata } = this.props;
		const restStatus = soknadsdata.restStatus.familie.sivilstatus;
		if (this.state.oppstartsModus && restStatus === REST_STATUS.OK) {
			this.setState({ oppstartsModus: false });
		}
	}

	render() {
		const { soknadsdata } = this.props;
		const sivilstatus: Sivilstatus = soknadsdata.familie.sivilstatus;
		let oppstartsModus = this.state.oppstartsModus;
		const restStatus = soknadsdata.restStatus.familie.sivilstatus;
		if (oppstartsModus === true && restStatus === REST_STATUS.OK) {
			oppstartsModus = false;
		}
		if (oppstartsModus) {
			return (
				<div className="skjema-sporsmal">
					<Sporsmal sprakNokkel="familie.sivilstatus">
						<TextPlaceholder lines={6}/>
					</Sporsmal>
				</div>
			)
		}
		if (sivilstatus && sivilstatus.sivilstatus === Status.GIFT && sivilstatus.kildeErSystem === true) {
			return <EktefelleDetaljer/>
		} else {
			return (<SivilstatusComponent/>);
		}
	}
}

export default connectSoknadsdataContainer(DinSivilstatusView);

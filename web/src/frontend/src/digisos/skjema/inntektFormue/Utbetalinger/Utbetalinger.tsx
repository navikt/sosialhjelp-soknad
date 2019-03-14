import * as React from 'react';
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { InjectedIntlProps, injectIntl } from "react-intl";
import {SoknadsSti} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";


type Props = SoknadsdataContainerProps & InjectedIntlProps;


class UtbetalingerView extends React.Component<Props, {}>{

	constructor(props: Props){
		super(props);
	}

	componentDidMount(): void {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.UTBETALINGER);
	}


	render(){

		const {soknadsdata } = this.props;

		console.warn(soknadsdata);

		return(
			<div>
				UtbetalingerView
			</div>
		)
	}
}



export default connectSoknadsdataContainer(injectIntl(UtbetalingerView));

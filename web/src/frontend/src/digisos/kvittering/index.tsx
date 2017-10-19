import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Panel } from "nav-frontend-paneler";
import Icon from "nav-frontend-ikoner-assets";
import { Undertittel } from "nav-frontend-typografi";
import { State } from "../redux/reducers";
import { getBosted } from "../data/kommuner";
import { scrollToTop } from "../../nav-soknad/utils";
import AppTittel from "../../nav-soknad/components/apptittel/AppTittel";
import { getIntlTextOrKey } from "../../nav-soknad/utils/intlUtils";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import { hentKvittering } from "../../nav-soknad/redux/soknadActions";
import { REST_STATUS, Kvittering } from "../../nav-soknad/types";
import LoadContainer from "../../nav-soknad/components/loadContainer/LoadContainer";

interface InjectedRouterProps {
	location: Location;
	match: {
		params: {
			brukerBehandlingId: string;
		};
		url: string;
	};
}

interface StateProps {
	kvittering: Kvittering;
	restStatus: REST_STATUS;
}

class KvitteringView extends React.Component<
	StateProps & InjectedIntlProps & DispatchProps & InjectedRouterProps,
	{}
> {
	componentDidMount() {
		scrollToTop();
		this.props.dispatch(
			hentKvittering(this.props.match.params.brukerBehandlingId)
		);
	}
	render() {
		const { kvittering, restStatus, intl } = this.props;
		console.log(kvittering);
		return (
			<LoadContainer restStatus={restStatus}>
				<AppTittel />
				<div className="kvittering skjema-content">
					<Panel>
						<Icon kind="stegindikator__hake" className="kvittering__ikon" />
						<Undertittel className="kvittering__tittel">
							{getIntlTextOrKey(intl, "kvittering.undertittel")}
						</Undertittel>
						{kvittering ? (
							<div className="kvittering__tekst">
								<p>
									{getIntlTextOrKey(intl, "kvittering.tekst.pre")} {" "}
									<strong>
										{getBosted(kvittering.kommune, kvittering.bydel)}
									</strong>
									{getIntlTextOrKey(intl, "kvittering.tekst.post")}
								</p>
							</div>
						) : null}
					</Panel>
				</div>
			</LoadContainer>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		restStatus: state.soknad.restStatus,
		kvittering: state.soknad.kvittering
	};
})(injectIntl(withRouter(KvitteringView)));

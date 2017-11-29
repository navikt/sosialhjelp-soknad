import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Panel } from "nav-frontend-paneler";
import Icon from "nav-frontend-ikoner-assets";
import { Undertittel } from "nav-frontend-typografi";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import { State } from "../redux/reducers";
import { scrollToTop } from "../../nav-soknad/utils";
import AppTittel from "../../nav-soknad/components/apptittel/AppTittel";
import { getIntlTextOrKey } from "../../nav-soknad/utils/intlUtils";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import { hentKvittering } from "../../nav-soknad/redux/soknad/soknadActions";
import { REST_STATUS, Kvittering } from "../../nav-soknad/types";
import LoadContainer from "../../nav-soknad/components/loadContainer/LoadContainer";
import Vedleggsliste from "../../nav-soknad/components/vedlegg/Veleggsliste";
import VeienVidere from "./VeienVidere";

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
	visVedlegg: boolean;
	restStatus: REST_STATUS;
}

const Vedleggsinfo: React.StatelessComponent<
	StateProps & InjectedIntlProps
> = ({ kvittering, intl }) => {
	return (
		<div className="kvittering__vedlegg">
			<Ekspanderbartpanel
				className="ekspanderbartPanel--kvittering"
				tittel={intl.formatMessage({ id: "kvittering.vedlegg.tittel" })}
				apen={false}
			>
				<div className="kvittering__tekst blokk-s">
					<Vedleggsliste vedlegg={kvittering.ikkeInnsendteVedlegg} />
				</div>
			</Ekspanderbartpanel>
		</div>
	);
};

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
		const { kvittering, visVedlegg, restStatus, intl } = this.props;
		return (
			<LoadContainer restStatus={restStatus}>
				{kvittering && (
					<div>
						<AppTittel />
						<div className="kvittering skjema-content">
							<div className="blokk-xl">
								<Panel className="blokk-xxs">
									<Icon
										kind="stegindikator__hake"
										className="kvittering__ikon"
									/>
									<Undertittel className="kvittering__tittel">
										{getIntlTextOrKey(intl, "kvittering.undertittel")}
									</Undertittel>
									<div>
										<div className="kvittering__tekst blokk-m">
											<p>
												{getIntlTextOrKey(intl, "kvittering.tekst.pre")}{" "}
												<strong>{kvittering.navenhet}</strong>
												{getIntlTextOrKey(intl, "kvittering.tekst.post")}
											</p>
										</div>
									</div>
								</Panel>
								{visVedlegg && <Vedleggsinfo {...this.props} />}
							</div>
							<VeienVidere />
						</div>
					</div>
				)}
			</LoadContainer>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		restStatus: state.soknad.restStatus,
		kvittering: state.soknad.kvittering,
		visVedlegg:
			state.soknad.kvittering &&
			state.soknad.kvittering.ikkeInnsendteVedlegg &&
			state.soknad.kvittering.ikkeInnsendteVedlegg.length > 0
	};
})(injectIntl(withRouter(KvitteringView)));

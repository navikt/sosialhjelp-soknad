import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
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
import SkrivUtKnapp from "../../nav-soknad/components/utskrift/SkrivUtKnapp";
import UtskriftKvittering from "./UtskriftKvittering";
import { Oppsummering } from "../../nav-soknad/redux/oppsummering/oppsummeringTypes";

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
	oppsummering: Oppsummering;
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

const Kvitteringsmelding: React.StatelessComponent<
	StateProps & InjectedIntlProps
> = ({ intl, kvittering }) => (
	<div>
		<Icon kind="stegindikator__hake" className="kvittering__ikon" />
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
	</div>
);

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
		const { kvittering, oppsummering, restStatus } = this.props;
		const visVedlegg = kvittering && kvittering.ikkeInnsendteVedlegg &&
			kvittering.ikkeInnsendteVedlegg.filter(v => v.skjemanummerTillegg !== "annet" && v.skjemaNummer !== "annet")
			.length > 0;
		return (
			<LoadContainer restStatus={restStatus}>
				{kvittering && (
					<div>
						<AppTittel />
						<div className="kvittering skjema-content">
							<div className="blokk-xl">
								<Panel className="blokk-xxs">
									<Kvitteringsmelding {...this.props} />
									{this.props.oppsummering && (
										<div className="blokk-s">
											<SkrivUtKnapp
												prerenderInnhold={true}
												innholdRenderer={() => (
													<UtskriftKvittering
														oppsummering={oppsummering}
														kvittering={kvittering}
														visVedlegg={visVedlegg}
													/>
												)}
											>
												<FormattedMessage id="kvittering.skrivutknapp.label" />
											</SkrivUtKnapp>
										</div>
									)}
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

export default connect((state: State, props: any): StateProps => {
	const harOppsummering = state.oppsummering.restStatus === REST_STATUS.OK;
	return {
		restStatus: state.soknad.restStatus,
		kvittering: state.soknad.kvittering,
		oppsummering: harOppsummering ? state.oppsummering.oppsummering : null
	};
})(injectIntl(withRouter(KvitteringView)));

import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouterProps } from "react-router";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import Knapp from "nav-frontend-knapper";
import { Select } from "nav-frontend-skjema";

import { FaktumComponentProps } from "../../nav-soknad/redux/fakta/faktaTypes";
import Arrow from "../../nav-soknad/components/svg/Arrow";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import { REST_STATUS } from "../../nav-soknad/types";

import { State } from "../redux/reducers";
import {
	startSoknad,
	resetSoknad
} from "../../nav-soknad/redux/soknad/soknadActions";
import { Kommuner, Kommune, Bydel, getBosted } from "../data/kommuner";
import { getIntlTextOrKey } from "../../nav-soknad/utils/intlUtils";

interface StateProps {
	soknadRestStatus?: string;
	faktaRestStatus?: string;
	brukerBehandlingId?: string;
	kommuneId: string;
	bydelId: string;
}

class Bosted extends React.Component<
	FaktumComponentProps &
		StateProps &
		RouterProps &
		DispatchProps &
		InjectedIntlProps,
	StateProps
> {
	constructor(props: any) {
		super(props);
		this.state = {
			kommuneId: "",
			bydelId: ""
		};
	}

	componentDidMount() {
		this.props.dispatch(resetSoknad());
	}

	componentDidUpdate() {
		if (
			this.props.faktaRestStatus === REST_STATUS.OK &&
			this.props.soknadRestStatus === REST_STATUS.OK
		) {
			this.setState({
				kommuneId: "",
				bydelId: ""
			});
			this.gaaTilSkjema();
		}
	}

	gaaTilSkjema() {
		this.props.history.push(`/skjema/${this.props.brukerBehandlingId}/1`);
	}

	opprettSoknad(event: any) {
		event.preventDefault();
		this.props.dispatch(
			startSoknad(this.props.intl, this.state.kommuneId, this.state.bydelId)
		);
	}

	render() {
		const { valgtKommune, valgtBydel, ferdig } = this.hentSkjemaVerdier();
		const startSoknadPending =
			this.props.soknadRestStatus === REST_STATUS.PENDING;
		return (
			<form onSubmit={e => this.opprettSoknad(e)}>
				<div>
					<div className="blokk-m">
						<Select
							bredde="m"
							defaultValue=""
							onChange={(evt: any) =>
								this.setState({ kommuneId: evt.target.value })}
							label={
								<div className="bosted__selectLabel bosted__tekst--extraPadding">
									<FormattedMessage id="personalia.kommune.label" />
								</div>
							}
						>
							{!this.state.kommuneId && (
								<option value="" disabled={true}>
									{getIntlTextOrKey(
										this.props.intl,
										"personalia.kommune.default"
									)}
								</option>
							)}
							{Kommuner.map(kommune => (
								<option value={kommune.id} key={kommune.id}>
									{kommune.navn}
								</option>
							))}
						</Select>
					</div>

					{valgtKommune && valgtKommune.bydeler ? (
						<div className="blokk-m">
							<div className="bosted__bydelArrow">
								<Arrow />
							</div>
							<Select
								bredde="m"
								defaultValue=""
								onChange={(evt: any) =>
									this.setState({ bydelId: evt.target.value })}
								label={
									<div className="bosted__selectLabel bosted__tekst--extraPadding">
										<FormattedMessage id="personalia.bydel.label" />
									</div>
								}
							>
								{!this.state.bydelId && (
									<option value="" disabled={true}>
										{getIntlTextOrKey(
											this.props.intl,
											"personalia.bydel.default"
										)}
									</option>
								)}
								{valgtKommune.bydeler.map(bydel => (
									<option value={bydel.id} key={bydel.id}>
										{bydel.navn}
									</option>
								))}
							</Select>
						</div>
					) : null}
					{ferdig ? (
						<div>
							<p className="bosted__tekst--extraPadding">
								{getIntlTextOrKey(
									this.props.intl,
									"personalia.bosted.oppsummering"
								)}{" "}
								<strong>
									{getBosted(
										valgtKommune.id,
										valgtBydel ? valgtBydel.id : null
									)}
								</strong>
							</p>
							<Knapp
								type="hoved"
								htmlType="submit"
								spinner={startSoknadPending}
								disabled={startSoknadPending}
							>
								{getIntlTextOrKey(this.props.intl, "skjema.knapper.gaavidere") +
									" "}
							</Knapp>
						</div>
					) : null}
				</div>
			</form>
		);
	}

	private hentSkjemaVerdier() {
		const { kommuneId, bydelId } = this.state;
		const valgtKommune: Kommune | undefined = kommuneId
			? Kommuner.find(k => k.id === kommuneId)
			: undefined;
		const valgtBydel: Bydel | undefined =
			valgtKommune && valgtKommune.bydeler
				? valgtKommune.bydeler.find(b => b.id === bydelId)
				: undefined;
		const ferdig =
			(valgtKommune && !valgtKommune.bydeler) || (valgtKommune && valgtBydel);
		return { valgtKommune, valgtBydel, ferdig };
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data,
		soknadRestStatus: state.soknad.restStatus,
		faktaRestStatus: state.fakta.restStatus,
		brukerBehandlingId: state.soknad.data.brukerBehandlingId
	};
})(withRouter(injectIntl(Bosted)));

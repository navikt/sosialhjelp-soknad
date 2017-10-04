import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouterProps } from "react-router";
import { InjectedIntlProps, FormattedMessage } from "react-intl";
import Knapp from "nav-frontend-knapper";
import { Select } from "nav-frontend-skjema";

import { FaktumComponentProps } from "../../nav-soknad/redux/faktaReducer";
import Arrow from "../../nav-soknad/components/svg/Arrow";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import { REST_STATUS } from "../../nav-soknad/types";

import { State } from "../redux/reducers";
import { opprettSoknad, resetSoknad } from "../redux/soknad/soknadActions";
import { Kommuner, Kommune, Bydel, getBosted } from "../data/kommuner";

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
		const { kommuneId, bydelId } = this.state;
		this.props.dispatch(opprettSoknad(kommuneId, bydelId));
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
									Velg by
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
										Velg bydel
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
								Når du har fylt ut blir søknaden sendt til{" "}
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
								Start søknad
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
})(withRouter(Bosted));

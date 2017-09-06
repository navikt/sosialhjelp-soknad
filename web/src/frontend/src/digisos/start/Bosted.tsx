import * as React from "react";
import { connect } from "react-redux";
import Knapp from "nav-frontend-knapper";
import {
	FaktumState,
	FaktumComponentProps
} from "../../nav-soknad/redux/reducer";
import Arrow from "../../nav-soknad/components/svg/Arrow";
import { Kommuner, Kommune, Bydel, getBosted } from "../data/kommuner";
import { Collapse } from "react-collapse";
import { SoknadState, ActionTypeKeys } from "../redux/soknad/types";
import { withRouter, RouterProps } from "react-router";
import { opprettSoknad } from "../redux/soknad/actions";
import { DispatchProps } from "../redux/types";
import { Select } from "nav-frontend-skjema";
import { InjectedIntlProps, FormattedMessage } from "react-intl";

interface StateProps {
	status?: string;
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

	componentDidUpdate() {
		if (this.props.status === ActionTypeKeys.OK) {
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

		return (
			<form onSubmit={e => this.opprettSoknad(e)}>
				<Collapse isOpened={true}>
					<div className="blokk-l">
						<Select
							bredde="m"
							onChange={(evt: any) =>
								this.setState({ kommuneId: evt.target.value })}
							label={
								<strong>
									<FormattedMessage id="personalia.kommune.label" />
								</strong>
							}
						>
							<option value="" />
							{Kommuner.map(kommune => (
								<option value={kommune.id} key={kommune.id}>
									{kommune.navn}
								</option>
							))}
						</Select>
					</div>

					{valgtKommune && valgtKommune.bydeler ? (
						<div className="blokk-l">
							<Arrow />
							<Select
								bredde="m"
								onChange={(evt: any) =>
									this.setState({ bydelId: evt.target.value })}
								label={
									<strong>
										<FormattedMessage id="personalia.bydel.label" />
									</strong>
								}
							>
								<option value="" />
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
							<p>
								Når du har fylt ut blir søknaden sendt til{" "}
								<strong>
									{getBosted(
										valgtKommune.id,
										valgtBydel ? valgtBydel.id : null
									)}
								</strong>
							</p>
							<Knapp type="hoved" htmlType="submit">
								Start søknad
							</Knapp>
						</div>
					) : null}
				</Collapse>
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

export default connect(
	(state: { faktumStore: FaktumState; soknad: SoknadState }, props: any) => {
		return {
			fakta: state.faktumStore.fakta,
			status: state.soknad.status,
			brukerBehandlingId: state.soknad.brukerBehandlingId
		};
	}
)(withRouter(Bosted));

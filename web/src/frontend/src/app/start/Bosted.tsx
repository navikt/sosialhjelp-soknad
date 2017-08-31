import * as React from "react";
import { connect } from "react-redux";
import FaktumSelect from "../../skjema/faktum/FaktumSelect";
import Knapp from "nav-frontend-knapper";
import { FaktumState, FaktumComponentProps } from "../../skjema/reducer";
import { Kommuner, Kommune, Bydel, getBosted } from "../data/kommuner";
import { Collapse } from "react-collapse";
import { SoknadState, ActionTypeKeys } from "../../redux/soknad/types";
import Arrow from "../../skjema/components/svg/Arrow";
import { withRouter, RouterProps } from "react-router";
import { opprettSoknad } from "../../redux/soknad/actions";
import { DispatchProps } from "../../redux/types";

interface StateProps {
	status?: string;
	brukerBehandlingId?: string;
}

class Bosted extends React.Component<
	FaktumComponentProps & RouterProps & StateProps & DispatchProps
> {
	componentDidUpdate() {
		if (this.props.status === ActionTypeKeys.OK) {
			this.gaaTilSkjema();
		}
	}

	gaaTilSkjema() {
		const { fakta } = this.props;
		const kommuneId = fakta.get("personalia.kommune");
		const bydelId = fakta.get("personalia.bydel");
		let search = "?personalia.kommune=" + kommuneId;
		if (bydelId) {
			search += "&personalia.bydel=" + bydelId;
		}
		const pathname = "/skjema/" + this.props.brukerBehandlingId + "/1";
		this.props.history.push(`${pathname}/${search}`);
	}

	opprettSoknad(event: any) {
		event.preventDefault();
		this.props.dispatch(opprettSoknad());
	}

	render() {
		const { fakta } = this.props;
		const kommuneId = fakta.get("personalia.kommune");
		const bydelId = fakta.get("personalia.bydel");

		const valgtKommune: Kommune | undefined = kommuneId
			? Kommuner.find(k => k.id === kommuneId)
			: undefined;
		const valgtBydel: Bydel | undefined =
			valgtKommune && valgtKommune.bydeler
				? valgtKommune.bydeler.find(b => b.id === bydelId)
				: undefined;

		const ferdig =
			(valgtKommune && !valgtKommune.bydeler) || (valgtKommune && valgtBydel);

		return (
			<form onSubmit={e => this.opprettSoknad(e)}>
				<Collapse isOpened={true}>
					<div className="blokk-l">
						<FaktumSelect
							faktumKey="personalia.kommune"
							bredde="m"
							labelFunc={(label: string) => <strong>{label}</strong>}>
							<option value="" />
							{Kommuner.map(kommune => (
								<option value={kommune.id} key={kommune.id}>
									{kommune.navn}
								</option>
							))}
						</FaktumSelect>
					</div>

					{valgtKommune && valgtKommune.bydeler ? (
						<div className="blokk-l">
							<Arrow />
							<FaktumSelect
								faktumKey="personalia.bydel"
								bredde="m"
								labelFunc={(label: string) => <strong>{label}</strong>}>
								<option value="" />
								{valgtKommune.bydeler.map(bydel => (
									<option value={bydel.id} key={bydel.id}>
										{bydel.navn}
									</option>
								))}
							</FaktumSelect>
						</div>
					) : null}
					{ferdig ? (
						<div>
							<p>
								Når du har fylt ut blir søknaden sendt til{" "}
								<strong>{getBosted(valgtKommune.id, valgtBydel.id)}</strong>
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

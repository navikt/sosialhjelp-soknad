import * as React from "react";
import { connect } from "react-redux";
import FaktumSelect from "../../skjema/faktum/FaktumSelect";
import Knapp from "nav-frontend-knapper";
import { FaktumState, FaktumMap } from "../../skjema/reducer";
import { Kommuner } from "./kommuner";
import { Kommune, Bydel } from "./types";
import { Collapse } from "react-collapse";
import Arrow from "../components/svg/Arrow";
import { opprettSoknad } from "../../redux/soknad/actions";
import { bindActionCreators } from "redux";
import { SoknadState, ActionTypeKeys } from "../../redux/soknad/types";
import { withRouter, RouterProps } from "react-router";

interface StateProps {
	faktum: FaktumMap;
	status?: string;
	brukerBehandlingId?: string;
}

class Bosted extends React.Component<StateProps & RouterProps & DispatchToProps> {

	constructor(props: StateProps & RouterProps & DispatchToProps) {
		super(props);
		this.state = {
			kommune: "",
			bydel: ""
		};
	}

	componentDidUpdate() {
		if (this.props.status === ActionTypeKeys.OK) {
			this.gaaTilSkjema();
		}
	}

	gaaTilSkjema() {
		const kommuneKey = "kommune";
		const bydelKey = "bydel";
		let search = "?personalia.kommune=" + this.state[kommuneKey];
		if (this.state[bydelKey]) {
			search += "&personalia.bydel=" + this.state[bydelKey];
		}
		const pathname = "/skjema/" + this.props.brukerBehandlingId + "/1";
		this.props.history.push(`${pathname}/${search}`);
	}

	opprettSoknad(event: any) {
		event.preventDefault();
		this.props.action.opprettSoknad();
	}

	render() {
		const { faktum } = this.props;
		const kommuneId = faktum.get("personalia.kommune");
		const bydelId = faktum.get("personalia.bydel");

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
			<form onSubmit={(e) => this.opprettSoknad(e)}>
				<Collapse isOpened={true}>
					<div className="blokk-l">
						<FaktumSelect
							faktumKey="personalia.kommune"
							bredde="m"
							onChange={(event) => this.setState({kommune: event.target.value})}
							labelFunc={label =>
								<strong>
									{label}
								</strong>}
						>
							<option value="" />
							{Kommuner.map(kommune =>
								<option value={kommune.id} key={kommune.id}>
									{kommune.navn}
								</option>
							)}
						</FaktumSelect>
					</div>

					{valgtKommune && valgtKommune.bydeler
						? <div className="blokk-l">
								<Arrow />
								<FaktumSelect
									faktumKey="personalia.bydel"
									bredde="m"
									labelFunc={label =>
										<strong>
											{label}
										</strong>}
									onChange={(event) => this.setState({bydel: event.target.value})}
								>
									<option value="" />
									{valgtKommune.bydeler.map(bydel =>
										<option value={bydel.id} key={bydel.id}>
											{bydel.navn}
										</option>
									)}
								</FaktumSelect>
							</div>
						: null}
					{ferdig
						? <div>
								<p>
									Når du har fylt ut blir søknaden sendt til{" "}
									<strong>
										{valgtKommune!.navn}
										{valgtBydel ? `, ${valgtBydel.navn}` : null}
									</strong>
								</p>
								<Knapp type="hoved" htmlType="submit">
									Start søknad
								</Knapp>
							</div>
						: null}
				</Collapse>
			</form>
		);
	}
}

interface DispatchToProps {
	action: {
		opprettSoknad: () => {}
	};
}

const mapDispatchToProps = (dispatch: any): DispatchToProps => ({
	action: bindActionCreators({opprettSoknad}, dispatch)
});

const mapStateToProps = (state: { faktum: FaktumState, soknad: SoknadState }): {} => ({
	faktum: state.faktum.faktum,
	status: state.soknad.status,
	brukerBehandlingId: state.soknad.brukerBehandlingId
});

export default connect<{}, DispatchToProps, {}>(mapStateToProps, mapDispatchToProps)(withRouter(Bosted));

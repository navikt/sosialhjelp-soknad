import * as React from "react";
import { connect } from "react-redux";
import FaktumSelect from "../../skjema/faktum/FaktumSelect";
import Knapp from "nav-frontend-knapper";
import { FaktumState, FaktumMap } from "../../skjema/reducer";
import { Kommuner } from "./kommuner";
import { Kommune, Bydel } from "./types";
import { Collapse } from "react-collapse";
import Arrow from "../../skjema/components/svg/Arrow";

interface StateProps {
	faktum: FaktumMap;
}

class Bosted extends React.Component<StateProps> {
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
			<form action="/skjema/1">
				<Collapse isOpened={true}>
					<div className="blokk-l">
						<FaktumSelect
							faktumKey="personalia.kommune"
							bredde="m"
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
export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(Bosted);

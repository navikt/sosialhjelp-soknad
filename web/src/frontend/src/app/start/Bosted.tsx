import * as React from "react";
import { connect } from "react-redux";
import FaktumSelect from "../../skjema/faktum/FaktumSelect";
import Knapp from "nav-frontend-knapper";
import { FaktumState, FaktumMap } from "../../skjema/reducer";
import { Kommuner } from "./kommuner";
import { Kommune, Bydel } from "./types";
import { Collapse } from "react-collapse";

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
								<svg
									className="bostedBydelArrow"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 100 125"
								>
									<path d="M67.4 57.3L53.5 71.3V19.7c0-2-1.6-3.6-3.6-3.6s-3.6 1.6-3.6 3.6v51.6L32.3 57.3c-1.4-1.4-3.7-1.4-5.1 0 -1.4 1.4-1.4 3.7 0 5.1l20.1 20.1c0.2 0.2 0.4 0.3 0.5 0.4 0 0 0.1 0.1 0.2 0.1 0.2 0.1 0.3 0.2 0.5 0.2 0.1 0 0.1 0 0.2 0.1 0.2 0.1 0.3 0.1 0.5 0.1 0.2 0 0.5 0.1 0.7 0.1h0c0.2 0 0.5 0 0.7-0.1 0.2 0 0.3-0.1 0.4-0.1 0.1 0 0.2 0 0.2-0.1 0.2-0.1 0.3-0.2 0.5-0.3 0 0 0.1 0 0.1-0.1 0.2-0.1 0.4-0.3 0.5-0.4l20.1-20.1c1.4-1.4 1.4-3.7 0-5.1C71.1 55.9 68.8 55.9 67.4 57.3z" />
								</svg>

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

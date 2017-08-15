import * as React from "react";
import Bolk from "../components/bolk";
import Steg from "../components/steg";
import { Checkbox, SkjemaGruppe, Textarea } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { SkjemaState, FaktumMap } from "./reducer";
import { setFaktumVerdi } from "./actions";
import { DispatchProps } from "../utils/types";

interface StateProps {
	faktum: FaktumMap;
}

class Steg1 extends React.Component<StateProps & DispatchProps, any> {
	render() {
		const { faktum, dispatch } = this.props;
		return (
			<Steg tittel="Arbeid og utdanning">
				<Bolk>
					<SkjemaGruppe title="Hva er din situasjon i dag?">
						<Checkbox
							checked={faktum.get("arbeid.dinsituasjon.arbeidsledig") === true}
							onChange={(evt: any) =>
								dispatch(
									setFaktumVerdi(
										"arbeid.dinsituasjon.arbeidsledig",
										evt.target.checked
									)
								)}
							label="Jeg er ikke i jobb"
							name="arbeid.dinsituasjon.arbeidsledig"
							value="ikkearbeid"
						/>
						<Checkbox
							checked={faktum.get("arbeid.dinsituasjon.jobb") === true}
							onChange={(evt: any) =>
								dispatch(
									setFaktumVerdi("arbeid.dinsituasjon.jobb", evt.target.checked)
								)}
							label="Jeg er i jobb"
							name="arbeid.dinsituasjon.jobb"
							value="iarbeid"
						/>
						<Checkbox
							checked={faktum.get("arbeid.dinsituasjon.student") === true}
							onChange={(evt: any) =>
								dispatch(
									setFaktumVerdi(
										"arbeid.dinsituasjon.student",
										evt.target.checked
									)
								)}
							label="Jeg er student"
							name="arbeid.dinsituasjon.student"
							value="student"
						/>
						<Checkbox
							checked={
								faktum.get("arbeid.dinsituasjon.annensituasjon") === true
							}
							onChange={(evt: any) =>
								dispatch(
									setFaktumVerdi(
										"arbeid.dinsituasjon.annensituasjon",
										evt.target.checked
									)
								)}
							label="Annen situasjon"
							name="arbeid.dinsituasjon.annensituasjon"
							value="annen"
						/>
						{faktum.get("arbeid.dinsituasjon.annensituasjon") === true
							? <Textarea
									label="Beskriv annen situasjon"
									value={
										faktum.get(
											"arbeid.dinsituasjon.annensituasjon.beskrivelse"
										) || ""
									}
									name="arbeid.dinsituasjon.annensituasjon.beskrivelse"
									onChange={(evt: any) =>
										dispatch(
											setFaktumVerdi(
												"arbeid.dinsituasjon.annensituasjon.beskrivelse",
												evt.target.value
											)
										)}
								/>
							: null}
					</SkjemaGruppe>
				</Bolk>
			</Steg>
		);
	}
}

// export default Steg1;
export default connect((state: { skjema: SkjemaState }, props: any) => {
	return {
		faktum: state.skjema.faktum
	};
})(Steg1);

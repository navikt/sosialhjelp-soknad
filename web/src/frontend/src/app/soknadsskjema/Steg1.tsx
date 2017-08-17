import * as React from "react";
import Bolk from "../components/bolk";
import Steg from "../components/steg";
import { SkjemaGruppe, Textarea } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../faktum/reducer";
import { setFaktumVerdi } from "../faktum/actions";
import { DispatchProps } from "../utils/types";

import FaktumCheckbox from "../faktum/components/FaktumCheckbox";

interface StateProps {
	faktum: FaktumMap;
}

class Steg1 extends React.Component<StateProps & DispatchProps, any> {
	render() {
		const { faktum, dispatch } = this.props;
		return (
			<Steg tittel="Arbeid og utdanning">
				<Bolk hjelpetekst="Hjelpetekst om bosituasjon.">
					<SkjemaGruppe title="Hva er din situasjon i dag?">
						<FaktumCheckbox faktumKey="arbeid.dinsituasjon.arbeidsledig" />
						<FaktumCheckbox
							faktumKey="arbeid.dinsituasjon.jobb"
							disabled={true}
						/>
						<FaktumCheckbox faktumKey="arbeid.dinsituasjon.student" />
						<FaktumCheckbox
							faktumKey="arbeid.dinsituasjon.annensituasjon"
							feil={{
								tittel: "ABCV",
								feilmelding: "Dette er feilmeldingen"
							}}
						/>
						{faktum.get("arbeid.dinsituasjon.annensituasjon") === "true"
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

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(Steg1);

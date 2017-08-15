import * as React from "react";
import Bolk from "../components/bolk";
import Steg from "../components/steg";
import { Radio, SkjemaGruppe } from "nav-frontend-skjema";

class Steg1 extends React.Component<{}, {}> {
	render() {
		return (
			<Steg tittel="Bosituasjon">
				<Bolk>
					<SkjemaGruppe title="Hvordan bor du?">
						<Radio
							id=""
							label="Hva er dette for noe"
							name="bosituasjon"
							value="1"
						/>
						<Radio
							id=""
							label="Hva er dette for noe"
							name="bosituasjon"
							value="2"
						/>
						<Radio
							id=""
							label="Hva er dette for noe"
							name="bosituasjon"
							value="3"
						/>
						<Radio
							id=""
							label="Hva er dette for noe"
							name="bosituasjon"
							value="4"
						/>
						<Radio
							id=""
							label="Hva er dette for noe"
							name="bosituasjon"
							value="5"
						/>
					</SkjemaGruppe>
				</Bolk>
			</Steg>
		);
	}
}

export default Steg1;

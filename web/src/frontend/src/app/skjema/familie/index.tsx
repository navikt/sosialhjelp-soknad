import * as React from "react";
import Steg from "../../../skjema/components/steg";
import Sivilstatus from "./Sivilstatus";
import Barn from "./Barn";
import AndreBarn from "./AndreBarn";

class Bosted extends React.Component<{}, {}> {
	render() {
		return (
			<Steg tittelId="Familiesituasjon">
				<Sivilstatus />
				<Barn />
				<AndreBarn />
			</Steg>
		);
	}
}

export default Bosted;

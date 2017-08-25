import * as React from "react";
import FaktumPersonskjema from "../../../skjema/faktum/FaktumPersonskjema";

class Ektefelle extends React.Component<{}, {}> {
	render() {
		return (
			<div>
				<FaktumPersonskjema faktumKey="sivilstatus.ektefelle" />
			</div>
		);
	}
}

export default Ektefelle;

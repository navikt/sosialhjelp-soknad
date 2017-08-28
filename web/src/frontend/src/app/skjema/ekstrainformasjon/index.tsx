import * as React from "react";
import Steg from "../../../skjema/components/steg";
import Infoblokk from "../../../skjema/components/infoblokk";

class Ekstrainformasjon extends React.Component<{}, {}> {
	render() {
		return (
			<div>
				<div className="skjema-content ekstrainfo-melding">
					<Infoblokk>Info</Infoblokk>
				</div>
				<Steg tittelId="Opplysninger..." />
			</div>
		);
	}
}

export default Ekstrainformasjon;

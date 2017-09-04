import * as React from "react";
import Personskjema from "../components/person";

interface OwnProps {
	faktumKey: string;
}

class FaktumPersonskjema extends React.Component<OwnProps, {}> {
	render() {
		const { faktumKey } = this.props;
		return (
			<Personskjema
				navnFaktumKey={`${faktumKey}.navn`}
				fnrFaktumKey={`${faktumKey}.fnr`}
				pnrFaktumKey={`${faktumKey}.pnr`}
			/>
		);
	}
}

export default FaktumPersonskjema;

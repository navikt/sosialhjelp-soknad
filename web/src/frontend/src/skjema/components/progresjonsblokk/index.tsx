import * as React from "react";
import "./progresjonsblokk.css";

interface Props {
	progresjon?: number;
	tittel: string;
}

const Progresjonsblokk: React.StatelessComponent<Props> = ({
	progresjon,
	tittel,
	children
}) =>
	<div className="skjema-progresjonsblokk">
		<div className="skjema-progresjonsblokk__head">
			<h3>
				{tittel}
			</h3>
		</div>
		{children}
	</div>;

export default Progresjonsblokk;

import * as React from "react";
import "./progresjonsblokk.css";

interface Props {
	progresjon?: number;
	tittel: string;
	content: React.ReactNode[];
}

const Progresjonsblokk: React.StatelessComponent<Props> = ({
	progresjon,
	tittel,
	content
}) =>
	<div className="skjema-progresjonsblokk">
		<div className="skjema-progresjonsblokk__head">
			<h3>
				{tittel}
			</h3>
		</div>
		{content.map((child, idx) =>
			<div className="skjema-progresjonsblokk__sporsmal" key={idx}>
				{idx}
				{child}
			</div>
		)}
	</div>;

export default Progresjonsblokk;

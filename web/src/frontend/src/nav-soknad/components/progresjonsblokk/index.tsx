import * as React from "react";
import Skjemapanel from "../skjemapanel";
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
}) => (
	<Skjemapanel className="skjema-progresjonsblokk">
		<div className="skjema-progresjonsblokk__head">
			<h3>{tittel}</h3>
		</div>
		{content.map((child, idx) => (
			<div className="skjema-progresjonsblokk__sporsmal" key={idx}>
				{child}
			</div>
		))}
	</Skjemapanel>
);

export default Progresjonsblokk;

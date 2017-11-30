import * as React from "react";
import { Oppsummering } from "../../../nav-soknad/redux/oppsummering/oppsummeringTypes";

interface Props {
	oppsummering: Oppsummering;
}

const OppsummeringForUtskrift: React.StatelessComponent<Props> = (
	props: Props
) => {
	const { oppsummering } = props;

	const bolker = oppsummering.bolker.map((bolk, idx) => (
		<div className="blokk-xs bolk" key={idx}>
			<h2>{bolk.tittel}</h2>
			<div>
				<div dangerouslySetInnerHTML={{ __html: bolk.html }} />
			</div>
		</div>
	));

	return (
		<div className="oppsummeringUtskrift">
			<h1>Søknad om økonomisk sosialhjelp</h1>
			<div className="skjema-oppsummering">{bolker}</div>
		</div>
	);
};

export default OppsummeringForUtskrift;

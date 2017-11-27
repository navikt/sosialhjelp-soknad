import * as React from "react";
import { Vedlegg } from "../../types";

interface Props {
	vedlegg: Vedlegg[];
}

const Vedleggsliste: React.StatelessComponent<Props> = (props: Props) => (
	<ul className="vedleggsliste">
		{props.vedlegg.map(vedlegg => (
			<li key={vedlegg.vedleggId}>{vedlegg.tittel}</li>
		))}
	</ul>
);

export default Vedleggsliste;

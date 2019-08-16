import * as React from "react";
import { Vedlegg } from "../../types";
import { FormattedMessage } from "react-intl";

interface Props {
	vedlegg: Vedlegg[];
}

const Vedleggsliste: React.StatelessComponent<Props> = (props: Props) => (
	<ul className="vedleggsliste">
		{props.vedlegg
			.filter(v => v.skjemanummerTillegg !== "annet" && v.skjemaNummer !== "annet")
			.filter(v => v.innsendingsvalg !== "VedleggAlleredeSendt")
			.map(vedlegg => {
				const vedleggsKey = `vedlegg.${vedlegg.skjemaNummer}.${vedlegg.skjemanummerTillegg}.tittel`;
				return (<li key={vedlegg.fillagerReferanse}><FormattedMessage id={vedleggsKey}/></li>);
			})}
	</ul>
);

export default Vedleggsliste;

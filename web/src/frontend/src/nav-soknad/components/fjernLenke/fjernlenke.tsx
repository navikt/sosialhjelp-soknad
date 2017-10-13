import * as React from "react";
import AriaAlternativTekst from "../aria/AriaAlternativeText";

interface Props {
	fjern: () => void;
	lenketekst: string;
	alternativLenketekst?: string;
}
const FjernLenke = ({ fjern, lenketekst, alternativLenketekst }: Props) => {
	return (
		<a
			href="javascript:void(0);"
			onClick={fjern}
			role="button"
			className="lenke lenke-fjern"
		>
			<AriaAlternativTekst
				visibleText={lenketekst}
				ariaText={alternativLenketekst}
			/>
		</a>
	);
};

export default FjernLenke;

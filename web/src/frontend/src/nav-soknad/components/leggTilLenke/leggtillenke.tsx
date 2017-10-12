import * as React from "react";

interface Props {
	leggTil: () => void;
	lenketekst: string;
}
const LeggTilLenke = ({ leggTil, lenketekst }: Props) => {
	return (
		<a
			href="javascript:void(0);"
			onClick={leggTil}
			role="button"
			className="lenke lenke-legg-til"
		>
			{lenketekst}
		</a>
	);
};

export default LeggTilLenke;

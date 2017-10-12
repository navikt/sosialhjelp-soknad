import * as React from "react";

interface Props {
	fjern: () => void;
	lenketekst: string;
}
const FjernLenke = ({ fjern, lenketekst }: Props) => {
	return (
		<a
			href="javascript:void(0);"
			onClick={fjern}
			role="button"
			className="lenke lenke-fjern"
		>
			{lenketekst}
		</a>
	);
};

export default FjernLenke;

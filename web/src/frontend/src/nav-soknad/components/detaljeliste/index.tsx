import * as React from "react";
import * as classNames from "classnames";

export interface Detalje {
	tittel: string;
	verdi: React.ReactNode;
	className?: string;
}

interface Props {
	detaljer: Detalje[];
}

const Detaljeliste: React.StatelessComponent<Props> = ({ detaljer }) => (
	<dl className="detaljeliste">
		{detaljer.map((d, idx) => [
			<dt className="detaljeliste__tittel" key={`tittel-${idx}`}>
				{d.tittel}:
			</dt>,
			<dd
				className={classNames("detaljeliste__verdi", d.className)}
				key={`verdi-${idx}`}
			>
				{d.verdi}
			</dd>
		])}
	</dl>
);

export default Detaljeliste;

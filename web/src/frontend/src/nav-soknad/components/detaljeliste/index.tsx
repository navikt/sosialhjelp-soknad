import * as React from "react";

export interface ElementProps {
	tittel: React.ReactNode;
	verdi: React.ReactNode;
}

export const DetaljelisteElement: React.StatelessComponent<ElementProps> = (
	props: ElementProps
) => (
	<li>
		<strong className="detaljeliste__tittel" key="tittel">
			{props.tittel}:
		</strong>
		<div className={"detaljeliste__verdi"} key="verdi">
			{props.verdi}
		</div>
	</li>
);

interface Props {
	children: React.ReactNode;
}

const Detaljeliste: React.StatelessComponent<Props> = ({ children }) => (
	<ul className="detaljeliste">{children}</ul>
);

export default Detaljeliste;

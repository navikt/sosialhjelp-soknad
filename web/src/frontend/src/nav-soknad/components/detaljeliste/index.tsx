import * as React from "react";

export interface ElementProps {
	tittel: React.ReactNode|string;
	verdi: React.ReactNode|string;
	skjulDersomTomVerdi?: boolean;
}

export const DetaljelisteElement: React.StatelessComponent<ElementProps> = ({
	tittel,
	verdi,
	skjulDersomTomVerdi = true
}) => {
	if (skjulDersomTomVerdi && (verdi === null || verdi === undefined)) {
		return null;
	}
	return (
		<li className="detaljeliste__element">
			<strong className="detaljeliste__tittel" key="tittel">
				{tittel}:
			</strong>
			<span className={"detaljeliste__verdi"} key="verdi">
				{verdi}
			</span>
		</li>
	);
};

interface Props {
	children: React.ReactNode;
}

const Detaljeliste: React.StatelessComponent<Props> = ({ children }) => (
	<ul className="detaljeliste">{children}</ul>
);

export default Detaljeliste;

import * as React from "react";
import * as classNames from "classnames";

export interface ElementProps {
	tittel: React.ReactNode;
	verdi: React.ReactNode;
	skjulDersomTomVerdi?: boolean;
	spaced?: boolean;
}

export const DetaljelisteElement: React.StatelessComponent<ElementProps> = ({
	tittel,
	verdi,
	skjulDersomTomVerdi = true,
	spaced
}) => {
	if (skjulDersomTomVerdi && (verdi === null || verdi === undefined)) {
		return null;
	}
	return (
		<li
			className={classNames("detaljeliste__element", {
				"detaljeliste__element--spaced": spaced
			})}
		>
			<strong className="detaljeliste__tittel" key="tittel">
				{tittel}:
			</strong>
			<div className={"detaljeliste__verdi"} key="verdi">
				{verdi}
			</div>
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

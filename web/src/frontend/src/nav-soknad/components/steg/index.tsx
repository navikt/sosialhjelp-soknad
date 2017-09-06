import * as React from "react";
import "./steg.css";
import Feiloppsummering, {
	FeillisteMelding
} from "../validering/Feiloppsummering";

interface StegProps extends React.Props<any> {
	tittel: string;
}

const feilmeldinger: FeillisteMelding[] = [
	{
		feltnavn: "abc",
		feilmelding: "Whooo"
	}
];

const Steg: React.StatelessComponent<StegProps> = ({ tittel, children }) => {
	return (
		<div className="skjema-steg skjema-content">
			<div className="skjema-steg__feiloppsummering">
				<Feiloppsummering
					skjemanavn="abc"
					sendSkjemaFeiletHandtert={(x: string) => null}
					skjemaErGyldig={(x: string) => null}
					feilmeldinger={feilmeldinger}
					visFeilliste={true}
				/>
			</div>
			<h2 className="skjema-steg__tittel">{tittel}</h2>
			{children}
		</div>
	);
};

export default Steg;

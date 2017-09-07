import * as React from "react";
import "./steg.css";
import Feiloppsummering from "../validering/Feiloppsummering";
import { Valideringsfeil } from "../../redux/types";

interface StegProps extends React.Props<any> {
	tittel: string;
	feilmeldinger?: Valideringsfeil[];
	visFeilmeldinger?: boolean;
}

const Steg: React.StatelessComponent<StegProps> = ({
	tittel,
	feilmeldinger,
	visFeilmeldinger,
	children
}) => {
	return (
		<div className="skjema-steg skjema-content">
			<div className="skjema-steg__feiloppsummering">
				<Feiloppsummering
					skjemanavn="digisos"
					feilmeldinger={feilmeldinger}
					visFeilliste={visFeilmeldinger}
				/>
			</div>
			<h2 className="skjema-steg__tittel">{tittel}</h2>
			{children}
		</div>
	);
};

export default Steg;

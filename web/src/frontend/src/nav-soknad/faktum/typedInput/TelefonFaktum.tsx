import * as React from "react";
import InputFaktum, { OwnProps as Props } from "../InputFaktum";
import { erTelefonnummer } from "../../validering/valideringer";

const TelefonFaktum: React.StatelessComponent<Props> = (props: Props) => {
	const validerFunc = [erTelefonnummer].concat(
		props.validerFunc ? props.validerFunc : []
	);
	return (
		<InputFaktum
			{...props}
			type="tel"
			maxLength={props.maxLength || 8}
			bredde={props.bredde || "S"}
			validerFunc={validerFunc}
			className="skjemaelement__enLinje185bredde"
		/>
	);
};

export default TelefonFaktum;

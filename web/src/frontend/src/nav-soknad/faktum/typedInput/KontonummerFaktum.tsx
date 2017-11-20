import * as React from "react";
import InputFaktum, { OwnProps as Props } from "../InputFaktum";
import { erKontonummer } from "../../validering/valideringer";

const KontonummerFaktum: React.StatelessComponent<Props> = (props: Props) => {
	const validerFunc = [erKontonummer].concat(
		props.validerFunc ? props.validerFunc : []
	);
	return (
		<InputFaktum
			{...props}
			maxLength={13}
			bredde={props.bredde || "S"}
			validerFunc={validerFunc}
		/>
	);
};

export default KontonummerFaktum;

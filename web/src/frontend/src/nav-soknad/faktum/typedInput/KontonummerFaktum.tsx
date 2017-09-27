import * as React from "react";
import InputFaktum, { OwnProps as Props } from "../InputFaktum";
import { erKontonummer } from "../../validering/valideringer";

const KontonummerFaktum: React.StatelessComponent<Props> = (props: Props) => (
	<InputFaktum
		{...props}
		maxLength={13}
		bredde={props.bredde || "s"}
		validerFunc={[erKontonummer]}
	/>
);

export default KontonummerFaktum;

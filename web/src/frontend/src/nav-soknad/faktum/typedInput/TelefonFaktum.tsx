import * as React from "react";
import InputFaktum, { OwnProps as Props } from "../InputFaktum";
import { erTelefonnummer } from "../../validering/valideringer";

const TelefonFaktum: React.StatelessComponent<Props> = (props: Props) => (
	<InputFaktum
		{...props}
		type="tel"
		maxLength={15}
		bredde={props.bredde || "s"}
		validerFunc={[erTelefonnummer]}
	/>
);

export default TelefonFaktum;

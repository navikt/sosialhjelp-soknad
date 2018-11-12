import * as React from "react";
import InputFaktum, { OwnProps as Props } from "../InputFaktum";
import { erTelefonnummer } from "../../validering/valideringer";

interface OwnProps {
	className?: string;
}

type TelefonProps = Props & OwnProps;

const TelefonFaktum: React.StatelessComponent<TelefonProps> = (props: TelefonProps) => {
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

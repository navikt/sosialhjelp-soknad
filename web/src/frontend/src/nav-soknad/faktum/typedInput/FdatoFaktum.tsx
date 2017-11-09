import * as React from "react";
import InputFaktum, { OwnProps as InheritedProps } from "../InputFaktum";
import { fdato } from "../../validering/valideringer";

const FdatoFaktum: React.StatelessComponent<InheritedProps> = (
	props: InheritedProps
) => {
	const validerFunc = [fdato].concat(
		props.validerFunc ? props.validerFunc : []
	);
	return (
		<InputFaktum
			{...props}
			pattern={"\\d*"}
			validerFunc={validerFunc}
			maxLength={8}
		/>
	);
};

export default FdatoFaktum;

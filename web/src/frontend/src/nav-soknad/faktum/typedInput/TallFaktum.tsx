import * as React from "react";
import InputFaktum, { OwnProps as InheritedProps } from "../InputFaktum";
import { erTall, minLengde } from "../../validering/valideringer";
// import { FaktumValideringFunc } from "../../validering/types";

export interface Props extends InheritedProps {
	/** Trigger rent tall-tastatur på mobil (tilsvarende som type=tel) */
	kunHeltall?: boolean;
}
const TallFaktum: React.StatelessComponent<Props> = (props: Props) => {
	const validerFunc = [erTall].concat(
		props.validerFunc ? props.validerFunc : []
	);
	if (props.minLength) {
		validerFunc.push(value => minLengde(value, props.minLength));
	}
	return (
		<InputFaktum
			{...props}
			pattern={props.kunHeltall ? "\\d*" : null}
			validerFunc={validerFunc}
		/>
	);
};

export default TallFaktum;

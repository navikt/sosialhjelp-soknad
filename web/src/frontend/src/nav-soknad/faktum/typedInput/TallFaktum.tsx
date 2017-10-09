import * as React from "react";
import InputFaktum, { OwnProps as InheritedProps } from "../InputFaktum";
import { erTall } from "../../validering/valideringer";

export interface Props extends InheritedProps {
	/** Trigger rent tall-tastatur på mobil (tilsvarende som type=tel) */
	kunHeltall?: boolean;
}
const TallFaktum: React.StatelessComponent<Props> = (props: Props) => {
	return (
		<InputFaktum
			{...props}
			pattern={props.kunHeltall ? "\\d*" : null}
			validerFunc={[erTall]}
		/>
	);
};

export default TallFaktum;

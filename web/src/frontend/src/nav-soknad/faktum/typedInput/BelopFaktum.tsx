import * as React from "react";
import TallFaktum, { Props } from "../typedInput/TallFaktum";
/**
 * Denne er foreløpig kun et skall for TallInput, men det kan være
 * greit å ha en hook for senere funksjonalitet
 */
const BelopFaktum: React.StatelessComponent<Props> = (props: Props) => {
	return <TallFaktum maxLength={8} kunHeltall={true} {...props} />;
};

export default BelopFaktum;

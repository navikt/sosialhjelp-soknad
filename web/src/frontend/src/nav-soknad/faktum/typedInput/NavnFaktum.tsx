import * as React from "react";
import InputFaktum, { OwnProps as InheritedProps } from "../InputFaktum";

const NavnFaktum: React.StatelessComponent<InheritedProps> = (
	props: InheritedProps
) => {
	return <InputFaktum {...props} maxLength={100} />;
};

export default NavnFaktum;

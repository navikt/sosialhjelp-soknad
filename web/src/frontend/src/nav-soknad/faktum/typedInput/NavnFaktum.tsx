import * as React from "react";
import InputFaktum, { OwnProps as InheritedProps } from "../InputFaktum";

class NavnFaktum extends React.Component<InheritedProps, {}> {
	render() {
		return <InputFaktum {...this.props} maxLength={100} />;
	}
}
export default NavnFaktum;

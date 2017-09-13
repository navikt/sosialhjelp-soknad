import * as React from "react";
import { FaktumValidering, FaktumValideringsregler } from "../validering/types";
import {
	registerFaktumValidering,
	unregisterFaktumValidering
} from "../redux/valideringActions";
import { DispatchProps } from "../redux/faktaTypes";
import { Feil } from "nav-frontend-skjema";

export interface FaktumValideringProps {
	faktumKey: string;
	valideringer?: FaktumValidering[];
	valideringsregler?: FaktumValideringsregler[];
	feil?: Feil;
}

export const withFaktumValidering = () => <TOriginalProps extends {}>(
	Component:
		| React.ComponentClass<TOriginalProps & DispatchProps>
		| React.StatelessComponent<TOriginalProps & DispatchProps>
) => {
	type ResultProps = TOriginalProps & FaktumValideringProps & DispatchProps;
	const result = class YourComponentName extends React.Component<
		ResultProps,
		{}
	> {
		static displayName: string = `FaktumComponent(${Component.displayName ||
			Component.name})`;

		componentWillMount() {
			if (this.props.valideringer) {
				this.props.dispatch(
					registerFaktumValidering({
						faktumKey: this.props.faktumKey,
						valideringer: this.props.valideringer
					})
				);
			}
		}

		componentWillUnmount() {
			this.props.dispatch(unregisterFaktumValidering(this.props.faktumKey));
		}

		render(): JSX.Element {
			return <Component {...this.props} />;
		}
	};

	return result;
};

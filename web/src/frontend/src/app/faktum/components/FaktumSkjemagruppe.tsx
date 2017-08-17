import * as React from "react";
import { SkjemaGruppe, SkjemaGruppeProps } from "nav-frontend-skjema";
import "./faktumSkjemagruppe.css";

interface Props extends SkjemaGruppeProps {
	visible?: boolean;
}

const FaktumSkjemagruppe: React.StatelessComponent<Props> = (props: Props) => {
	const { visible, ...rest } = props;
	if (props.visible === false) {
		return null;
	}
	return (
		<fieldset className="faktumSkjemagruppe">
			<legend className="invisible">
				{props.title}
			</legend>
			<SkjemaGruppe {...rest} />
		</fieldset>
	);
};

export default FaktumSkjemagruppe;

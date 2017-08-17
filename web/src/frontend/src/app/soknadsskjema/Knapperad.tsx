import * as React from "react";
import { Knapp } from "nav-frontend-knapper";
import "./knapperad.css";

interface Skjemaknapp {
	label: string;
	disabled?: string;
	onClick?: () => void;
}

interface Props {
	neste?: Skjemaknapp;
	forrige?: Skjemaknapp;
	avbryt?: Skjemaknapp;
}

const SkjemaKnapperad: React.StatelessComponent<Props> = ({
	neste,
	forrige,
	avbryt
}) => (
	<div className="skjema-knapperad">
		{ neste ? (<Knapp type="hoved">{ neste.label }</Knapp>) : null }
		<Knapp type="standard" disabled={true}>Tilbake</Knapp>
		<a href="">Avbryt</a>
	</div>);

SkjemaKnapperad.defaultProps = {
	neste: {
		label: "Gå videre"
	}
};

export default SkjemaKnapperad;

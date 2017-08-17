import * as React from "react";
import { SkjemaGruppe, SkjemaGruppeProps } from "nav-frontend-skjema";

interface Props extends SkjemaGruppeProps {
	visible?: boolean;
}

const FaktumSkjemagruppe: React.StatelessComponent<Props> = (props: Props) => {
	const { visible, ...rest } = props;
	if (props.visible === false) {
		return null;
	}
	return <SkjemaGruppe {...rest} />;
};

export default FaktumSkjemagruppe;

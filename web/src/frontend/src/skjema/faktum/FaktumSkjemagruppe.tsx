import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { SkjemaGruppe, SkjemagruppeProps } from "nav-frontend-skjema";
import "./faktumSkjemagruppe.css";

interface Props extends SkjemagruppeProps {
	visible?: boolean;
	titleKey?: string;
}

const FaktumSkjemagruppe: React.StatelessComponent<Props> = (
	props: Props & InjectedIntlProps
) => {
	const { visible, intl, ...rest } = props;
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

export default injectIntl(FaktumSkjemagruppe);

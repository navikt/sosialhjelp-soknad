import * as React from "react";
import "./steg.css";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getIntlTextOrKey } from "../../utils";

interface StegProps extends React.Props<any> {
	tittelId: string;
}

const Steg: React.StatelessComponent<StegProps & InjectedIntlProps> = ({
	tittelId,
	intl,
	children
}) => {
	return (
		<div className="skjema-steg">
			<h2 className="skjema-steg__tittel">
				{getIntlTextOrKey(intl, tittelId)}
			</h2>
			{children}
		</div>
	);
};

export default injectIntl(Steg);

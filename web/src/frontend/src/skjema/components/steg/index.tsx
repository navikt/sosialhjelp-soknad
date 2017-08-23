import * as React from "react";
import "./steg.css";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";

interface StegProps extends React.Props<any> {
	tittelId: string;
}

const Steg: React.StatelessComponent<StegProps & InjectedIntlProps> = ({
	tittelId,
	children
}) => {
	return (
		<div className="skjema-steg">
			<h2 className="skjema-steg__tittel">
				<FormattedMessage id={tittelId} />
			</h2>
			{children}
		</div>
	);
};

export default injectIntl(Steg);

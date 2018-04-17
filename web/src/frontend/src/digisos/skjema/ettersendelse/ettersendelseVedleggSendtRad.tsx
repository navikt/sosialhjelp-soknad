import * as React from "react";
import Icon from "nav-frontend-ikoner-assets";
import { InjectedIntlProps } from "react-intl";

interface Props {
	antall: string;
	dato: string;
}

const VedleggSendtRad: React.StatelessComponent<InjectedIntlProps & Props> = ({antall, dato, intl}) => {
	return (
		<div className="avsnitt_med_marger">
			<div className="venstremarg">
				<Icon kind="stegindikator__hake" className="ettersendelse__ikon"/>
			</div>
			<div className="avsnitt">
				<h3>{antall} vedlegg er sendt</h3>
				<p>{dato}</p>
			</div>
			<div className="hoyremarg" />
		</div>
	);
};

export default VedleggSendtRad;

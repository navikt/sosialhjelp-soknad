import * as React from "react";
import { TilgangSperrekode } from "../redux/soknad/soknadTypes";
import Infoblokk from "../../nav-soknad/components/infoblokk";
import {
	FormattedHTMLMessage,
	InjectedIntlProps,
	injectIntl
} from "react-intl";

interface Props {
	sperrekode: TilgangSperrekode;
}

const IkkeTilgangInformasjon: React.StatelessComponent<
	Props & InjectedIntlProps
> = ({ sperrekode, intl }) => {
	if (sperrekode && sperrekode === "bruker") {
		return (
			<Infoblokk
				className="blokk-s"
				tittel={intl.formatMessage({
					id: "informasjon.ikketilgang.bruker.tittel"
				})}>
				<p className="blokk-s">
					<FormattedHTMLMessage id="informasjon.ikketilgang.bruker.tekst" />
				</p>
			</Infoblokk>
		);
	} else {
		return (
			<Infoblokk
				className="blokk-s"
				tittel={intl.formatMessage({ id: "informasjon.ikketilgang.tittel" })}>
				<p className="blokk-s">
					<FormattedHTMLMessage id="informasjon.ikketilgang.tekst" />
				</p>
			</Infoblokk>
		);
	}
};

export default injectIntl(IkkeTilgangInformasjon);

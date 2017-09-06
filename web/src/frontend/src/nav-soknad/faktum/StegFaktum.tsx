import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getIntlTextOrKey } from "../utils";
import Steg from "../components/steg";

interface StegProps extends React.Props<any> {
	tittelId: string;
}

const StegFaktum: React.StatelessComponent<StegProps & InjectedIntlProps> = ({
	tittelId,
	intl,
	children
}) => {
	return <Steg tittel={getIntlTextOrKey(intl, tittelId)}>{children}</Steg>;
};

export default injectIntl(StegFaktum);

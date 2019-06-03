import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import Kommunesok from "./kommunesok";
import Underskjema from "../../../../nav-soknad/components/underskjema";

interface OwnProps {
	visible: boolean;
}

type Props = OwnProps & InjectedIntlProps;

class MatrikkelAdresseView extends React.Component<Props, {}> {

	render() {
		return (
			<div className="skjema-sporsmal--jaNeiSporsmal">
				<Underskjema
					visible={this.props.visible}
					collapsable={true}
				>
					<p>
						{/*TODO: Legg inn i språkfil i react-intl*/}
						Du har en adressetype som ikke er en gateadresse. Velg din kommune for innsending av søknad.
					</p>
					<Kommunesok />
				</Underskjema>
			</div>
		);
	}
}

export default injectIntl(MatrikkelAdresseView);
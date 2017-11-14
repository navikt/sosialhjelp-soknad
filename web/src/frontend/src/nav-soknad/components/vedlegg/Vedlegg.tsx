import * as React from "react";
import { InjectedIntlProps, FormattedMessage, injectIntl } from "react-intl";
import { Knapp } from "nav-frontend-knapper";

interface OwnProps {
	faktumId: string;
	label: string;
	vedlegg?: any;
}

type Props = OwnProps & InjectedIntlProps;

class Vedlegg extends React.Component<Props, {}> {

	handleClick() {
		alert("Opplasting av vedlegg ikke implementert ennå.");
	}

	render() {
		return (
			<div className="container--noPadding">
				<p>
					{this.props.label}
				</p>
				<Knapp
					type="standard"
					htmlType="submit"
					spinner={false}
					disabled={false}
					onClick={ () => {this.handleClick(); }}
				>+ <FormattedMessage id="opplysninger.vedlegg.knapp.tekst"/></Knapp>
			</div>
		);
	}
}

export default (injectIntl(Vedlegg));

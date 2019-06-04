import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import Kommunesok from "./kommunesok";
import Underskjema from "../../../../nav-soknad/components/underskjema";

interface OwnProps {
	visible: boolean;
	kommunenr: string;
}

type Props = OwnProps & InjectedIntlProps;

class MatrikkelAdresseView extends React.Component<Props, {}> {
	internalIsMounted: boolean = false;

	componentDidMount(): void {
		this.internalIsMounted = true;
	}

	componentWillUnmount() {
		this.internalIsMounted = false;
	}

	render() {
		let visible = this.props.visible;
		if (this.props.kommunenr) {
			visible = false;

			// console.warn("Hente liste fra nytt REST endepunkt");
			// fetch(getApiBaseUrl() + "informasjon/kommunesok?kommunenr=" + this.props.kommunenr)
			// 	.then((res: any) => res.json())
			// 	.then((data: any) => {
			// 		if (this.internalIsMounted) {
			// 			console.warn("===> Debug: tilgjengelige navEnheter i kommune lest inn");
			// 			console.warn(JSON.stringify(data, null, 4));
			// 			// this.setState({ tilgjengeligeKommuner: data});
			// 		} else {
			// 			console.warn("Advarsel. Kommunesok ikke montert feil.");
			// 		}
			// 	})
			// 	.catch((error: any) => {
			// 		console.warn('Feil ved innlesing av påkoblede kommuner:', error);
			// 	});
		}

		return (
			<div className="skjema-sporsmal--jaNeiSporsmal">
				<Underskjema
					visible={visible}
					collapsable={true}
				>
					<p>
						<FormattedMessage id="matrikkel.tekst" />
					</p>
					{this.props.kommunenr && (
						<Kommunesok />
					)}
				</Underskjema>
			</div>
		);
	}
}

export default injectIntl(MatrikkelAdresseView);

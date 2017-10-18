import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Panel } from "nav-frontend-paneler";
import Icon from "nav-frontend-ikoner-assets";
import { Undertittel } from "nav-frontend-typografi";
import { FaktumComponentProps } from "../../nav-soknad/redux/faktaReducer";
import { State } from "../redux/reducers";
import { getBosted } from "../data/kommuner";
import { getFaktumVerdi, scrollToTop } from "../../nav-soknad/utils";
import AppTittel from "../../nav-soknad/components/apptittel/AppTittel";
import Feilside from "../../nav-soknad/components/feilside/Feilside";
import { getIntlTextOrKey } from "../../nav-soknad/utils/intlUtils";

class Kvittering extends React.Component<
	State & FaktumComponentProps & InjectedIntlProps,
	{}
> {
	componentDidMount() {
		scrollToTop();
	}
	render() {
		const { fakta, intl } = this.props;
		if (fakta.length === 0) {
			return (
				<Feilside
					tekst={intl.formatMessage({
						id: "kvittering.feilmelding.manglerfakta"
					})}
				/>
			);
		}
		const kommune = getFaktumVerdi(fakta, "personalia.kommune");
		const bydel = getFaktumVerdi(fakta, "personalia.bydel");
		return (
			<span>
				<AppTittel />
				<div className="kvittering skjema-content">
					<Panel>
						<Icon kind="stegindikator__hake" className="kvittering__ikon" />
						<Undertittel className="kvittering__tittel">
							{getIntlTextOrKey(intl, "kvittering.undertittel")}
						</Undertittel>
						<div className="kvittering__tekst">
							<p>
								{getIntlTextOrKey(intl, "kvittering.tekst.pre")} {" "}
								<strong>{getBosted(kommune, bydel)}</strong>
								{getIntlTextOrKey(intl, "kvittering.tekst.post")}
							</p>
						</div>
					</Panel>
				</div>
			</span>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data,
		soknad: state.soknad
	};
})(injectIntl(Kvittering));

import * as React from "react";
import { connect } from "react-redux";
import { Panel } from "nav-frontend-paneler";
import Icon from "nav-frontend-ikoner-assets";
import { Undertittel } from "nav-frontend-typografi";
import { FaktumComponentProps } from "../../nav-soknad/redux/faktaReducer";
import { State } from "../redux/reducers";
import "./kvittering.css";
import { getBosted } from "../data/kommuner";
import { getFaktumVerdi, scrollToTop } from "../../nav-soknad/utils";
import AppTittel from "../../nav-soknad/components/apptittel/AppTittel";

class Kvittering extends React.Component<State & FaktumComponentProps, {}> {
	componentDidMount() {
		scrollToTop();
	}
	render() {
		const { fakta } = this.props;
		const kommune = getFaktumVerdi(fakta, "personalia.kommune");
		const bydel = getFaktumVerdi(fakta, "personalia.bydel");
		return (
			<span>
				<AppTittel />
				<div className="kvittering skjema-content">
					<Panel>
						<Icon kind="stegindikator__hake" className="kvittering__ikon" />
						<Undertittel className="kvittering__tittel">
							Søknad om øknonomisk sosialhjelp er sendt
						</Undertittel>
						<div className="kvittering__tekst">
							<p>
								Søknaden er sendt til{" "}
								<strong>{getBosted(kommune, bydel)}</strong>, som vil være
								kontoret som behandler saken din. Søknaden er mottatt. Du vil få
								nærmere beskjed på status når søknaden er behandlet. Normal
								saksbehanldingstid er X dager.
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
})(Kvittering);

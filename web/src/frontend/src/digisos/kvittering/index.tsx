import * as React from "react";
import { connect } from "react-redux";
import { Panel } from "nav-frontend-paneler";
import Icon from "nav-frontend-ikoner-assets";
import { Undertittel } from "nav-frontend-typografi";
import {
	FaktumState,
	FaktumComponentProps,
	FaktumMap
} from "../../nav-soknad/redux/reducer";
import { SoknadState } from "../redux/soknad/types";
import "./kvittering.css";
import { getBosted } from "../data/kommuner";
import { getFaktumVerdi } from "../../nav-soknad/utils";

interface StateProps {
	fakta: FaktumMap;
	soknad: SoknadState;
}

class Kvittering extends React.Component<
	StateProps & FaktumComponentProps,
	{}
> {
	render() {
		const { fakta } = this.props;
		const kommune = getFaktumVerdi(fakta, "personalia.kommune");
		const bydel = getFaktumVerdi(fakta, "personalia.bydel");
		return (
			<div className="kvittering skjema-content">
				<Panel>
					<Icon kind="stegindikator__hake" className="kvittering__ikon" />
					<Undertittel className="kvittering__tittel">
						Søknad om øknonomisk sosialhjelp er sendt
					</Undertittel>
					<div className="kvittering__tekst">
						<p>
							Søknaden er sendt til <strong>
								{getBosted(kommune, bydel)}
							</strong>, som vil være kontoret som behandler saken din. Søknaden
							er mottatt. Du vil få nærmere beskjed på status når søknaden er
							behandlet. Normal saksbehanldingstid er X dager.
						</p>
					</div>
				</Panel>
			</div>
		);
	}
}

export default connect(
	(state: { faktumStore: FaktumState; soknad: SoknadState }, props: any) => {
		return {
			fakta: state.faktumStore.fakta,
			soknad: state.soknad
		};
	}
)(Kvittering);

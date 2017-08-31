import * as React from "react";
import { connect } from "react-redux";
import { Panel } from "nav-frontend-paneler";
import Icon from "nav-frontend-ikoner-assets";
import { Undertittel } from "nav-frontend-typografi";
<<<<<<< HEAD
import {
	FaktumState,
	FaktumComponentProps,
	FaktumMap
} from "../../skjema/reducer";
import { SoknadState } from "../../redux/soknad/types";
import "./kvittering.css";
import { getBosted } from "../data/kommuner";

interface StateProps {
	fakta: FaktumMap;
=======
import { FaktumState, FaktumComponentProps } from "../../skjema/reducer";
import { SoknadState } from "../../redux/soknad/types";
import "./kvittering.css";

interface StateProps {
	fakta: FaktumState;
>>>>>>> a03c5347ab7729950b1a7fa087dccaa7cf23a767
	soknad: SoknadState;
}

class Kvittering extends React.Component<
	StateProps & FaktumComponentProps,
	{}
> {
	render() {
		const { fakta, soknad } = this.props;
<<<<<<< HEAD
		const kommune = fakta.get("personalia.kommune");
		const bydel = fakta.get("personalia.bydel");
=======

>>>>>>> a03c5347ab7729950b1a7fa087dccaa7cf23a767
		console.log(fakta, soknad);
		return (
			<div className="kvittering">
				<Panel>
					<Icon kind="stegindikator__hake" className="kvittering__ikon" />
					<Undertittel className="kvittering__tittel">
						Søknad om øknonomisk sosialhjelp er sendt
					</Undertittel>
					<div className="kvittering__tekst">
						<p>
<<<<<<< HEAD
							Søknaden er sendt til <strong>
								{getBosted(kommune, bydel)}
							</strong>, som vil være kontoret som behandler saken din. Søknaden
							er mottatt. Du vil få nærmere beskjed på status når søknaden er
							behandlet. Normal saksbehanldingstid er X dager.
=======
							Søknaden er sendt til <strong>{"sted"}</strong>, som vil være
							kontoret som behandler saken din. Søknaden er mottatt. Du vil få
							nærmere beskjed på status når søknaden er behandlet. Normal
							saksbehanldingstid er X dager.
>>>>>>> a03c5347ab7729950b1a7fa087dccaa7cf23a767
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
<<<<<<< HEAD
			fakta: state.faktumStore.fakta,
=======
			fakta: state.faktumStore,
>>>>>>> a03c5347ab7729950b1a7fa087dccaa7cf23a767
			soknad: state.soknad
		};
	}
)(Kvittering);

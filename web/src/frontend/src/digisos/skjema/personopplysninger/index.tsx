import * as React from "react";
import { connect } from "react-redux";
import { State } from "../../redux/reducers";
import { DispatchProps, Dispatch } from "../../../nav-soknad/redux/reduxTypes";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import {
	harFaktumVerdi,
	finnFaktum,
	getPropertyVerdi,
	getFaktumVerdi
} from "../../../nav-soknad/utils";
import { lagreFaktum } from "../../../nav-soknad/redux/fakta/faktaActions";
import Personalia from "./tps/Personalia";
import Telefoninfo from "./tps/Telefoninfo";
import Bankinformasjon from "./tps/Bankinformasjon";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import {
	Faktum
} from "../../../nav-soknad/types";
import William from "../../../nav-soknad/components/svg/illustrasjoner/William";
import { InformasjonspanelIkon } from "../../../nav-soknad/components/informasjonspanel";
import { DigisosFarge } from "../../../nav-soknad/components/svg/DigisosFarger";
import Informasjonspanel from "../../../nav-soknad/components/informasjonspanel";
import { FormattedMessage } from "react-intl";
import Oppholdsadresse from "./tps/Oppholdsadresse";

interface OwnProps {
	hentVedleggsForventning?: (fakta: any) => void;
	gjenopptattSoknad: boolean;
}

export type Props = OwnProps & FaktumComponentProps & DispatchProps;

class Personopplysninger extends React.Component<Props, OwnProps> {
	render() {
		return (
			<DigisosSkjemaSteg
				steg={DigisosSteg.kontakt}
				ikon={<William/>}
			>
				{this.props.gjenopptattSoknad && (
					<div className="skjema-sporsmal">
						<Informasjonspanel
							ikon={InformasjonspanelIkon.ELLA}
							farge={DigisosFarge.NAV_ORANSJE_LIGHTEN_40}
						>
							<FormattedMessage id="applikasjon.advarsel.gjenopptatt"/>
						</Informasjonspanel>
					</div>
				)}
				<SporsmalFaktum
					faktumKey="kontakt.system.personalia"
					style="system"
				>
				<Personalia fakta={this.props.fakta} />
				</SporsmalFaktum>
				<Oppholdsadresse fakta={this.props.fakta} />
				<Telefoninfo fakta={this.props.fakta} />
				<Bankinformasjon
					fakta={this.props.fakta}
					onHarIkkeKontonummer={(verdi: string) => {
						this.oppdaterHarIkkeKontonummer(this.props.fakta, verdi, this.props.dispatch);
					}}
				/>
			</DigisosSkjemaSteg>
		);
	}

	componentDidMount() {
		if (!harFaktumVerdi(this.props.fakta, "kontakt.system.telefon")) {
			this.oppdaterFaktumVerdi(this.props.fakta, "kontakt.telefon.brukerendrettoggle", "true", this.props.dispatch);
		}
		if (!harFaktumVerdi(this.props.fakta, "kontakt.system.kontonummer")) {
			this.oppdaterFaktumVerdi(this.props.fakta, "kontakt.kontonummer.brukerendrettoggle", "true", this.props.dispatch);
		}
		if (getPropertyVerdi(this.props.fakta, "kontakt.system.adresse", "type") == null) {
			this.oppdaterFaktumVerdi(this.props.fakta, "kontakt.adresse.brukerendrettoggle", "true", this.props.dispatch);
		}

		this.oppdaterHarIkkeKontonummer(
			this.props.fakta,
			getFaktumVerdi(this.props.fakta, "kontakt.kontonummer.harikke"),
			this.props.dispatch
		);
	}

	oppdaterHarIkkeKontonummer(fakta: Faktum[], verdi: string, dispatch: Dispatch) {
		if (verdi === "true" ) {
			if (getPropertyVerdi(fakta, "kontakt.kontonummer.brukerendrettoggle", "harikke") !== "true") {
				this.oppdaterFaktumPropertyVerdi(fakta, "kontakt.kontonummer.brukerendrettoggle", "harikke", "true", dispatch);
			}
		} else {
			if (getPropertyVerdi(fakta, "kontakt.kontonummer.brukerendrettoggle", "harikke") !== "false") {
				this.oppdaterFaktumPropertyVerdi(fakta, "kontakt.kontonummer.brukerendrettoggle", "harikke", "false", dispatch);
			}
		}
	}

	private oppdaterFaktumVerdi(fakta: Faktum[], faktumKey: string, verdi: string, dispatch: Dispatch) {
		const brukerEndret = finnFaktum(faktumKey, fakta);
		brukerEndret.value = verdi;
		dispatch(
			lagreFaktum(brukerEndret)
		);
	}

	private oppdaterFaktumPropertyVerdi(
			fakta: Faktum[],
			faktumKey: string,
			propertyNavn: string,
			verdi: string,
			dispatch: Dispatch) {
		const brukerEndret = finnFaktum(faktumKey, fakta);
		brukerEndret.properties[propertyNavn] = verdi;
		dispatch(
			lagreFaktum(brukerEndret)
		);
	}
}

const mapStateToProps = (state: State) => ({
	fakta: state.fakta.data,
	gjenopptattSoknad: state.soknad.gjenopptattSoknad,

});

export default connect<{}, {}, Props>(
	mapStateToProps
)(Personopplysninger);

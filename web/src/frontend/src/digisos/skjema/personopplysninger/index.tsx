import * as React from "react";
import { connect } from "react-redux";

import { State } from "../../redux/reducers";
import { DispatchProps, Dispatch } from "../../../nav-soknad/redux/reduxTypes";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";
import TelefonFaktum from "../../../nav-soknad/faktum/typedInput/TelefonFaktum";
import { Skjema as BankinformasjonSkjema } from "./tps/Bankinformasjon";
import { FeatureToggles } from "../../../featureToggles";
import {
	radioCheckKeys,
	harFaktumVerdi,
	finnFaktum,
	getPropertyVerdi,
	getFaktumVerdi
} from "../../../nav-soknad/utils";
import { lagreFaktum } from "../../../nav-soknad/redux/fakta/faktaActions";
import Personalia from "./tps/Personalia";
import Adresseinfo from "./tps/Adresseinfo";
import Telefoninfo from "./tps/Telefoninfo";
import Bankinformasjon from "./tps/Bankinformasjon";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import {
	Faktum
} from "../../../nav-soknad/types";
import Ella from "../../../nav-soknad/components/svg/Ella";
import William from "../../../nav-soknad/components/svg/illustrasjoner/William";

interface StateProps {
	visPersonaliaFraTPSfeatureToggle: boolean;
}

interface StateProps {
	visPersonaliaFraTPSfeatureToggle: boolean;
	hentVedleggsForventning?: (fakta: any) => void;
}

export type Props = StateProps & FaktumComponentProps & DispatchProps;

class Personopplysninger extends React.Component<Props, StateProps> {
	render() {
		if (this.props.visPersonaliaFraTPSfeatureToggle) {
			return (
				<DigisosSkjemaSteg
					steg={DigisosSteg.kontakt}
					ikon={<William/>}
				>
					<SporsmalFaktum faktumKey="kontakt.system.personalia" style="system">
						<Personalia fakta={this.props.fakta} />
					</SporsmalFaktum>
					<SporsmalFaktum faktumKey="kontakt.system.kontaktinfo" style="system">
						<Adresseinfo fakta={this.props.fakta} />
					</SporsmalFaktum>
					<Telefoninfo fakta={this.props.fakta} />
					<Bankinformasjon fakta={this.props.fakta} onHarIkkeKontonummer={(verdi: string) => {
						this.oppdaterHarIkkeKontonummer(this.props.fakta, verdi, this.props.dispatch);
					}} />
				</DigisosSkjemaSteg>
			);
		}
		const statsborger = radioCheckKeys("kontakt.statsborger");
		return (
			<DigisosSkjemaSteg steg={DigisosSteg.kontakt}  ikon={<Ella visBakgrundsSirkel={true}/>}>
				<BankinformasjonSkjema fakta={this.props.fakta} onHarIkkeKontonummer={(verdi: string) => {
					this.oppdaterHarIkkeKontonummer(this.props.fakta, verdi, this.props.dispatch);
				}} />
				<SporsmalFaktum faktumKey="kontakt.telefon">
					<TelefonFaktum id="kontakt_telefon" faktumKey="kontakt.telefon" maxLength={8} />
				</SporsmalFaktum>
				<JaNeiSporsmalFaktum faktumKey={statsborger.faktum} />
			</DigisosSkjemaSteg>
		);
	}

	/* BEGIN: XXX: Bør flyttes til backend: */
	componentDidMount() {
		if (this.props.visPersonaliaFraTPSfeatureToggle) {
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
	/* END: XXX: Bør flyttes til backend. */
}

const mapStateToProps = (state: State) => ({
	visPersonaliaFraTPSfeatureToggle:
	state.featuretoggles.data[FeatureToggles.viseTpsPersonalia] === "true",
	fakta: state.fakta.data
});

export default connect<{}, {}, Props>(
	mapStateToProps
)(Personopplysninger);

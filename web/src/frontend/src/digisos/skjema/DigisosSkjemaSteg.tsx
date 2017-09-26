import * as React from "react";
import StegMedNavigasjon from "../../nav-soknad/containers/StegMedNavigasjon";
import { SkjemaConfig, SkjemaStegType } from "../../nav-soknad/soknadTypes";

export enum DigisosSteg {
	personalia = "personalia",
	arbeidbolk = "arbeidbolk",
	familiebolk = "familiebolk",
	begrunnelsebolk = "begrunnelsebolk",
	bosituasjonbolk = "bosituasjonbolk",
	inntektbolk = "inntektbolk",
	utgifterbolk = "utgifterbolk",
	ekstrainfo = "ekstrainfo",
	oppsummering = "oppsummering"
}

export const digisosSkjemaConfig: SkjemaConfig = {
	tittelId: "applikasjon.sidetittel.kortnavn",
	steg: [
		{
			key: DigisosSteg.personalia,
			stegnummer: 1,
			type: SkjemaStegType.skjema
		},
		{
			key: DigisosSteg.arbeidbolk,
			stegnummer: 2,
			type: SkjemaStegType.skjema
		},
		{
			key: DigisosSteg.familiebolk,
			stegnummer: 3,
			type: SkjemaStegType.skjema
		},
		{
			key: DigisosSteg.begrunnelsebolk,
			stegnummer: 4,
			type: SkjemaStegType.skjema
		},
		{
			key: DigisosSteg.bosituasjonbolk,
			stegnummer: 5,
			type: SkjemaStegType.skjema
		},
		{
			key: DigisosSteg.inntektbolk,
			stegnummer: 6,
			type: SkjemaStegType.skjema
		},
		{
			key: DigisosSteg.utgifterbolk,
			stegnummer: 7,
			type: SkjemaStegType.skjema
		},
		{
			key: DigisosSteg.ekstrainfo,
			stegnummer: 8,
			type: SkjemaStegType.ekstrainfo
		},
		{
			key: DigisosSteg.oppsummering,
			stegnummer: 9,
			type: SkjemaStegType.oppsummering
		}
	]
};

interface Props {
	steg: string;
}

class DigisosSkjemaSteg extends React.Component<Props, {}> {
	render() {
		return (
			<StegMedNavigasjon
				skjemaConfig={digisosSkjemaConfig}
				stegKey={this.props.steg}
			>
				{this.props.children}
			</StegMedNavigasjon>
		);
	}
}

export default DigisosSkjemaSteg;

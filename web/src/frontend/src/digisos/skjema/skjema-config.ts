import { SkjemaSteg, SkjemaStegType } from "../../nav-soknad/soknadTypes";

export const DigisosSkjemaSteg: SkjemaSteg[] = [
	{
		stegnummer: 1,
		cmskey: "personaliabolk.tittel",
		type: SkjemaStegType.skjema
	},
	{
		stegnummer: 2,
		cmskey: "arbeidbolk.tittel",
		type: SkjemaStegType.skjema
	},
	{
		stegnummer: 3,
		cmskey: "familiebolk.tittel",
		type: SkjemaStegType.skjema
	},
	{
		stegnummer: 4,
		cmskey: "begrunnelsebolk.tittel",
		type: SkjemaStegType.skjema
	},
	{
		stegnummer: 5,
		cmskey: "bosituasjonbolk.tittel",
		type: SkjemaStegType.skjema
	},
	{
		stegnummer: 6,
		cmskey: "inntektbolk.tittel",
		type: SkjemaStegType.skjema
	},
	{
		stegnummer: 7,
		cmskey: "utgifterbolk.tittel",
		type: SkjemaStegType.skjema
	},
	{
		stegnummer: 8,
		cmskey: "ekstrainfo.tittel",
		type: SkjemaStegType.ekstrainfo
	},
	{
		stegnummer: 9,
		cmskey: "oppsummering.tittel",
		type: SkjemaStegType.oppsummering
	}
];

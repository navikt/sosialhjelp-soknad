export const enum EnhetsType {
	KOMMUNE = "KOMMUNE",
	BYDEL = "BYDEL"
}

export interface NavEnhet {
	id: string;
	navn: string;
	kommuneId?: string;
	fulltNavn: string;
	type: EnhetsType;
}

export const NavEnheter: NavEnhet[] = [
	{
		id: "askoy",
		navn: "Askøy",
		kommuneId: null,
		fulltNavn: "NAV Askøy",
		type: EnhetsType.KOMMUNE
	},
	{
		id: "bergenhus",
		navn: "Bergenhus",
		kommuneId: "bergen",
		fulltNavn: "NAV Bergenhus, Bergen Kommune",
		type: EnhetsType.BYDEL
	},
	{
		id: "bergen",
		navn: "Bergen",
		fulltNavn: null,
		type: EnhetsType.KOMMUNE
	},
	{
		id: "horten",
		navn: "Horten",
		kommuneId: null,
		fulltNavn: "NAV Horten",
		type: EnhetsType.KOMMUNE
	},
	{
		id: "oslo",
		navn: "Oslo",
		kommuneId: null,
		fulltNavn: null,
		type: EnhetsType.KOMMUNE
	},
	{
		id: "ytrebygda",
		navn: "Ytrebygda",
		kommuneId: "bergen",
		fulltNavn: "NAV Ytrebygda, Bergen kommune",
		type: EnhetsType.BYDEL
	},
	{
		id: "frogner",
		navn: "Frogner",
		kommuneId: "oslo",
		fulltNavn: "NAV Frogner, Oslo kommune",
		type: EnhetsType.BYDEL
	},
	{
		id: "grorud",
		navn: "Grorud",
		kommuneId: "oslo",
		fulltNavn: "NAV Grorud, Oslo kommune",
		type: EnhetsType.BYDEL
	},
	{
		id: "grunerlokka",
		navn: "Grünerløkka",
		kommuneId: "oslo",
		fulltNavn: "NAV Grünerløkka, Oslo kommune",
		type: EnhetsType.BYDEL
	}
];

export function getNavEnhet(kommuneId: string, bydelId?: string, intl?: any): string {
	const enhet = NavEnheter.find((element: NavEnhet) => {
		return element.id === kommuneId || (bydelId && element.id === bydelId);
	});
	return enhet ? enhet.fulltNavn : null;
}

export function getKommune(kommuneId: string): string {
	const enhet = NavEnheter.find((element: NavEnhet) => {
		return element.id === kommuneId;
	});
	return enhet ? enhet.navn : null;
}

export function getBydel(kommuneId: string, bydelId: string): string {
	const enhet = NavEnheter.find(e => e.id === bydelId);
	return enhet ? enhet.navn : null;
}

export const kommuner = NavEnheter.filter(e => e.type === EnhetsType.KOMMUNE);

export function finnBydeler(kommuneId: string): NavEnhet[] {
	return NavEnheter.filter(e => e.type === EnhetsType.BYDEL && e.kommuneId === kommuneId);
}

export const bydeler = NavEnheter.filter(e => e.type === EnhetsType.BYDEL);

export const Horten = NavEnheter.find(k => k.id === "horten");

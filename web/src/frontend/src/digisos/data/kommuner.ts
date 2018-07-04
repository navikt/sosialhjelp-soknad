import { Faktum } from "../../nav-soknad/types/navSoknadTypes";
import { finnFaktum } from "../../nav-soknad/utils/faktumUtils";

const enum EnhetsType {
	KOMMUNE = "KOMMUNE",
	BYDEL = "BYDEL"
}

interface NavEnhet {
	id: string;
	orgnr: string;
	navn: string;
	kommuneId?: string;
	fulltNavn: string;
	type: EnhetsType;
	features: any;
}

function getNavEnhet(kommuneId: string, navEnheter: NavEnhet[], bydelId?: string, intl?: any ): string {
	const enhet = navEnheter.find((element: NavEnhet) => {
		return element.id === kommuneId || (bydelId && element.id === bydelId);
	});
	return enhet ? enhet.fulltNavn : null;
}

function getKommune(kommuneId: string, navEnheter: NavEnhet[]): string {
	const enhet = navEnheter.find((element: NavEnhet) => {
		return element.id === kommuneId;
	});
	return enhet ? enhet.navn : null;
}

function getBydel(kommuneId: string, bydelId: string, navEnheter: NavEnhet[]): string {
	const enhet = navEnheter.find(e => e.id === bydelId);
	return enhet ? enhet.navn : null;
}

function alleKommuner(navEnheter: NavEnhet[]): NavEnhet[] {
	return navEnheter ? navEnheter.filter((e: NavEnhet) => e.type === EnhetsType.KOMMUNE) : [];
}

function finnBydeler(kommuneId: string, navEnheter: NavEnhet[]): NavEnhet[] {
	return navEnheter.filter(e => e.type === EnhetsType.BYDEL && e.kommuneId === kommuneId);
}

function bydeler(navEnheter: NavEnhet[]) {
	return navEnheter.filter(e => e.type === EnhetsType.BYDEL);
}

function getNavEnhetMedOrgnr(navEnheter: NavEnhet[], orgnr: string): NavEnhet {
	return navEnheter.find((e: NavEnhet) => e.orgnr === orgnr);
}

function finnValgtEnhetsNavn(fakta: Faktum[], navEnheter:  NavEnhet[]) {
	const kommune: Faktum = finnFaktum("personalia.kommune", fakta);

	if (kommune) {
		const kommunenavn = getKommune(kommune.value, navEnheter);
		const bydel: Faktum = finnFaktum("personalia.bydel", fakta);
		if (bydel && bydel.value && bydel.value !== "") {
			return "NAV " +  getBydel(kommune.value, bydel.value, navEnheter) + ", " + kommunenavn + " kommune";
		} else {
			return "NAV " + kommunenavn + ", " + kommunenavn + " kommune";
		}
	}
	return null;
}

const Horten: NavEnhet = 	{
	id: "horten",
	orgnr: null,
	navn: "Horten",
	kommuneId: null,
	fulltNavn: "NAV Horten",
	type: EnhetsType.KOMMUNE,
	features: {}
};

export {
	EnhetsType,
	NavEnhet,
	getKommune,
	getNavEnhet,
	getNavEnhetMedOrgnr,
	getBydel,
	finnBydeler,
	alleKommuner,
	bydeler,
	finnValgtEnhetsNavn,
	Horten
};

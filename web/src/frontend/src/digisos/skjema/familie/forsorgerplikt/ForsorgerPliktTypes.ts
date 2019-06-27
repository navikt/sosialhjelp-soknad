import { Navn } from "../sivilstatus/FamilieTypes";

export interface Barn {
	barn: {
		navn: Navn;
		fodselsdato: string;
		personnummer: string;
		fodselsnummer: string;
	},
	harDiskresjonskode: boolean;
	borSammenMed: null | boolean;
	erFolkeregistrertSammen: boolean;
	harDeltBosted: boolean;
	samvarsgrad: null | number;
}

export interface ForsorgerPlikt {
	harForsorgerplikt: boolean;
	barnebidrag: string | null;
	ansvar: Barn[];
}

export interface Barnebidrag {
	barnebidrag: string;
}

export const initialForsorgerPlikt: ForsorgerPlikt = {
	harForsorgerplikt: false,
	barnebidrag: null,
	ansvar: []
};

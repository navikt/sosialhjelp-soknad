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

function finnValgtEnhetsNavn(fakta: Faktum[]): string {
	const KOMMUNENAVN = "kommunenavn";
	const ENHETSNAVN = "enhetsnavn";

	const soknadsmottakerFaktum: Faktum = finnFaktum("soknadsmottaker", fakta);
	if (soknadsmottakerFaktum && soknadsmottakerFaktum.properties &&
		soknadsmottakerFaktum.properties[ENHETSNAVN] && soknadsmottakerFaktum.properties[KOMMUNENAVN]) {
		return soknadsmottakerFaktum.properties[ENHETSNAVN] +
			", "  + soknadsmottakerFaktum.properties[KOMMUNENAVN] + " kommune";
	}
	return "";
}

export {
	EnhetsType,
	NavEnhet,
	finnValgtEnhetsNavn
};

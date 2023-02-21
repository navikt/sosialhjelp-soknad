import {
    InputType,
    Opplysning,
    OpplysningBackend,
    OpplysningerBackend,
    VedleggGruppe,
    OpplysningRad,
    OpplysningSpc,
    OpplysningType,
} from "./opplysningerTypes";
import {opplysningsRekkefolgeOgSpc} from "./opplysningerConfig";
import {logError} from "../../../nav-soknad/utils/loggerUtils";

export function getOpplysningerUrl(behandlingsId: string) {
    return `soknader/${behandlingsId}/okonomiskeOpplysninger`;
}

export const updateSortertOpplysning = (opplysninger: Opplysning[], opplysningUpdated: Opplysning) => {
    const index = opplysninger.findIndex((o) => o.type === opplysningUpdated.type);
    opplysninger[index] = opplysningUpdated;
    return opplysninger;
};

export const transformToBackendOpplysning = (opplysning: Opplysning): OpplysningBackend => {
    return {
        type: opplysning.type,
        gruppe: opplysning.gruppe ? opplysning.gruppe : VedleggGruppe.UKJENT,
        rader: opplysning.rader,
        vedleggStatus: opplysning.vedleggStatus,
        filer: opplysning.filer,
    };
};

export const Gruppetittel: Record<VedleggGruppe, string> = {
    statsborgerskap: "opplysninger.statsborgerskap",
    arbeid: "opplysninger.arbeid",
    familie: "opplysninger.familiesituasjon",
    bosituasjon: "opplysninger.bosituasjon",
    inntekt: "opplysninger.inntekt",
    utgifter: "opplysninger.utgifter",
    "generelle vedlegg": "opplysninger.generell",
    "andre utgifter": "opplysninger.ekstrainfo",
    ukjent: "opplysninger.ukjent",
};

export const getTomVedleggRad: () => OpplysningRad = () => {
    return {
        beskrivelse: "",
        belop: "",
        brutto: "",
        netto: "",
        avdrag: "",
        renter: "",
    };
};

export const getOpplysningByOpplysningType = (opplysningerSortert: Opplysning[], opplysningType: OpplysningType) => {
    return opplysningerSortert.find((o: Opplysning) => {
        return o.type && o.type === opplysningType;
    });
};

export const getSortertListeAvOpplysninger = (backendData: OpplysningerBackend): Opplysning[] => {
    const {okonomiskeOpplysninger, slettedeVedlegg} = backendData;
    const opplysningerAktive: Opplysning[] = okonomiskeOpplysninger.map((opplysningBackend: OpplysningBackend) => {
        return backendOpplysningToOpplysning(opplysningBackend, false);
    });

    const opplysningerSlettede: Opplysning[] = slettedeVedlegg.map((opplysningBackend: OpplysningBackend) => {
        return backendOpplysningToOpplysning(opplysningBackend, true);
    });
    const alleOpplysninger: Opplysning[] = opplysningerAktive.concat(opplysningerSlettede);
    const opplysningerSortert: MaybeOpplysning[] = sorterOpplysninger(alleOpplysninger, opplysningsRekkefolgeOgSpc);
    return filterOutNullValuesFromList(opplysningerSortert);
};

const filterOutNullValuesFromList = (list: MaybeOpplysning[]): Opplysning[] => {
    const listUtenNulls: Opplysning[] = [];

    list.forEach((maybeOpplysning: MaybeOpplysning) => {
        if (maybeOpplysning) {
            listUtenNulls.push(maybeOpplysning);
        }
    });

    return listUtenNulls;
};

export const getSpcForOpplysning = (opplysningType: OpplysningType): OpplysningSpc | undefined => {
    const opplysningSpcs = opplysningsRekkefolgeOgSpc.filter((oSpc: OpplysningSpc) => {
        return oSpc.type === opplysningType;
    });

    if (opplysningSpcs && opplysningSpcs.length === 0) {
        logError(`Spc ikke funnet for opplysning med type: "${opplysningType}"`, "opplysningerUtils.ts");
    }

    return opplysningSpcs[0];
};

const backendOpplysningToOpplysning = (opplysningBackend: OpplysningBackend, erSlettet: boolean): Opplysning => {
    const spc: OpplysningSpc | undefined = getSpcForOpplysning(opplysningBackend.type);

    let radInnhold_: InputType[] = [];
    if (spc) {
        radInnhold_ = spc.radInnhold;
    }

    return {
        type: opplysningBackend.type,
        gruppe: opplysningBackend.gruppe,
        rader: opplysningBackend.rader,
        vedleggStatus: opplysningBackend.vedleggStatus,
        filer: opplysningBackend.filer,
        slettet: erSlettet,
        radInnhold: radInnhold_,
        pendingLasterOppFil: false,
    };
};

type MaybeOpplysning = Opplysning | null;

function sorterOpplysninger(usortertListe: Opplysning[], rekkefolge: OpplysningSpc[]): MaybeOpplysning[] {
    const sortert: MaybeOpplysning[] = [];
    sortert.fill(null, 0, rekkefolge.length - 1);

    for (const opplysning of usortertListe) {
        let erPlassertISortertListe = false;
        let n = 0;
        while (!erPlassertISortertListe) {
            if (n > rekkefolge.length - 1) {
                erPlassertISortertListe = true;
                logError(
                    `Ukjent okonomisk opplysning oppdaget. Okonomisk opplysning med type "${opplysning.type}" mottatt fra backend`,
                    "opplysningerUtils.ts"
                );
            } else if (opplysning.type === rekkefolge[n].type) {
                sortert[n] = opplysning;
                erPlassertISortertListe = true;
            }
            n += 1;
        }
    }
    return sortert;
}

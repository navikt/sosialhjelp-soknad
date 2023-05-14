import {Opplysning, OpplysningSpc, VedleggGruppe} from "./opplysningerTypes";
import {opplysningsRekkefolgeOgSpc} from "./opplysningerConfig";
import {logError} from "../../../nav-soknad/utils/loggerUtils";
import {VedleggFrontend, VedleggFrontends, VedleggFrontendType, VedleggRadFrontend} from "../../../generated/model";

export const getOpplysningerUrl = (behandlingsId: string) => `soknader/${behandlingsId}/okonomiskeOpplysninger`;

export const updateSortertOpplysning = (opplysninger: VedleggFrontend[], opplysningUpdated: VedleggFrontend) => {
    const index = opplysninger.findIndex((o) => o.type === opplysningUpdated.type);
    opplysninger[index] = opplysningUpdated;
    return opplysninger;
};

export const transformToBackendOpplysning = ({
    type,
    gruppe,
    rader,
    vedleggStatus,
    filer,
}: VedleggFrontend): VedleggFrontend => ({
    type,
    gruppe,
    rader,
    vedleggStatus,
    filer,
});

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

export const getOpplysningByType = (opplysningerSortert: Opplysning[], opplysningType: VedleggFrontendType) => {
    return opplysningerSortert.find((o: Opplysning) => {
        return o.type && o.type === opplysningType;
    });
};

export const getSortertListeAvOpplysninger = (backendData: VedleggFrontends): Opplysning[] => {
    const {okonomiskeOpplysninger, slettedeVedlegg} = backendData;
    const opplysningerAktive =
        okonomiskeOpplysninger?.map((opplysningBackend) => opplysningFrontend(opplysningBackend, false)) ?? [];

    const opplysningerSlettede =
        slettedeVedlegg?.map((opplysningBackend) => opplysningFrontend(opplysningBackend, true)) ?? [];
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

export const getSpcForOpplysning = (opplysningType: VedleggFrontendType) => {
    const opplysningSpcs = opplysningsRekkefolgeOgSpc.find(({type}) => type === opplysningType);

    if (!opplysningSpcs) logError(`Spc ikke funnet for opplysning med type: "${opplysningType}"`);

    return opplysningSpcs;
};

const opplysningFrontend = (opplysningBackend: VedleggFrontend, erSlettet: boolean): Opplysning => {
    const spc = getSpcForOpplysning(opplysningBackend.type);

    return {
        type: opplysningBackend.type,
        gruppe: opplysningBackend.gruppe,
        rader: opplysningBackend.rader,
        vedleggStatus: opplysningBackend.vedleggStatus,
        filer: opplysningBackend.filer,
        slettet: erSlettet,
        radInnhold: spc?.radInnhold ?? [],
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
                    `Ukjent okonomisk opplysning oppdaget. Okonomisk opplysning med type "${opplysning.type}" mottatt fra backend`
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

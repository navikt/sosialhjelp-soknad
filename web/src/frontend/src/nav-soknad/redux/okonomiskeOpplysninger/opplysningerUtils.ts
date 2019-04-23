import {
    MaybeOpplysning,
    OpplysningerBackend,
    OpplysningBackend,
    Opplysning,
    OpplysningGruppe,
    OpplysningRad,
    OpplysningType,
    OpplysningSpc
} from "./opplysningerTypes";
import {opplysningsRekkefolgeOgSpc} from "./opplysningerConfig";


export function getOpplysningerUrl(behandlingsId: string) {
    return (
        `soknader/${behandlingsId}/okonomiskeOpplysninger`
    )
}

export const updateSortertOpplysning = (opplysninger: Opplysning[], opplysningUpdated: Opplysning) => {
    return opplysninger.map((o) => {
        return o.type === opplysningUpdated.type ? opplysningUpdated : o;
    })
};

export const transformToBackendOpplysning = (opplysning: Opplysning): OpplysningBackend => {
    return {
        type: opplysning.type,
        gruppe: opplysning.gruppe,
        rader: opplysning.rader,
        vedleggStatus: opplysning.vedleggStatus,
        filer: opplysning.filer
    };
};


// TEKST RELATERT
export const getGruppeTittelKey: (opplysningGruppe: OpplysningGruppe) => string = (opplysningGruppe: OpplysningGruppe) => {
    switch (opplysningGruppe) {
        case OpplysningGruppe.ARBEID: {
            return "opplysninger.arbeid"
        }
        case OpplysningGruppe.FAMILIE: {
            return "opplysninger.familiesituasjon"
        }
        case OpplysningGruppe.BOSITUASJON: {
            return "opplysninger.bosituasjon"
        }
        case OpplysningGruppe.INNTEKT: {
            return "opplysninger.inntekt"
        }
        case OpplysningGruppe.UTGIFTER: {
            return "opplysninger.utgifter"
        }
        case OpplysningGruppe.GENERELLE_VEDLEGG: {
            return "opplysninger.generell"
        }
        case OpplysningGruppe.ANDRE_UTGIFTER: {
            return "opplysninger.ekstrainfo"
        }
        case OpplysningGruppe.UKJENT: {
            return "opplysninger.ukjent"
        }
        default: {
            return "unknown group tittle"
        }
    }
};


export const getTomVedleggRad: () => OpplysningRad = () => {
    return {
        "beskrivelse": null,
        "belop": null,
        "brutto": null,
        "netto": null,
        "avdrag": null,
        "renter": null
    }
};

export const getOpplysningByOpplysningType = (opplysningerSortert: Opplysning[], opplysningType: OpplysningType) => {
    return opplysningerSortert.find((o: Opplysning) => {
        return o.type && o.type === opplysningType;
    });
};

export const getSortertListeAvOpplysninger = (backendData: OpplysningerBackend): Opplysning[] => {

    const {okonomiskeOpplysninger, slettedeVedlegg} = backendData;
    const opplysningerAktive: Opplysning[] = okonomiskeOpplysninger.map((opplysningBackend: OpplysningBackend) => {
        return backendOpplysningToOpplysning(opplysningBackend, false)
    });

    const opplysningerSlettede: Opplysning[] = slettedeVedlegg.map((opplysningBackend: OpplysningBackend) => {
        return backendOpplysningToOpplysning(opplysningBackend, true)
    });

    const alleOpplysninger: Opplysning[] = opplysningerAktive.concat(opplysningerSlettede);

    return sorterOpplysninger(alleOpplysninger, opplysningsRekkefolgeOgSpc)
        .filter((o: Opplysning) => o !== null);
};

export const getSpcForOpplysning = (opplysningType: OpplysningType) => {
    const opplysningSpcs = opplysningsRekkefolgeOgSpc.filter((oSpc: OpplysningSpc) => {
        return oSpc.type === opplysningType;
    });
    return opplysningSpcs[0];
};

const backendOpplysningToOpplysning = (opplysningBackend: OpplysningBackend, erSlettet: boolean): Opplysning => {
    return {
        "type": opplysningBackend.type,
        "gruppe": opplysningBackend.gruppe,
        "rader": opplysningBackend.rader,
        "vedleggStatus": opplysningBackend.vedleggStatus,
        "filer": opplysningBackend.filer,
        "slettet": erSlettet,
        "radInnhold": getSpcForOpplysning(opplysningBackend.type).radInnhold,
        "pendingLasterOppFil": false
    }
};

function sorterOpplysninger(usortertListe: Opplysning[], rekkefolge: OpplysningSpc[]) {

    const sortert: MaybeOpplysning[] = [];
    sortert.fill(null, 0, rekkefolge.length - 1);

    for (const opplysning of usortertListe) {
        let erPlassertISortertListe = false;
        let n = 0;
        while (erPlassertISortertListe === false) {
            if (n > rekkefolge.length - 1) {
                console.error("Opplysningen mangler i typeoversikten: ");
                console.warn(opplysning);
                erPlassertISortertListe = true;
            } else if (opplysning.type === rekkefolge[n].type) {
                sortert[n] = opplysning;
                erPlassertISortertListe = true;
            }
            n += 1;
        }
    }
    return sortert;
}

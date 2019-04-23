import {
    MaybeOpplysning,
    OkonomiskeOpplysningerBackend,
    OkonomiskOpplysningBackend,
    Opplysning,
    OpplysningGruppe,
    OpplysningRad,
    OpplysningType,
    OpplysningSpc
} from "./opplysningerTypes";
import {opplysningsRekkefolgeOgSpc} from "./opplysningerConfig";


export function getOkonomomiskeOpplysningerUrl(behandlingsId: string) {
    return (
        `soknader/${behandlingsId}/okonomiskeOpplysninger`
    )
}

export const updateSortertOpplysning = (opplysninger: Opplysning[], opplysningUpdated: Opplysning) => {
    return opplysninger.map((o) => {
        return o.type === opplysningUpdated.type ? opplysningUpdated : o;
    })
};

export const transformToBackendOpplysning = (okonomiskOpplysning: Opplysning): OkonomiskOpplysningBackend => {
    return {
        type: okonomiskOpplysning.type,
        gruppe: okonomiskOpplysning.gruppe,
        rader: okonomiskOpplysning.rader,
        vedleggStatus: okonomiskOpplysning.vedleggStatus,
        filer: okonomiskOpplysning.filer
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

export const getSortertListeAvOpplysninger = (backendData: OkonomiskeOpplysningerBackend): Opplysning[] => {

    const {okonomiskeOpplysninger, slettedeVedlegg} = backendData;
    const okonomiskeOpplysningerAktive: Opplysning[] = okonomiskeOpplysninger.map((okonomiskOpplysningBackend: OkonomiskOpplysningBackend) => {
        return backendOpplysningToOpplysning(okonomiskOpplysningBackend, false)
    });

    const okonomiskeOpplysningerSlettede: Opplysning[] = slettedeVedlegg.map((okonomiskOpplysningBackend: OkonomiskOpplysningBackend) => {
        return backendOpplysningToOpplysning(okonomiskOpplysningBackend, true)
    });

    const alleOpplysninger: Opplysning[] = okonomiskeOpplysningerAktive.concat(okonomiskeOpplysningerSlettede);

    return sorterOpplysninger(alleOpplysninger, opplysningsRekkefolgeOgSpc)
        .filter((o: Opplysning) => o !== null);
};

export const getSpcForOpplysning = (opplysningType: OpplysningType) => {
    const opplysningSpcs = opplysningsRekkefolgeOgSpc.filter((oSpc: OpplysningSpc) => {
        return oSpc.type === opplysningType;
    });
    return opplysningSpcs[0];
};

const backendOpplysningToOpplysning = (opplysningBackend: OkonomiskOpplysningBackend, erSlettet: boolean): Opplysning => {
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

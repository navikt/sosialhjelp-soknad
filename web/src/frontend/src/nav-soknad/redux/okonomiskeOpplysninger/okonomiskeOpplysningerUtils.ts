import {
    MaybeOpplysning,
    OkonomiskeOpplysningerBackend,
    OkonomiskOpplysningBackend,
    Opplysning,
    OpplysningGruppe,
    OpplysningRad,
    OpplysningType,
    RadType
} from "./okonomiskeOpplysningerTypes";
import {opplysningsRekkefolge} from "./opplysningerConfig";


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

export function getRadType(type: OpplysningType){
    switch (type) {
        case OpplysningType.LONNSLIPP_ARBEID : {
            return RadType.RADER_MED_BRUTTO_OG_NETTO;
        }
        case OpplysningType.SLUTTOPPGJOR_ARBEID : {
            return RadType.RADER_MED_BELOP;
        }
        case OpplysningType.STUDENT_VEDTAK : {
            return RadType.RAD_MED_BELOP;
        }
        case OpplysningType.BARNEBIDRAG_BETALER : {
            return RadType.RAD_MED_BELOP;
        }
        case OpplysningType.BARNEBIDRAG_MOTTAR : {
            return RadType.RAD_MED_BELOP;
        }
        case OpplysningType.SAMVARSAVTALE_BARN : {
            return RadType.NOTHING;
        }
        case OpplysningType.HUSLEIEKONTRAKT_HUSLEIEKONTRAKT : {
            return RadType.NOTHING;
        }
        case OpplysningType.HUSLEIEKONTRAKT_KOMMUNAL : {
            return RadType.NOTHING;
        }
        case OpplysningType.BOSTOTTE_VEDTAK : {
            return RadType.RAD_MED_BELOP;
        }
        case OpplysningType.KONTOOVERSIKT_BRUKSKONTO : {
            return RadType.RADER_MED_BELOP;
        }
        case OpplysningType.KONTOOVERSIKT_BSU : {
            return RadType.RADER_MED_BELOP;
        }
        case OpplysningType.KONTOOVERSIKT_SPAREKONTO : {
            return RadType.RADER_MED_BELOP;
        }
        case OpplysningType.KONTOOVERSIKT_LIVSFORSIKRING : {
            return RadType.RADER_MED_BELOP;
        }
        case OpplysningType.KONTOOVERSIKT_AKSJER : {
            return RadType.RADER_MED_BELOP;
        }
        case OpplysningType.KONTOOVERSIKT_ANNET : {
            return RadType.RADER_MED_BELOP;
        }
        case OpplysningType.DOKUMENTASJON_UTBYTTE : {
            return RadType.RADER_MED_BELOP;
        }
        case OpplysningType.SALGSOPPGJOR_EIENDOM : {
            return RadType.RADER_MED_BELOP;
        }
        case OpplysningType.DOKUMENTASJON_FORSIKRINGSUTBETALING : {
            return RadType.RADER_MED_BELOP;
        }
        case OpplysningType.DOKUMENTASJON_ANNETINNTEKTER : {
            return RadType.RADER_MED_BELOP;
        }
        case OpplysningType.FAKTURA_HUSLEIE : {
            return RadType.RAD_MED_BELOP;
        }
        case OpplysningType.FAKTURA_STROM : {
            return RadType.RAD_MED_BELOP;
        }
        case OpplysningType.FAKTURA_KOMMUNALEAVGIFTER : {
            return RadType.RAD_MED_BELOP;
        }
        case OpplysningType.FAKTURA_OPPVARMING : {
            return RadType.RAD_MED_BELOP;
        }
        case OpplysningType.NEDBETALINGSPLAN_AVDRAGLAAN : {
            return RadType.RADER_MED_AVDRAG_OG_RENTER;
        }
        case OpplysningType.DOKUMENTASJON_ANNETBOUTGIFT : {
            return RadType.RADER_MED_BESKRIVELSE_OG_BELOP;
        }
        case OpplysningType.FAKTURA_FRITIDSAKTIVITET : {
            return RadType.RADER_MED_BESKRIVELSE_OG_BELOP;
        }
        case OpplysningType.FAKTURA_BARNEHAGE : {
            return RadType.RADER_MED_BELOP;
        }
        case OpplysningType.FAKTURA_SFO : {
            return RadType.RADER_MED_BELOP;
        }
        case OpplysningType.FAKTURA_TANNBEHANDLING : {
            return RadType.RADER_MED_BELOP;
        }
        case OpplysningType.FAKTURA_ANNETBARNUTGIFT : {
            return RadType.RADER_MED_BESKRIVELSE_OG_BELOP;
        }
        case OpplysningType.SKATTEMELDING_SKATTEMELDING : {
            return RadType.NOTHING;
        }
        case OpplysningType.ANNET_ANNET : {
            return RadType.RADER_MED_BESKRIVELSE_OG_BELOP;
        }
        default : {
            return RadType.NOTHING
        }
    }
}

// TEKST RELATERT
export const getGruppeTittelKey: (opplysningGruppe: OpplysningGruppe) => string = (opplysningGruppe: OpplysningGruppe) => {
    switch(opplysningGruppe) {
        case OpplysningGruppe.ARBEID: {return "opplysninger.arbeid"}
        case OpplysningGruppe.FAMILIE: {return "opplysninger.familiesituasjon"}
        case OpplysningGruppe.BOSITUASJON: {return "opplysninger.bosituasjon"}
        case OpplysningGruppe.INNTEKT: {return "opplysninger.inntekt"}
        case OpplysningGruppe.UTGIFTER: {return "opplysninger.utgifter"}
        case OpplysningGruppe.GENERELLE_VEDLEGG: {return "opplysninger.generell"}
        case OpplysningGruppe.ANDRE_UTGIFTER: {return "opplysninger.ekstrainfo"}
        case OpplysningGruppe.UKJENT: {return "opplysninger.ukjent"}
        default: {return "unknown group tittle"}
    }
};

export const getKeyForOpplysningType: (type: string) => string = (type: string) => {
    return typeToTextKeyMap[type] ? typeToTextKeyMap[type] : "unknown type";
};

const typeToTextKeyMap = {
    "lonnslipp|arbeid" : "opplysninger.arbeid.jobb",
    "sluttoppgjor|arbeid" : "opplysninger.arbeid.avsluttet",
    "student|vedtak" : "opplysninger.arbeid.student",
    "barnebidrag|betaler" : "opplysninger.familiesituasjon.barnebidrag.betaler",
    "barnebidrag|mottar" : "opplysninger.familiesituasjon.barnebidrag.mottar",
    "samvarsavtale|barn" : "opplysninger.familiesituasjon.barn.samvarsavtale",
    "husleiekontrakt|husleiekontrakt" : "",
    "husleiekontrakt|kommunal" : "opplysninger.bosituasjon.kommunal",
    "bostotte|vedtak" : "opplysninger.inntekt.bostotte",
    "kontooversikt|brukskonto" : "opplysninger.inntekt.bankinnskudd.brukskonto",
    "kontooversikt|bsu" : "opplysninger.inntekt.bankinnskudd.bsu",
    "kontooversikt|sparekonto" : "opplysninger.inntekt.bankinnskudd.sparekonto",
    "kontooversikt|livsforsikring" : "opplysninger.inntekt.bankinnskudd.livsforsikring",
    "kontooversikt|aksjer" : "opplysninger.inntekt.bankinnskudd.aksjer",
    "kontooversikt|annet" : "opplysninger.inntekt.bankinnskudd.annet",
    "dokumentasjon|utbytte" : "opplysninger.inntekt.inntekter.utbytte",
    "salgsoppgjor|eiendom" : "opplysninger.inntekt.inntekter.salg",
    "dokumentasjon|forsikringsutbetaling" : "opplysninger.inntekt.inntekter.forsikringsutbetalinger",
    "dokumentasjon|annetinntekter" : "opplysninger.inntekt.inntekter.annet",
    "faktura|husleie" : "opplysninger.utgifter.boutgift.husleie",
    "faktura|strom" : "opplysninger.utgifter.boutgift.strom",
    "faktura|kommunaleavgifter" : "opplysninger.utgifter.boutgift.kommunaleavgifter",
    "faktura|oppvarming" : "opplysninger.utgifter.boutgift.oppvarming",
    "nedbetalingsplan|avdraglaan" : "opplysninger.utgifter.boutgift.avdraglaan",
    "dokumentasjon|annetboutgift" : "opplysninger.utgifter.boutgift.andreutgifter",
    "faktura|fritidsaktivitet" : "opplysninger.utgifter.barn.fritidsaktivitet",
    "faktura|barnehage" : "opplysninger.utgifter.barn.barnehage",
    "faktura|sfo" : "opplysninger.utgifter.barn.sfo",
    "faktura|tannbehandling" : "opplysninger.utgifter.barn.tannbehandling",
    "faktura|annetbarnutgift" : "opplysninger.utgifter.barn.annet",
    "skattemelding|skattemelding" : "opplysninger.generell.skattemelding",
    "annet|annet" : "opplysninger.ekstrainfo.utgifter"
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

export const getSortertListeAvMaybeOpplysning = (backendData: OkonomiskeOpplysningerBackend): Opplysning[] => {

    const { okonomiskeOpplysninger, slettedeVedlegg } = backendData;
    const okonomiskeOpplysningerAktive: Opplysning[] = okonomiskeOpplysninger.map((okonomiskOpplysningBackend: OkonomiskOpplysningBackend) => {
        return backendOpplysningToOpplysning(okonomiskOpplysningBackend, false)
    });

    const okonomiskeOpplysningerSlettede: Opplysning[] = slettedeVedlegg.map((okonomiskOpplysningBackend: OkonomiskOpplysningBackend) => {
        return backendOpplysningToOpplysning(okonomiskOpplysningBackend, true)
    });

    const alleOpplysninger: Opplysning[] = okonomiskeOpplysningerAktive.concat(okonomiskeOpplysningerSlettede);

    return sorterOpplysninger(alleOpplysninger, opplysningsRekkefolge)
        .filter((o:Opplysning) => o !== null);
};

const backendOpplysningToOpplysning = (opplysningBackend: OkonomiskOpplysningBackend, erSlettet: boolean): Opplysning => {
    return {
        "type" : opplysningBackend.type,
        "gruppe" : opplysningBackend.gruppe,
        "rader" : opplysningBackend.rader,
        "vedleggStatus": opplysningBackend.vedleggStatus,
        "filer" : opplysningBackend.filer,
        "slettet" : erSlettet,
        "radType" : getRadType(opplysningBackend.type),
        "pendingLasterOppFil" : false
    }
};

function sorterOpplysninger(usortertListe: Opplysning[], rekkefolge: string[] ){

    const sortert: MaybeOpplysning[] = [];
    sortert.fill(null, 0, rekkefolge.length - 1);

    for (const opplysning of usortertListe){
        let erPlassertISortertListe = false;
        let n = 0;
        while (erPlassertISortertListe === false){
            if (n > rekkefolge.length - 1){
                console.error("Opplysningen mangler i typeoversikten: ");
                console.warn(opplysning);
                erPlassertISortertListe = true;
            } else if (opplysning.type === rekkefolge[n]) {
                sortert[n] = opplysning;
                erPlassertISortertListe = true;
            }
            n += 1;
        }
    }
    return sortert;
}

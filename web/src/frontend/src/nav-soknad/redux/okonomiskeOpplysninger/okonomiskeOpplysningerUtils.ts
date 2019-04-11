import {
    Grupper,
    OkonomiskeOpplysningerBackend,
    OkonomiskeOpplysningerModel,
    OkonomiskOpplysningBackend,
    Opplysning,
    OpplysningGruppe,
    OpplysningRad,
    OpplysningType,
    RadType
} from "./okonomiskeOpplysningerTypes";


export function getOkonomomiskeOpplysningerUrl(behandlingsId: string) {
    return (
        `soknader/${behandlingsId}/okonomiskeOpplysninger`
    )
}






// Grupper -> Opplysning -> Grupper
export const updateOkonomiskOpplysning = (
    grupper: Grupper,
    okonomiskOpplysning: Opplysning
): Grupper => {

    switch(okonomiskOpplysning.gruppe){
        case OpplysningGruppe.ARBEID : {
            const gruppeArbeidUpdated = grupper.gruppeArbeid.map((element: Opplysning): Opplysning => {
                return element.type === okonomiskOpplysning.type ? okonomiskOpplysning : element;
            });
            grupper.gruppeArbeid = gruppeArbeidUpdated;
            return grupper;
        }
        case OpplysningGruppe.FAMILIE : {
            const gruppeFamilieUpdated = grupper.gruppeFamilie.map((element: Opplysning): Opplysning => {
                return element.type === okonomiskOpplysning.type ? okonomiskOpplysning : element;
            });
            grupper.gruppeFamilie = gruppeFamilieUpdated;
            return grupper;
        }
        case OpplysningGruppe.BOSITUASJON : {
            const gruppeBosituasjonUpdated = grupper.gruppeBosituasjon.map((element: Opplysning): Opplysning => {
                return element.type === okonomiskOpplysning.type ? okonomiskOpplysning : element;
            });
            grupper.gruppeBosituasjon = gruppeBosituasjonUpdated;
            return grupper;
        }
        case OpplysningGruppe.INNTEKT : {
            const gruppeInntekt: Opplysning[] = grupper.gruppeInntekt.map((element: Opplysning): Opplysning => {
                return element.type === okonomiskOpplysning.type ? okonomiskOpplysning : element;
            });
            grupper.gruppeInntekt = gruppeInntekt;
            return grupper;
        }
        case OpplysningGruppe.UTGIFTER : {
            const gruppeUtgifterUpdated = grupper.gruppeUtgifter.map((element: Opplysning): Opplysning => {
                return element.type === okonomiskOpplysning.type ? okonomiskOpplysning : element;
            });
            grupper.gruppeUtgifter = gruppeUtgifterUpdated;
            return grupper;
        }
        case OpplysningGruppe.GENERELLE_VEDLEGG : {
            const gruppeGenerelleVedleggUpdated = grupper.gruppeGenerelleVedlegg.map((element: Opplysning): Opplysning => {
                return element.type === okonomiskOpplysning.type ? okonomiskOpplysning : element;
            });
            grupper.gruppeGenerelleVedlegg = gruppeGenerelleVedleggUpdated;
            return grupper;
        }
        case OpplysningGruppe.ANDRE_UTGIFTER : {
            const gruppeAndreUtgifterUpdated =  grupper.gruppeAndreUtgifter.map((element: Opplysning): Opplysning => {
                return element.type === okonomiskOpplysning.type ? okonomiskOpplysning : element;
            });
            grupper.gruppeAndreUtgifter = gruppeAndreUtgifterUpdated;
            return grupper;
        }
        case OpplysningGruppe.UKJENT : {
            const gruppeUkjentUpdated = grupper.gruppeUkjent.map((element: Opplysning): Opplysning => {
                return element.type === okonomiskOpplysning.type ? okonomiskOpplysning : element;
            });
            grupper.gruppeUkjent = gruppeUkjentUpdated;
            return grupper;
        }
        default: {
            return grupper;
        }
    }
};

// Opplysning -> Grupper -> Gruppe
export const getGruppeForOkonomiskOpplysning = (okonomiskOpplysning: Opplysning, grupper: Grupper) => {
    switch(okonomiskOpplysning.gruppe){
        case OpplysningGruppe.ARBEID: { return grupper.gruppeArbeid}
        case OpplysningGruppe.FAMILIE: { return grupper.gruppeFamilie}
        case OpplysningGruppe.BOSITUASJON: { return grupper.gruppeBosituasjon}
        case OpplysningGruppe.INNTEKT: { return grupper.gruppeInntekt}
        case OpplysningGruppe.UTGIFTER: { return grupper.gruppeUtgifter}
        case OpplysningGruppe.GENERELLE_VEDLEGG: { return grupper.gruppeGenerelleVedlegg}
        case OpplysningGruppe.ANDRE_UTGIFTER: { return grupper.gruppeAndreUtgifter}
        case OpplysningGruppe.UKJENT: { return grupper.gruppeUkjent}
        default: return null;
    }
};



// OkonomiskeOpplysningerBackend -> Grupper
export const generateGrupperFromBackendData = (okonomiskeOpplysnigerBackend: OkonomiskeOpplysningerBackend): Grupper => {

    const okonomiskeOpplysningerAktive: Opplysning[] = okonomiskeOpplysnigerBackend.okonomiskeOpplysninger.map((okonomiskOpplysningBackend: OkonomiskOpplysningBackend) => {
        return {
            "type" : okonomiskOpplysningBackend.type,
            "gruppe" : okonomiskOpplysningBackend.gruppe,
            "rader" : okonomiskOpplysningBackend.rader,
            "vedleggStatus": okonomiskOpplysningBackend.vedleggStatus,
            "filer" : okonomiskOpplysningBackend.filer,
            "slettet" : false,
            "radType" : getRadType(okonomiskOpplysningBackend.type),
            "pendingLasterOppFil" : false
        }
    });

    const okonomiskeOpplysningerSlettede: Opplysning[] = okonomiskeOpplysnigerBackend.slettedeVedlegg.map((vedlegg, index, array) => {
        return {
            "type" : vedlegg.type,
            "gruppe" : vedlegg.gruppe,
            "rader" : vedlegg.rader,
            "vedleggStatus": vedlegg.vedleggStatus,
            "filer" : vedlegg.filer,
            "slettet" : true,
            "radType" : getRadType(vedlegg.type),
            "pendingLasterOppFil" : false
        }
    });

    const alleOkonomiskeOpplysninger: Opplysning[] = okonomiskeOpplysningerAktive.concat(okonomiskeOpplysningerSlettede);


    const gruppeArbeid: Opplysning[] = [];
    const gruppeFamilie: Opplysning[] = [];
    const gruppeBosituasjon: Opplysning[] = [];
    const gruppeInntekt: Opplysning[] = [];
    const gruppeUtgifter: Opplysning[] = [];
    const gruppeGenerelleVedlegg: Opplysning[] = [];
    const gruppeAndreUtgifter: Opplysning[] = [];
    const gruppeUkjent: Opplysning[] = [];


    alleOkonomiskeOpplysninger.forEach((okonomiskOpplysning: Opplysning) => {
        switch(okonomiskOpplysning.gruppe){
            case OpplysningGruppe.ARBEID:{
                gruppeArbeid.push(okonomiskOpplysning);
                break;
            }
            case OpplysningGruppe.FAMILIE:{
                gruppeFamilie.push(okonomiskOpplysning);
                break;
            }
            case OpplysningGruppe.BOSITUASJON:{
                gruppeBosituasjon.push(okonomiskOpplysning);
                break;
            }
            case OpplysningGruppe.INNTEKT:{
                gruppeInntekt.push(okonomiskOpplysning);
                break;
            }
            case OpplysningGruppe.UTGIFTER:{
                gruppeUtgifter.push(okonomiskOpplysning);
                break;
            }
            case OpplysningGruppe.GENERELLE_VEDLEGG:{
                gruppeGenerelleVedlegg.push(okonomiskOpplysning);
                break;
            }
            case OpplysningGruppe.ANDRE_UTGIFTER:{
                gruppeAndreUtgifter.push(okonomiskOpplysning);
                break;
            }
            default: {
                gruppeUkjent.push(okonomiskOpplysning);
                console.warn(`An unkown group!!! Log to kibana. Group: ${okonomiskOpplysning.gruppe}`);
                break;
            }
        }
    });

    const grupper: Grupper = {
        gruppeArbeid,
        gruppeFamilie,
        gruppeBosituasjon,
        gruppeInntekt,
        gruppeUtgifter,
        gruppeGenerelleVedlegg,
        gruppeAndreUtgifter,
        gruppeUkjent
    };

    return grupper;
};


// Opplysning -> OkonomiskOpplysningBackend
export const transformToBackendOpplysning = (okonomiskOpplysning: Opplysning): OkonomiskOpplysningBackend => {
    return {
        type: okonomiskOpplysning.type,
        gruppe: okonomiskOpplysning.gruppe,
        rader: okonomiskOpplysning.rader,
        vedleggStatus: okonomiskOpplysning.vedleggStatus,
        filer: okonomiskOpplysning.filer
    };
};

// String -> RaderStruktur
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

export const getTextKeyForVedleggType: (type: string) => string = (type: string) => {
    return vedleggTypeToTextKeyMap[type] ? vedleggTypeToTextKeyMap[type] : "unknown type";
};

const vedleggTypeToTextKeyMap = {
    "lonnslipp|arbeid" : "mangler",
    "sluttoppgjor|arbeid" : "vedlegg.sluttoppgjor.arbeid",
    "student|vedtak" : "vedlegg.student.vedtak",
    "barnebidrag|betaler" : "vedlegg.barnebidrag.betaler",
    "barnebidrag|mottar" : "vedlegg.barnebidrag.mottar",
    "samvarsavtale|barn" : "vedlegg.samvarsavtale.barn",
    "husleiekontrakt|husleiekontrakt" : "mangler",
    "husleiekontrakt|kommunal" : "vedlegg.husleiekontrakt.kommunal",
    "bostotte|vedtak" : "vedlegg.bostotte.vedtak",
    "kontooversikt|brukskonto" : "vedlegg.kontooversikt.brukskonto",
    "kontooversikt|bsu" : "vedlegg.kontooversikt.bsu",
    "kontooversikt|sparekonto" : "vedlegg.kontooversikt.sparekonto",
    "kontooversikt|livsforsikring" : "vedlegg.kontooversikt.livsforsikring",
    "kontooversikt|aksjer" : "vedlegg.kontooversikt.aksjer",
    "kontooversikt|annet" : "vedlegg.kontooversikt.annet",
    "dokumentasjon|utbytte" : "vedlegg.dokumentasjon.utbytte",
    "salgsoppgjor|eiendom" : "vedlegg.salgsoppgjor.eiendom",
    "dokumentasjon|forsikringsutbetaling" : "vedlegg.dokumentasjon.forsikringsutbetaling",
    "dokumentasjon|annetinntekter" : "vedlegg.dokumentasjon.annetinntekter",
    "faktura|husleie" : "vedlegg.faktura.husleie",
    "faktura|strom" : "vedlegg.faktura.strom",
    "faktura|kommunaleavgifter" : "vedlegg.faktura.kommunaleavgifter",
    "faktura|oppvarming" : "vedlegg.faktura.oppvarming",
    "nedbetalingsplan|avdraglaan" : "vedlegg.nedbetalingsplan.avdraglaan",
    "dokumentasjon|annetboutgift" : "vedlegg.dokumentasjon.annetboutgift",
    "faktura|fritidsaktivitet" : "vedlegg.faktura.fritidsaktivitet",
    "faktura|barnehage" : "vedlegg.faktura.barnehage",
    "faktura|sfo" : "vedlegg.faktura.sfo",
    "faktura|tannbehandling" : "vedlegg.faktura.tannbehandling",
    "faktura|annetbarnutgift" : "vedlegg.faktura.annetbarnutgift",
    "skattemelding|skattemelding" : "vedlegg.skattemelding.skattemelding",
    "annet|annet" : "vedlegg.annet.annet"
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


export const getOpplysningByOpplysningTypeAndGruppe = (
        state: OkonomiskeOpplysningerModel,
        opplysningType: OpplysningType,
        opplysningGruppe: OpplysningGruppe
): Opplysning => {

    switch (opplysningGruppe) {

        case OpplysningGruppe.ARBEID: {return state.grupper.gruppeArbeid.find((o) => o.type === opplysningType)}
        case OpplysningGruppe.FAMILIE: {return state.grupper.gruppeFamilie.find((o) => o.type === opplysningType)}
        case OpplysningGruppe.BOSITUASJON: {return state.grupper.gruppeBosituasjon.find((o) => o.type === opplysningType)}
        case OpplysningGruppe.INNTEKT: {return state.grupper.gruppeInntekt.find((o) => o.type === opplysningType)}
        case OpplysningGruppe.UTGIFTER: {return state.grupper.gruppeUtgifter.find((o) => o.type === opplysningType)}
        case OpplysningGruppe.GENERELLE_VEDLEGG: {return state.grupper.gruppeGenerelleVedlegg.find((o) => o.type === opplysningType)}
        case OpplysningGruppe.ANDRE_UTGIFTER: {return state.grupper.gruppeAndreUtgifter.find((o) => o.type === opplysningType)}
        case OpplysningGruppe.UKJENT: {return state.grupper.gruppeUkjent.find((o) => o.type === opplysningType)}
        default: return null;
    }
};






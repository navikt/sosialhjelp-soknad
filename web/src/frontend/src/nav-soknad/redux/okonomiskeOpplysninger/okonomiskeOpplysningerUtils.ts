import {
    OpplysningGruppe,
    Grupper,
    OkonomiskeOpplysningerBackend,
    Opplysning, OkonomiskOpplysningBackend,
    RadType,
    OpplysningType, OpplysningRad
} from "./okonomiskeOpplysningerTypes";


export function getOkonomomiskeOpplysningerUrl(behandlingsId: string) {
    return (
        `soknader/${behandlingsId}/okonomiskeOpplysninger`
    )
}

// function vedleggUrl(vedleggId: string) {
//     return (
//         `/vedlegg/${vedleggId}`
//     )
// }




// Grupper -> Opplysning -> Grupper
export const updateOkonomiskOpplysning = (
    grupper: Grupper,
    okonomiskOpplysning: Opplysning
): Grupper => {

    switch(okonomiskOpplysning.gruppe){
        case OpplysningGruppe.ARBEID : {
            grupper.gruppeArbeid.map((element: Opplysning): Opplysning => {
                return element.type === okonomiskOpplysning.type ? okonomiskOpplysning : element;
            });
            return grupper;
        }
        case OpplysningGruppe.FAMILIE : {
            grupper.gruppeFamilie.map((element: Opplysning): Opplysning => {
                return element.type === okonomiskOpplysning.type ? okonomiskOpplysning : element;
            });
            return grupper;
        }
        case OpplysningGruppe.BOSITUASJON : {
            grupper.gruppeBosituasjon.map((element: Opplysning): Opplysning => {
                return element.type === okonomiskOpplysning.type ? okonomiskOpplysning : element;
            });
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
            grupper.gruppeUtgifter.map((element: Opplysning): Opplysning => {
                return element.type === okonomiskOpplysning.type ? okonomiskOpplysning : element;
            });
            return grupper;
        }
        case OpplysningGruppe.GENERELLE_VEDLEGG : {
            grupper.gruppeGenerelleVedlegg.map((element: Opplysning): Opplysning => {
                return element.type === okonomiskOpplysning.type ? okonomiskOpplysning : element;
            });
            return grupper;
        }
        case OpplysningGruppe.ANDRE_UTGIFTER : {
            grupper.gruppeAndreUtgifter.map((element: Opplysning): Opplysning => {
                return element.type === okonomiskOpplysning.type ? okonomiskOpplysning : element;
            });
            return grupper;
        }
        case OpplysningGruppe.UKJENT : {
            grupper.gruppeUkjent.map((element: Opplysning): Opplysning => {
                return element.type === okonomiskOpplysning.type ? okonomiskOpplysning : element;
            });
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

export const getTextKeyForType: (type: string) => string = (type: string) => {
    return typeToTextKeyMap[type] ? typeToTextKeyMap[type] : "unknown type";
};

const typeToTextKeyMap = {
    "lonnslipp|arbeid" : "opplysninger.arbeid.jobb",
    "sluttoppgjor|arbeid" : "opplysninger.arbeid.avsluttet",
    "student|vedtak" : "opplysninger.arbeid.student",
    "barnebidrag|betaler" : "opplysninger.familiesituasjon.barnebidrag.betaler",
    "barnebidrag|mottar" : "opplysninger.familiesituasjon.barnebidrag.mottar",
    "samvarsavtale|barn" : "",
    "husleiekontrakt|husleiekontrakt" : "",
    "husleiekontrakt|kommunal" : "opplysninger.bosituasjon.kommunal",
    "bostotte|vedtak" : "opplysninger.inntekt.bostotte.utbetaling",
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
    "faktura|strom" : "opplysninger.utgifter.boutgift.strom.sisteregning",
    "faktura|kommunaleavgifter" : "opplysninger.utgifter.boutgift.kommunaleavgifter.sisteregning",
    "faktura|oppvarming" : "opplysninger.utgifter.boutgift.oppvarming.sisteregning",
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




import {
    GruppeEnum,
    Grupper,
    OkonomiskeOpplysningerBackend,
    OkonomiskOpplysning, OkonomiskOpplysningBackend,
    RadType,
    Type
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


// Grupper -> OkonomiskOpplysning -> Grupper
export const updateOkonomiskOpplysning = (
    grupper: Grupper,
    okonomiskOpplysning: OkonomiskOpplysning
): Grupper => {

    switch(okonomiskOpplysning.gruppe){
        case GruppeEnum.ARBEID : {
            return grupper;
        }
        case GruppeEnum.FAMILIE : {
            return grupper;
        }
        case GruppeEnum.BOSITUASJON : {
            return grupper;
        }
        case GruppeEnum.INNTEKT : {
            grupper.gruppeInntekt.map((element: OkonomiskOpplysning, index: number, obj: OkonomiskOpplysning[]): OkonomiskOpplysning => {
                return element.type === okonomiskOpplysning.type ? okonomiskOpplysning : element;
            });
            return grupper;
        }
        case GruppeEnum.UTGIFTER : {
            return grupper;
        }
        case GruppeEnum.GENERELLE_VEDLEGG : {
            return grupper;
        }
        case GruppeEnum.ANDRE_UTGIFTER : {
            return grupper;
        }
        case GruppeEnum.UKJENT : {
            return grupper;
        }
        default: {
            return grupper;
        }
    }
};




// OkonomiskeOpplysningerBackend -> Grupper
export const generateGrupperFromBackendData = (okonomiskeOpplysnigerBackend: OkonomiskeOpplysningerBackend): Grupper => {

    const okonomiskeOpplysningerAktive: OkonomiskOpplysning[] = okonomiskeOpplysnigerBackend.okonomiskeOpplysninger.map((okonomiskOpplysningBackend: OkonomiskOpplysningBackend) => {
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

    const okonomiskeOpplysningerSlettede: OkonomiskOpplysning[] = okonomiskeOpplysnigerBackend.slettedeVedlegg.map((vedlegg, index, array) => {
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

    const alleOkonomiskeOpplysninger: OkonomiskOpplysning[] = okonomiskeOpplysningerAktive.concat(okonomiskeOpplysningerSlettede);



    const gruppeArbeid: OkonomiskOpplysning[] = [];
    const gruppeFamilie: OkonomiskOpplysning[] = [];
    const gruppeBosituasjon: OkonomiskOpplysning[] = [];
    const gruppeInntekt: OkonomiskOpplysning[] = [];
    const gruppeUtgifter: OkonomiskOpplysning[] = [];
    const gruppeGenerelleVedlegg: OkonomiskOpplysning[] = [];
    const gruppeAndreUtgifter: OkonomiskOpplysning[] = [];
    const gruppeUkjent: OkonomiskOpplysning[] = [];



    alleOkonomiskeOpplysninger.forEach((okonomiskOpplysning: OkonomiskOpplysning) => {
        switch(okonomiskOpplysning.gruppe){
            case GruppeEnum.ARBEID:{
                gruppeArbeid.push(okonomiskOpplysning);
                break;
            }
            case GruppeEnum.FAMILIE:{
                gruppeFamilie.push(okonomiskOpplysning);
                break;
            }
            case GruppeEnum.BOSITUASJON:{
                gruppeBosituasjon.push(okonomiskOpplysning);
                break;
            }
            case GruppeEnum.INNTEKT:{
                gruppeInntekt.push(okonomiskOpplysning);
                break;
            }
            case GruppeEnum.UTGIFTER:{
                gruppeUtgifter.push(okonomiskOpplysning);
                break;
            }
            case GruppeEnum.GENERELLE_VEDLEGG:{
                gruppeGenerelleVedlegg.push(okonomiskOpplysning);
                break;
            }
            case GruppeEnum.ANDRE_UTGIFTER:{
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


// OkonomiskOpplysning -> OkonomiskOpplysningBackend
export const transformToBackendOpplysning = (okonomiskOpplysning: OkonomiskOpplysning): OkonomiskOpplysningBackend => {
    return {
        type: okonomiskOpplysning.type,
        gruppe: okonomiskOpplysning.gruppe,
        rader: okonomiskOpplysning.rader,
        vedleggStatus: okonomiskOpplysning.vedleggStatus,
        filer: okonomiskOpplysning.filer
    };
};

// String -> RaderStruktur
export function getRadType(type: Type){
    switch (type) {
        case Type.LONNSLIPP_ARBEID : {
            return RadType.RADER_MED_BRUTTO_OG_NETTO;
        }
        case Type.SLUTTOPPGJOR_ARBEID : {
            return RadType.RADER_MED_BRUTTO_OG_NETTO;
        }
        case Type.STUDENT_VEDTAK : {
            return RadType.RAD_MED_BELOP;
        }
        case Type.BARNEBIDRAG_BETALER : {
            return RadType.RAD_MED_BELOP;
        }
        case Type.BARNEBIDRAG_MOTTAR : {
            return RadType.RAD_MED_BELOP;
        }
        case Type.SAMVARSAVTALE_BARN : {
            return RadType.NOTHING;
        }
        case Type.HUSLEIEKONTRAKT_HUSLEIEKONTRAKT : {
            return RadType.NOTHING;
        }
        case Type.HUSLEIEKONTRAKT_KOMMUNAL : {
            return RadType.NOTHING;
        }
        case Type.BOSTOTTE_VEDTAK : {
            return RadType.RAD_MED_BELOP;
        }
        case Type.KONTOOVERSIKT_BRUKSKONTO : {
            return RadType.RADER_MED_BELOP;
        }
        case Type.KONTOOVERSIKT_BSU : {
            return RadType.RADER_MED_BELOP;
        }
        case Type.KONTOOVERSIKT_SPAREKONTO : {
            return RadType.RADER_MED_BELOP;
        }
        case Type.KONTOOVERSIKT_LIVSFORSIKRING : {
            return RadType.RADER_MED_BELOP;
        }
        case Type.KONTOOVERSIKT_AKSJER : {
            return RadType.RADER_MED_BELOP;
        }
        case Type.KONTOOVERSIKT_ANNET : {
            return RadType.RADER_MED_BELOP;
        }
        case Type.DOKUMENTASJON_UTBYTTE : {
            return RadType.RADER_MED_BELOP;
        }
        case Type.SALGSOPPGJOR_EIENDOM : {
            return RadType.RADER_MED_BELOP;
        }
        case Type.DOKUMENTASJON_FORSIKRINGSUTBETALING : {
            return RadType.RADER_MED_BELOP;
        }
        case Type.DOKUMENTASJON_ANNETINNTEKTER : {
            return RadType.RADER_MED_BELOP;
        }
        case Type.FAKTURA_HUSLEIE : {
            return RadType.RAD_MED_BELOP;
        }
        case Type.FAKTURA_STROM : {
            return RadType.RAD_MED_BELOP;
        }
        case Type.FAKTURA_KOMMUNALEAVGIFTER : {
            return RadType.RAD_MED_BELOP;
        }
        case Type.FAKTURA_OPPVARMING : {
            return RadType.RAD_MED_BELOP;
        }
        case Type.NEDBETALINGSPLAN_AVDRAGLAAN : {
            return RadType.RADER_MED_AVDRAG_OG_RENTER;
        }
        case Type.DOKUMENTASJON_ANNETBOUTGIFT : {
            return RadType.RADER_MED_BESKRIVELSE_OG_BELOP;
        }
        case Type.FAKTURA_FRITIDSAKTIVITET : {
            return RadType.RADER_MED_BESKRIVELSE_OG_BELOP;
        }
        case Type.FAKTURA_BARNEHAGE : {
            return RadType.RADER_MED_BELOP;
        }
        case Type.FAKTURA_SFO : {
            return RadType.RADER_MED_BELOP;
        }
        case Type.FAKTURA_TANNBEHANDLING : {
            return RadType.RADER_MED_BELOP;
        }
        case Type.FAKTURA_ANNETBARNUTGIFT : {
            return RadType.RADER_MED_BESKRIVELSE_OG_BELOP;
        }
        case Type.SKATTEMELDING_SKATTEMELDING : {
            return RadType.NOTHING;
        }
        case Type.ANNET_ANNET : {
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
    "lonnslipp|arbeid" : "",
    "sluttoppgjor|arbeid" : "",
    "student|vedtak" : "",
    "barnebidrag|betaler" : "",
    "barnebidrag|mottar" : "",
    "samvarsavtale|barn" : "",
    "husleiekontrakt|husleiekontrakt" : "",
    "husleiekontrakt|kommunal" : "",
    "bostotte|vedtak" : "opplysninger.inntekt.bostotte.utbetaling",
    "kontooversikt|brukskonto" : "",
    "kontooversikt|bsu" : "",
    "kontooversikt|sparekonto" : "",
    "kontooversikt|livsforsikring" : "",
    "kontooversikt|aksjer" : "",
    "kontooversikt|annet" : "",
    "dokumentasjon|utbytte" : "",
    "salgsoppgjor|eiendom" : "",
    "dokumentasjon|forsikringsutbetaling" : "",
    "dokumentasjon|annetinntekter" : "",
    "faktura|husleie" : "",
    "faktura|strom" : "",
    "faktura|kommunaleavgifter" : "",
    "faktura|oppvarming" : "",
    "nedbetalingsplan|avdraglaan" : "",
    "dokumentasjon|annetboutgift" : "",
    "faktura|fritidsaktivitet" : "",
    "faktura|barnehage" : "",
    "faktura|sfo" : "",
    "faktura|tannbehandling" : "",
    "faktura|annetbarnutgift" : "",
    "skattemelding|skattemelding" : "",
    "annet|annet" : ""
};





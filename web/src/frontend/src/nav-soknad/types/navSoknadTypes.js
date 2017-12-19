"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DelstegStatus;
(function (DelstegStatus) {
    DelstegStatus["OPPRETTET"] = "OPPRETTET";
    DelstegStatus["UTFYLLING"] = "UTFYLLING";
    DelstegStatus["SKJEMA_VALIDERT"] = "SKJEMA_VALIDERT";
    DelstegStatus["VEDLEGG_VALIDERT"] = "VEDLEGG_VALIDERT";
    DelstegStatus["SAMTYKKET"] = "SAMTYKKET";
    DelstegStatus["ETTERSENDING_OPPRETTET"] = "ETTERSENDING_OPPRETTET";
    DelstegStatus["ETTERSENDING_UTFYLLING"] = "ETTERSENDING_UTFYLLING";
})(DelstegStatus = exports.DelstegStatus || (exports.DelstegStatus = {}));
var Adressetype;
(function (Adressetype) {
    Adressetype["POSTADRESSE_UTLAND"] = "POSTADRESSE_UTLAND";
    Adressetype["BOSTEDSADRESSE"] = "BOSTEDSADRESSE";
    Adressetype["POSTADRESSE"] = "POSTADRESSE";
    Adressetype["GATEADRESSE"] = "GATEADRESSE";
    Adressetype["POSTBOKSADRESSE"] = "POSTBOKSADRESSE";
    Adressetype["OMRAADEADRESSE"] = "OMRAADEADRESSE";
    Adressetype["UTENLANDSK_ADRESSE"] = "UTENLANDSK_ADRESSE";
    Adressetype["UKJENT_ADRESSE"] = "UKJENT_ADRESSE";
    Adressetype["MIDLERTIDIG_POSTADRESSE_NORGE"] = "MIDLERTIDIG_POSTADRESSE_NORGE";
    Adressetype["MIDLERTIDIG_POSTADRESSE_UTLAND"] = "MIDLERTIDIG_POSTADRESSE_UTLAND";
})(Adressetype = exports.Adressetype || (exports.Adressetype = {}));
var SoknadInnsendingStatus;
(function (SoknadInnsendingStatus) {
    SoknadInnsendingStatus["UNDER_ARBEID"] = "UNDER_ARBEID";
    SoknadInnsendingStatus["FERDIG"] = "FERDIG";
    SoknadInnsendingStatus["AVBRUTT_AV_BRUKER"] = "AVBRUTT_AV_BRUKER";
    SoknadInnsendingStatus["AVBRUTT_AUTOMATISK"] = "AVBRUTT_AUTOMATISK";
})(SoknadInnsendingStatus = exports.SoknadInnsendingStatus || (exports.SoknadInnsendingStatus = {}));

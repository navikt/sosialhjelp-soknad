/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type {AdresseForslagType} from "./adresseForslagType";

export interface AdresseForslag {
    adresse?: string;
    husnummer?: string;
    husbokstav?: string;
    kommunenummer?: string;
    kommunenavn?: string;
    postnummer?: string;
    poststed?: string;
    geografiskTilknytning?: string;
    gatekode?: string;
    bydel?: string;
    type: AdresseForslagType;
}

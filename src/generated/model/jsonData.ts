/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type {JsonPersonalia} from "./jsonPersonalia";
import type {JsonArbeid} from "./jsonArbeid";
import type {JsonUtdanning} from "./jsonUtdanning";
import type {JsonFamilie} from "./jsonFamilie";
import type {JsonBegrunnelse} from "./jsonBegrunnelse";
import type {JsonBosituasjon} from "./jsonBosituasjon";
import type {JsonOkonomi} from "./jsonOkonomi";

export interface JsonData {
    personalia?: JsonPersonalia;
    arbeid?: JsonArbeid;
    utdanning?: JsonUtdanning;
    familie?: JsonFamilie;
    begrunnelse?: JsonBegrunnelse;
    bosituasjon?: JsonBosituasjon;
    okonomi?: JsonOkonomi;
}

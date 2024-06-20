import type {FlatLanguageFile} from "./types.ts";
import type {VedleggFrontendType} from "../../generated/model";
import {opplysningSpec} from "../../lib/opplysninger";

export const textKeysForFrontendTypes: Record<VedleggFrontendType, string> = Object.keys(opplysningSpec).reduce(
    (acc, frontendType) => ({
        ...acc,
        [frontendType]: opplysningSpec[frontendType as VedleggFrontendType].textKey,
    }),
    {} as Record<VedleggFrontendType, string>
);

// Sanity check: Are the values unique?
if (new Set(Object.values(textKeysForFrontendTypes)).size !== Object.values(textKeysForFrontendTypes).length)
    throw new Error("Text keys are not unique!");

export const moveDokumentasjonKeys = (original: FlatLanguageFile): FlatLanguageFile => {
    const dokumentasjon = {} as FlatLanguageFile;

    Object.entries(textKeysForFrontendTypes).forEach(([dokumentasjonType, languageKey]) => {
        Object.entries(original).forEach(([key, value]) => {
            if (key.startsWith(`${languageKey}.`)) {
                delete original[key];
                const reprefixedKey =
                    dokumentasjonType +
                    key
                        .replace(languageKey, "")
                        .replace("vedlegg.sporsmal.tittel", "dokumentBeskrivelse")
                        .replace("vedlegg.sporsmal.info", "dokumentInfo");
                dokumentasjon[reprefixedKey] = value;
            }
        });
    });

    return dokumentasjon;
};

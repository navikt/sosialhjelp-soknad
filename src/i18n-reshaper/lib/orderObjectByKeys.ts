import type {FlatLanguageFile} from "./types.ts";

export const orderObjectByKeys = (unordered: FlatLanguageFile): FlatLanguageFile =>
    Object.keys(unordered)
        .sort()
        .reduce((obj, key) => {
            obj[key] = unordered[key];
            return obj;
        }, {} as FlatLanguageFile);

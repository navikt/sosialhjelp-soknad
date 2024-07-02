// The dot-object library is extremely handy for what we're doing, but unfortunately,
// it treats numeric keys as array indices, creating 403 empty elements before feilmeldinger.404.
import type {FlatLanguageFile} from "./types.ts";

const replacer = (obj: FlatLanguageFile, key: string) => {
    const value = obj[key];
    const tokens = key.split(".").filter((x) => !!x.length);
    if (!tokens.every((part) => isNaN(Number(part)))) {
        const tokenNumericIndex = tokens.findIndex((part) => !isNaN(Number(part)));
        tokens[tokenNumericIndex] = `number${tokens[tokenNumericIndex]}`;
        const newKey = tokens.join(".");
        obj[newKey] = value;
        delete obj[key];
    }
};

export const stringifyNumericKeys = (obj: FlatLanguageFile): FlatLanguageFile => {
    Object.keys(obj).forEach((key) => replacer(obj, key));
    return obj;
};

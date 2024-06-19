import type {FlatLanguageFile} from "./types.ts";

export const solveStringObjectDuplication = (localeFile: FlatLanguageFile): FlatLanguageFile => {
    Object.entries(localeFile).forEach(([key, _value]) => {
        const matchingKey = Object.keys(localeFile)
            .filter((candidate) => candidate !== key)
            .find((matchingKey) => key.startsWith(`${matchingKey}.`));

        if (!matchingKey) return;

        const newKey = `${matchingKey}.stringValue`;
        localeFile[newKey] = localeFile[matchingKey];
        delete localeFile[matchingKey];
    });

    return localeFile;
};

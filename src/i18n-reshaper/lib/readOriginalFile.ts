import type {FlatLanguageFile} from "./types.ts";

export const readOriginalFile = async (path: string): Promise<FlatLanguageFile> => {
    try {
        const file = await Bun.file(`${import.meta.dir}/${path}`);
        return (await file.json()) as FlatLanguageFile;
    } catch (e) {
        console.error(`Failed to read file at path ${path}`, e);
        throw e;
    }
};

import type {FlatLanguageFile} from "./types.ts";

export const readOriginalFile = async (path: string): Promise<FlatLanguageFile> =>
    (await Bun.file(`${import.meta.dir}/${path}`).json()) as FlatLanguageFile;

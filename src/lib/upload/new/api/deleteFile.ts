import {digisosConfig} from "../../../config.ts";

/** Sletter en opplasting. Idempotent: 204 er OK også om filen allerede er borte. Kaster ved feil. */
export const deleteFile = async (uploadId: string): Promise<void> => {
    const response = await fetch(`${digisosConfig.uploadBaseURL}/files/${encodeURIComponent(uploadId)}`, {
        method: "DELETE",
    });
    if (response.status !== 204 && !response.ok) {
        throw new Error(`Sletting feilet med status ${response.status}`);
    }
};

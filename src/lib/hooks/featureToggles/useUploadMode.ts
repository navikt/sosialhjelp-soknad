import {useFlag} from "../../../featuretoggles/context.tsx";
import {useNewUploadEnabled} from "./useNewUploadEnabled.ts";

export type UploadMode = "tus" | "sync";

/** "sync" krever både ny opplasting og forenklet-opplasting-togglen. Ellers brukes tus. */
export const useUploadMode = (): UploadMode => {
    const newUploadEnabled = useNewUploadEnabled();
    const forenklet = useFlag("sosialhjelp.upload.forenklet_opplasting").enabled;
    return newUploadEnabled && forenklet ? "sync" : "tus";
};

import {useFlag} from "../../../featuretoggles/context.tsx";

export type UploadMode = "tus" | "sync";

/** "sync" krever forenklet-opplasting-togglen. Ellers brukes tus. */
export const useUploadMode = (): UploadMode => {
    const forenklet = useFlag("sosialhjelp.upload.forenklet_opplasting").enabled;
    return forenklet ? "sync" : "tus";
};

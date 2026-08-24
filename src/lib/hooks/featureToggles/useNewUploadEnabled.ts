import {useContextFeatureToggles} from "../../providers/useContextFeatureToggles";
import {useAdresser} from "../../../sider/01-personalia/adresse/useAdresser.tsx";
import {useConfigFeatureFlags} from "../../config.ts";

export const useNewUploadEnabled = () => {
    const featureToggles = useContextFeatureToggles();
    const {navEnhet} = useAdresser();
    const {tusUploadKommuner} = useConfigFeatureFlags();

    const toggleEnabled = featureToggles?.["sosialhjelp.soknad.tusUpload"] ?? false;
    const kommuneAllowed = tusUploadKommuner.includes(navEnhet?.kommunenummer ?? "");

    return toggleEnabled && kommuneAllowed;
};

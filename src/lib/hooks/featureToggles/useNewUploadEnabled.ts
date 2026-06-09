import {useContextFeatureToggles} from "../../providers/useContextFeatureToggles";

export const useNewUploadEnabled = () => {
    const featureToggles = useContextFeatureToggles();
    return featureToggles?.["sosialhjelp.soknad.tusUpload"] ?? false;
};

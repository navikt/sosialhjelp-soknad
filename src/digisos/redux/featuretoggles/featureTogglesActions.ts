import {FeatureTogglesActionTypeKeys, FeatureTogglesActionTypes} from "./featureTogglesTypes";

const mottattFeatures = (featureToggles: object): FeatureTogglesActionTypes => {
    return {
        type: FeatureTogglesActionTypeKeys.OK,
        data: featureToggles,
    };
};

const hentFeatureTogglesFeilet = (feilmelding: string): FeatureTogglesActionTypes => {
    return {
        type: FeatureTogglesActionTypeKeys.FEILET,
        feilmelding,
    };
};

const hentFeatureToggles = (): FeatureTogglesActionTypes => {
    return {
        type: FeatureTogglesActionTypeKeys.INIT,
    };
};

const henterFeaturetoggles = (): FeatureTogglesActionTypes => {
    return {
        type: FeatureTogglesActionTypeKeys.PENDING,
    };
};

export {mottattFeatures, hentFeatureTogglesFeilet, hentFeatureToggles, henterFeaturetoggles};

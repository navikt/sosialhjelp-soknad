import {FeatureTogglesActionTypeKeys, FeatureTogglesActionTypes, FeatureTogglesApiType} from "./featureTogglesTypes";

const {OK, PENDING, FEILET, INIT} = FeatureTogglesActionTypeKeys;

const initialState = {
    data: {},
    status: INIT,
};

export default (state: FeatureTogglesApiType = initialState, action: FeatureTogglesActionTypes) => {
    switch (action.type) {
        case OK: {
            return {...state, status: OK, data: action.data};
        }
        case PENDING:
            return {...state, status: PENDING};
        case FEILET:
            return {...state, status: FEILET, felmelding: action.feilmelding};
        default:
            return state;
    }
};

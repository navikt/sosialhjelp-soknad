import {MiljovariablerAction, MiljovariablerActionTypeKeys, MiljovariablerState} from "./miljovariablerTypes";


const initialState: MiljovariablerState = {
    data: {},
};

export default (
    state: MiljovariablerState = initialState,
    action: MiljovariablerAction
) => {
    switch (action.type) {
        case MiljovariablerActionTypeKeys.LAGRE_MILJOVARIABLER_PA_STORE: {
            return {...state, data: action.miljovariablerResponse};
        }
        default:
            return state;
    }
};

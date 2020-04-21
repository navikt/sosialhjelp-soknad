import {LedeteksterAction, LedeteksterActionTypeKeys, LedeteksterState} from "./ledeteksterTypes";

const initialState: LedeteksterState = {
    data: {},
};

const urlInneholderVistekster = () => window.location.search.match(/vistekster=true/) !== null;

function leggNoklerPaaLedetekster(data: object) {
    const tekster = {};
    Object.keys(data).forEach((key) => {
        // @ts-ignore
        tekster[key] = `${data[key]} [${key}]`;
    });
    return tekster;
}

export default (state: LedeteksterState = initialState, action: LedeteksterAction) => {
    switch (action.type) {
        case LedeteksterActionTypeKeys.LAGRE_LEDETEKSTER_PA_STORE: {
            let {ledeteksterResponse} = action;

            const ledeteksterResponseUpdated = urlInneholderVistekster()
                ? leggNoklerPaaLedetekster(ledeteksterResponse)
                : ledeteksterResponse;

            return {
                ...state,
                data: ledeteksterResponseUpdated,
            };
        }
        default:
            return state;
    }
};

import {NavloggerActionTypes} from "./navloggerTypes";

export interface NavloggerState {}

const initialState: NavloggerState = {};

export const navloggerReducer = (
    state: NavloggerState = initialState,
    action: NavloggerActionTypes
): NavloggerState => {
    switch (action.type) {
        default:
            return state;
    }
};

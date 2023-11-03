import {NavEnhetFrontend} from "../generated/model";

export const erAktiv = (e?: NavEnhetFrontend | null) =>
    !!e && !e.isMottakDeaktivert && !e.isMottakMidlertidigDeaktivert;
export const erMidlDeaktivert = (e?: NavEnhetFrontend) =>
    !!e && !e.isMottakDeaktivert && e.isMottakMidlertidigDeaktivert;

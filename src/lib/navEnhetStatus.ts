import {NavEnhetFrontend} from "../generated/model";
import {NavEnhetDto} from "../generated/new/model";

export const erAktiv = (e?: NavEnhetFrontend | NavEnhetDto | null) =>
    !!e && !e.isMottakDeaktivert && !e.isMottakMidlertidigDeaktivert;
export const erMidlDeaktivert = (e?: NavEnhetFrontend | NavEnhetDto) =>
    !!e && !e.isMottakDeaktivert && e.isMottakMidlertidigDeaktivert;

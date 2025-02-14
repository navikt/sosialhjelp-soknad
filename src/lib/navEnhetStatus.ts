import {NavEnhetDto} from "../generated/new/model";

export const erAktiv = (e?: NavEnhetDto | null) => !!e && !e.isMottakDeaktivert && !e.isMottakMidlertidigDeaktivert;
export const erMidlDeaktivert = (e?: NavEnhetDto) => !!e && !e.isMottakDeaktivert && e.isMottakMidlertidigDeaktivert;

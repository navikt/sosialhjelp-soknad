import {Infofaktum, Kvittering, REST_STATUS, Soknad} from "../../nav-soknad/types";
import {AVBRYT_DESTINASJON, ErSystemdataEndret} from "./soknad/soknadActionTypes";
import {NavEnhet} from "../skjema/personopplysninger/adresse/AdresseTypes";

export * from "./validering/valideringActionTypes";

export type Dispatch = (action: any) => Promise<any>;
export type Reducer<S, AT> = (state: S, action: AT) => S;

export interface DispatchProps {
    dispatch: Dispatch;
}


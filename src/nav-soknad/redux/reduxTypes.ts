import {Infofaktum, Kvittering, REST_STATUS, Soknad} from "../types";
import {AVBRYT_DESTINASJON, ErSystemdataEndret} from "./soknad/soknadActionTypes";
import {NavEnhet} from "../../digisos/skjema/personopplysninger/adresse/AdresseTypes";

export * from "./fakta/faktaActionTypes";
export * from "./valideringActionTypes";

export type Dispatch = (action: any) => Promise<any>;
export type Reducer<S, AT> = (state: S, action: AT) => S;

export interface DispatchProps {
    dispatch: Dispatch;
}

export interface SoknadState {
    showLargeSpinner: boolean;
    showFeilside: boolean;
    restStatus: REST_STATUS;
    data: Soknad;
    /** Faktum som lagrer informasjon presentert på infosiden */
    infofaktum: Infofaktum | null;
    kvittering?: Kvittering;
    sendSoknadPending: boolean;
    startSoknadPending: boolean;
    avbrytSoknadSjekkAktiv: boolean;
    avbrytDialog: {
        synlig: boolean;
        destinasjon: AVBRYT_DESTINASJON | null | undefined;
    };
    behandlingsId: string;
    erGjenopptattSoknad: boolean;
    skalSjekkeOmSystemdataErEndret: boolean;
    erSystemdataEndret: ErSystemdataEndret;
    valgtSoknadsmottaker: NavEnhet | undefined;
}

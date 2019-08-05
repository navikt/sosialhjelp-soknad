import {ValideringState} from "./valideringReducer";
import {MiljovariablerApiType} from "./miljovariabler/miljovariablerTypes";
import {OppsummeringState} from "./oppsummering/oppsummeringReducer";
import {Infofaktum, Kvittering, REST_STATUS, Soknad} from "../types";
import {ApplikasjonsfeilState} from "./applikasjonsfeil/applikasjonsfeilReducer";
import {TilgangState} from "./tilgang/tilgangTypes";
import {LedetekstState} from "./ledetekster/ledeteksterTypes";
import {AVBRYT_DESTINASJON, ErSystemdataEndret} from "./soknad/soknadActionTypes";
import {InitState} from "./init/initTypes";
import {FeatureTogglesApiType} from "./featuretoggles/featureTogglesTypes";
import {VedleggState} from "./vedlegg/vedleggTypes";
import {MockState} from "../../digisos/mock/mockReducer";
import {Soknadsdata} from "./soknadsdata/soknadsdataReducer";
import {OpplysningerModel} from "./okonomiskeOpplysninger/opplysningerTypes";
import {FilState} from "./fil/filTypes";
import {NavEnhet} from "../../digisos/skjema/personopplysninger/adresse/AdresseTypes";
import {EttersendelseState} from "./ettersendelse/ettersendelseTypes";
import {RouterState} from "connected-react-router";

export * from "./fakta/faktaActionTypes";
export * from "./valideringActionTypes";

export type Dispatch = (action: any) => Promise<any>;
export type SoknadDispatch<AT> = (action: AT) => void;
export type Reducer<S, AT> = (state: S, action: AT) => S;

export interface DispatchProps {
    dispatch: Dispatch;
}

export interface SoknadAppState {
    router: RouterState;
    soknad: SoknadState;
    oppsummering: OppsummeringState;
    validering: ValideringState;
    ledetekster: LedetekstState;
    tilgang: TilgangState;
    vedlegg: VedleggState;
    miljovariabler: MiljovariablerApiType;
    featuretoggles: FeatureTogglesApiType;
    applikasjonsfeil: ApplikasjonsfeilState;
    ettersendelse: EttersendelseState;
    init: InitState;
    mockData: MockState;
    soknadsdata: Soknadsdata;
    okonomiskeOpplysninger: OpplysningerModel;
    filopplasting: FilState;
}

export interface SoknadState {
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
    gjenopptattSoknad: boolean;
    erSystemdataEndret: ErSystemdataEndret;
    valgtSoknadsmottaker: NavEnhet | undefined;
}

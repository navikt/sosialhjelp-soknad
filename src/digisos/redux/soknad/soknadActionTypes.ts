export const enum SoknadActionTypeKeys {
    VIS_LASTE_OPP_VEDLEGG_MODAL = "soknad/VIS_LASTE_OPP_VEDLEGG_MODAL",
    SHOW_SERVER_FEIL = "soknad/SHOW_SERVER_FEIL",
}

// 24
export type SoknadActionType = VisLasteOppVedleggModal | ShowServerFeil;

export interface VisLasteOppVedleggModal {
    type: SoknadActionTypeKeys.VIS_LASTE_OPP_VEDLEGG_MODAL;
    skalVises: boolean;
}

export interface ShowServerFeil {
    type: SoknadActionTypeKeys.SHOW_SERVER_FEIL;
    shouldShow: boolean;
}

import {VedleggFrontendTypeMinusUferdig} from "../../locales/en/dokumentasjon.ts";
import {useEffect, useReducer} from "react";
import {eventstreamUrl, openEventChannel} from "./openEventChannel.ts";
import {logger} from "@navikt/next-logger";

export type UploadState = {
    originalFilename: string;
    pages: {
        thumbnail?: string;
    }[];
};

export type DocumentState = {
    documentId?: string;
    error?: string;
    uploads?: Map<string, UploadState>;
};

export type DocumentStateUpdate = {
    type: "update";
    newState: Partial<DocumentState>;
};

const documentStateReducer = (state: DocumentState, {newState, type}: DocumentStateUpdate) => {
    if (type == "update") {
        // The [soknadId, vedleggType] tuple is the true identifier for the document, while documentId is
        // sosialhjelp-upload's internal UUID handle. The documentId should never change for a given document.
        if (state.documentId && state.documentId !== newState.documentId) {
            logger.error("documentId has changed");
        }

        console.log(newState);
        return {...state, ...newState};
    }
    return newState;
};

export const useDocumentState = (soknadId: string, vedleggType: VedleggFrontendTypeMinusUferdig): DocumentState => {
    const [state, dispatch] = useReducer(documentStateReducer, {});

    // Subscribe to server-sent events and send any state updates to the reducer
    const onUpdate = (payload: Partial<DocumentState>) => dispatch({type: "update", newState: payload});
    useEffect(openEventChannel(eventstreamUrl(soknadId, vedleggType), onUpdate), [soknadId, vedleggType]);

    return state;
};

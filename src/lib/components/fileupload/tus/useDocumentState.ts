import {useEffect, useReducer} from "react";
import {eventstreamUrl, openEventChannel} from "./openEventChannel";
import {DocumentState} from "./types";

export type {DocumentState, UploadState, UploadStatus} from "./types";
export {ValidationCode} from "./types";

type DocumentStateUpdate = {type: "update"; newState: Partial<DocumentState>} | {type: "clear"};

const documentStateReducer = (state: DocumentState, payload: DocumentStateUpdate): DocumentState => {
    const {type} = payload;
    if (type === "update") {
        const {newState} = payload;
        if (state.submissionId && state.submissionId !== newState.submissionId) {
            return newState;
        }
        return {...state, ...newState};
    }
    if (type === "clear") {
        return {...state, error: undefined, uploads: [], validations: []};
    }
    throw new Error("Unsupported type");
};

export const useDocumentState = (contextId: string): {state: DocumentState; resetState: () => void} => {
    const [state, dispatch] = useReducer(documentStateReducer, {});

    const resetState = () => dispatch({type: "clear"});

    const onUpdate = (payload: Partial<DocumentState>) => dispatch({type: "update", newState: payload});

    useEffect(() => {
        if (!contextId) return;
        return openEventChannel(eventstreamUrl(contextId), onUpdate);
    }, [contextId]);

    return {state, resetState};
};

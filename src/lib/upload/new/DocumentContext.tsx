import {createContext, Dispatch, ReactNode, useCallback, useContext, useEffect, useReducer, useRef} from "react";
import {DocumentState, openEventChannel, UploadState, ValidationCode} from "./openEventChannel.ts";
import {fetchSubmissionStatus} from "./api/fetchSubmissionStatus.ts";

export type DocumentMode = "tus" | "sync";

export type State = {
    uploads: UploadState[];
    validations: ValidationCode[];
};

export type Action =
    | {type: "SSE_UPDATE"; payload: DocumentState}
    | {type: "ADD_UPLOADS"; uploads: UploadState[]}
    | {type: "REMOVE_UPLOAD"; correlationId: string}
    | {type: "UPLOAD_RESULT"; correlationId: string; upload: UploadState}
    | {type: "REFRESH"; payload: DocumentState}
    | {type: "CLEAR"};

export const initialState: State = {
    uploads: [],
    validations: [],
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SSE_UPDATE": {
            const incoming = action.payload.uploads ?? [];

            // Update existing entries in place, matching by correlationId or id
            const updated = state.uploads.map((existing) => {
                const match = incoming.find(
                    (u) => (u.correlationId && u.correlationId === existing.correlationId) || u.id === existing.id
                );
                return match ?? existing;
            });

            // Append only genuinely new uploads (no match by correlationId or id)
            const existingIds = new Set(state.uploads.map((u) => u.id));
            const existingCorrelationIds = new Set(state.uploads.map((u) => u.correlationId).filter(Boolean));
            const newFromSSE = incoming.filter(
                (u) => !existingIds.has(u.id) && (!u.correlationId || !existingCorrelationIds.has(u.correlationId))
            );

            return {
                uploads: [...updated, ...newFromSSE],
                validations: action.payload.validations ?? [],
            };
        }
        case "ADD_UPLOADS":
            return {
                ...state,
                uploads: [...state.uploads, ...action.uploads],
            };
        case "REMOVE_UPLOAD":
            return {
                ...state,
                uploads: state.uploads.filter((u) => u.correlationId !== action.correlationId),
            };
        case "UPLOAD_RESULT":
            // Erstatter plassholderen med serverens svar. Ukjent correlationId (fjernet underveis) ignoreres.
            if (!state.uploads.some((u) => u.correlationId === action.correlationId)) return state;
            return {
                ...state,
                uploads: state.uploads.map((u) => (u.correlationId === action.correlationId ? action.upload : u)),
            };
        case "REFRESH": {
            // Ingen innsending ennå: serveren har ingenting å si, behold lokal tilstand.
            if (!action.payload.submissionId) return state;
            const server = action.payload.uploads ?? [];
            const serverCorrelationIds = new Set(server.map((u) => u.correlationId).filter(Boolean));
            const serverIds = new Set(server.map((u) => u.id));
            // Klientplassholdere (ikke lagret, uten filId) overlever refresh
            const clientOnly = state.uploads.filter(
                (u) =>
                    !u.filId && !serverIds.has(u.id) && !(u.correlationId && serverCorrelationIds.has(u.correlationId))
            );
            return {uploads: [...server, ...clientOnly], validations: action.payload.validations ?? []};
        }
        case "CLEAR":
            return initialState;
        default:
            return state;
    }
};

type ContextValue = {
    uploads: UploadState[];
    validations: ValidationCode[];
    dispatch: Dispatch<Action>;
    mode: DocumentMode;
    /** Henter status på nytt. Bare i sync-modus. */
    refresh: () => Promise<void>;
};

const DocumentContext = createContext<ContextValue | undefined>(undefined);

export const DocumentProvider = ({
    contextId,
    mode = "tus",
    children,
}: {
    contextId: string;
    mode?: DocumentMode;
    children: ReactNode;
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const mounted = useRef(true);

    const refresh = useCallback(async () => {
        if (mode !== "sync") return;
        const result = await fetchSubmissionStatus(contextId);
        if (!mounted.current) return;
        if (result.kind === "forbidden") dispatch({type: "CLEAR"});
        else if (result.kind === "ok") dispatch({type: "REFRESH", payload: result.state});
    }, [contextId, mode]);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (mode === "sync") {
            void refresh();
            return;
        }
        return openEventChannel(contextId, (payload) => {
            dispatch({type: "SSE_UPDATE", payload});
        });
    }, [contextId, mode, refresh]);

    return (
        <DocumentContext.Provider
            value={{uploads: state.uploads, validations: state.validations, dispatch, mode, refresh}}
        >
            {children}
        </DocumentContext.Provider>
    );
};

export const useDocumentContext = (): ContextValue => {
    const context = useContext(DocumentContext);
    if (!context) throw new Error("useDocumentContext must be used within a DocumentProvider");
    return context;
};

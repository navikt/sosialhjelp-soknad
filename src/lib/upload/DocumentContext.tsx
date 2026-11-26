import {createContext, Dispatch, ReactNode, useContext, useEffect, useReducer} from "react";
import {DocumentState, openEventChannel, UploadState, ValidationCode} from "./openEventChannel.ts";

type State = {
    uploads: UploadState[];
    validations: ValidationCode[];
};

type Action =
    | {type: "SSE_UPDATE"; payload: DocumentState}
    | {type: "ADD_UPLOADS"; uploads: UploadState[]}
    | {type: "REMOVE_UPLOAD"; correlationId: string};

const initialState: State = {
    uploads: [],
    validations: [],
};

const reducer = (state: State, action: Action): State => {
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
        default:
            return state;
    }
};

type ContextValue = {
    uploads: UploadState[];
    validations: ValidationCode[];
    dispatch: Dispatch<Action>;
};

const DocumentContext = createContext<ContextValue | undefined>(undefined);

export const DocumentProvider = ({contextId, children}: {contextId: string; children: ReactNode}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        return openEventChannel(contextId, (payload) => {
            dispatch({type: "SSE_UPDATE", payload});
        });
    }, [contextId]);

    return (
        <DocumentContext.Provider value={{uploads: state.uploads, validations: state.validations, dispatch}}>
            {children}
        </DocumentContext.Provider>
    );
};

export const useDocumentContext = (): ContextValue => {
    const context = useContext(DocumentContext);
    if (!context) throw new Error("useDocumentContext must be used within a DocumentProvider");
    return context;
};

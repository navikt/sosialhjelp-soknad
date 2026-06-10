import {useEffect, useState} from "react";
import {DocumentState, openEventChannel} from "./openEventChannel.ts";

const useDocumentState = (contextId: string) => {
    const [documentState, setDocumentState] = useState<DocumentState>();

    useEffect(() => {
        return openEventChannel(contextId, (documentState) => {
            setDocumentState(documentState);
        });
    }, [contextId]);

    return {documentState, resetDocumentState: () => setDocumentState(undefined)};
};

export default useDocumentState;

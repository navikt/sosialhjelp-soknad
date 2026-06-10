import React, {useEffect} from "react";
import config from "../../../../lib/config.ts";

const eventstreamUrl = (contextId: string) => `${config}/status/${contextId}` as const;

const useDocumentState = (contextId: string) => {
    useEffect(() => {
        new EventSource(eventstreamUrl(contextId));
    }, [contextId]);
};

export default useDocumentState;

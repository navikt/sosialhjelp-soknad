import {useContext} from "react";

import {AmplitudeContext} from "./AmplitudeContext";

/**
 * Hook for å logge hendelser til Amplitude, vha. en web worker.
 */
export const useAmplitude = () => {
    const worker = useContext(AmplitudeContext);

    /** Logger en hendelse til Amplitude via en worker thread */
    const logEvent = (eventName: string, eventData?: Record<string, unknown>) => {
        if (!worker) return;
        worker.postMessage({eventName, eventData});
    };

    return {logEvent};
};

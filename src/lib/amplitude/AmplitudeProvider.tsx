//import {ReactNode, useEffect, useState} from "react";
//import {logWarning} from "../log/loggerUtils";
//import workerUrl from "./worker?worker&url";
//import {AmplitudeContext} from "./AmplitudeContext";

/**
 * Provider for å gi tilgang til Amplitude-målinger via en web worker.
 * Vi bruker en web worker fordi svært mange målinger gjøres rett før navigering til en annen side.
 * Dette kan føre til at målinger ikke blir sendt før brukeren forlater siden, og dermed ikke blir logget,
 * eller at navigering blir forsinket eller mislykkes ved at målinger blokkerer hovedtråden.
 *
 * Brukes med `useAmplitude`-hooken.
 */
//const AmplitudeProvider = ({children}: {children: ReactNode}) => {
//    const [worker, setWorker] = useState<Worker | null>(null);
//
//    useEffect(() => {
//        if (!window.Worker) {
//            logWarning("Web Workers not supported by browser; amplitude metrics not available").then();
//            return;
//        }
//
//        try {
//            setWorker(new Worker(workerUrl, {type: "module"}));
//        } catch (e) {
//            logWarning(`Failed to create worker for amplitude metrics: ${e}`).then();
//        }
//
//        return () => worker?.terminate();
//    }, []);
//
//    return <AmplitudeContext.Provider value={worker}>{children}</AmplitudeContext.Provider>;
//};

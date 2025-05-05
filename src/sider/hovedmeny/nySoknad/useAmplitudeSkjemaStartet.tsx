import {useContextSessionInfo} from "../../../lib/providers/useContextSessionInfo.ts";
import {logAmplitudeEvent} from "../../../lib/amplitude/Amplitude.tsx";

export const useAmplitudeSkjemaStartet = () => {
    const {numRecentlySent, open} = useContextSessionInfo();

    const logAmplitudeStartSoknad = async () =>
        await logAmplitudeEvent("skjema startet", {
            antallNyligInnsendteSoknader: numRecentlySent,
            antallPabegynteSoknader: open?.length,
            enableModalV2: true,
            erProdsatt: true,
            language: document.documentElement.lang,
        });

    return {logAmplitudeStartSoknad};
};

import {logAmplitudeEvent} from "../../lib/amplitude/Amplitude.tsx";

export const logAmplitudeSkjemaStegFullfort = async (steg: number) =>
    await logAmplitudeEvent("skjemasteg fullført", {steg});

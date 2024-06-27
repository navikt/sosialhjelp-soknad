import {useBehandlingsId} from "../common/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {
    updateForsorgerplikt,
    useHentForsorgerplikt,
} from "../../../generated/forsorgerplikt-ressurs/forsorgerplikt-ressurs";
import {useEffect} from "react";
import {logAmplitudeEvent} from "../../amplitude/Amplitude";
import {logWarning} from "../../log/loggerUtils";
//import {useAmplitude} from "../../amplitude/useAmplitude";

export const useForsorgerplikt = () => {
    //const {logEvent} = useAmplitude();
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data: forsorgerplikt, isPending, queryKey} = useHentForsorgerplikt(behandlingsId);

    const setBarn = async (barnIndex: number, samvaersgrad?: number, harDeltBosted?: boolean) => {
        if (!forsorgerplikt) return;

        const oppdatert = {...forsorgerplikt};

        if (harDeltBosted !== undefined) {
            oppdatert.ansvar[barnIndex].harDeltBosted = harDeltBosted;
            logAmplitudeEvent("svart på sporsmal", {
                sporsmal: "Har barnet delt bosted?",
                verdi: harDeltBosted ? "Ja" : "Nei",
            }).catch((e) => logWarning(`Amplitude error: ${e}`));
        }

        if (samvaersgrad !== undefined) {
            oppdatert.ansvar[barnIndex].samvarsgrad = samvaersgrad;

            logAmplitudeEvent("svart på sporsmal", {
                sporsmal: "Hvor mye tid tilbringer du sammen med barnet?",
                verdi: samvaersgrad.toString(),
            }).catch((e) => logWarning(`Amplitude error: ${e}`));
        }

        await updateForsorgerplikt(behandlingsId, oppdatert);
        queryClient.setQueryData(queryKey, oppdatert);
    };

    useEffect(() => {
        forsorgerplikt?.ansvar
            ?.filter(({erFolkeregistrertSammen}) => !erFolkeregistrertSammen)
            .forEach((_) => {
                logAmplitudeEvent("sporsmal ikke vist", {
                    sporsmal: "Har barnet delt bosted?",
                }).catch((e) => logWarning(`Amplitude error: ${e}`));
            });
    }, [forsorgerplikt]);

    return {forsorgerplikt, setBarn, isPending};
};

import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {
    updateForsorgerplikt,
    useHentForsorgerplikt,
} from "../../../generated/forsorgerplikt-ressurs/forsorgerplikt-ressurs";
import {logAmplitudeEvent} from "../../../nav-soknad/utils/amplitude";
import {useEffect} from "react";

export const useForsorgerplikt = () => {
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
            });
        }

        if (samvaersgrad !== undefined) {
            oppdatert.ansvar[barnIndex].samvarsgrad = samvaersgrad;

            logAmplitudeEvent("svart på sporsmal", {
                sporsmal: "Hvor mye tid tilbringer du sammen med barnet?",
                verdi: samvaersgrad.toString(),
            });
        }

        await updateForsorgerplikt(behandlingsId, oppdatert);
        queryClient.setQueryData(queryKey, oppdatert);
    };

    useEffect(() => {
        forsorgerplikt?.ansvar
            ?.filter(({erFolkeregistrertSammen}) => !erFolkeregistrertSammen)
            .forEach((barnet) => {
                logAmplitudeEvent("sporsmal ikke vist", {
                    sporsmal: "Har barnet delt bosted?",
                });
            });
    }, [forsorgerplikt]);

    return {forsorgerplikt, setBarn, isPending};
};

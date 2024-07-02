import {useBehandlingsId} from "../common/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {
    updateForsorgerplikt,
    useHentForsorgerplikt,
} from "../../../generated/forsorgerplikt-ressurs/forsorgerplikt-ressurs";
import {useEffect} from "react";
import {useAmplitude} from "../../amplitude/useAmplitude";

export const useForsorgerplikt = () => {
    const {logEvent} = useAmplitude();
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data: forsorgerplikt, isPending, queryKey} = useHentForsorgerplikt(behandlingsId);

    const setBarn = async (barnIndex: number, samvaersgrad?: number, harDeltBosted?: boolean) => {
        if (!forsorgerplikt) return;

        const oppdatert = {...forsorgerplikt};

        if (harDeltBosted !== undefined) {
            oppdatert.ansvar[barnIndex].harDeltBosted = harDeltBosted;
            logEvent("svart på sporsmal", {
                sporsmal: "Har barnet delt bosted?",
                verdi: harDeltBosted ? "Ja" : "Nei",
            });
        }

        if (samvaersgrad !== undefined) {
            oppdatert.ansvar[barnIndex].samvarsgrad = samvaersgrad;

            logEvent("svart på sporsmal", {
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
            .forEach((_) => {
                logEvent("sporsmal ikke vist", {
                    sporsmal: "Har barnet delt bosted?",
                });
            });
    }, [forsorgerplikt]);

    return {forsorgerplikt, setBarn, isPending};
};

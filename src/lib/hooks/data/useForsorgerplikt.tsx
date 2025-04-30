import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {logAmplitudeEvent} from "../../amplitude/Amplitude";
import {
    useGetForsorgerplikt,
    useUpdateForsorgerplikt,
} from "../../../generated/new/forsorgerplikt-controller/forsorgerplikt-controller.ts";
import {ForsorgerDto, ForsorgerInput} from "../../../generated/new/model";

export const useForsorgerplikt = () => {
    const soknadId = useSoknadId();
    const queryClient = useQueryClient();
    const {data, isLoading, queryKey} = useGetForsorgerplikt(soknadId);
    const [isDelayedPending, setIsDelayedPending] = useState(false);
    const {mutate, variables, isPending} = useUpdateForsorgerplikt({
        mutation: {
            onSettled: (_1, _2, _3, context) => {
                clearTimeout(context);
                setIsDelayedPending(false);
                return queryClient.invalidateQueries({queryKey});
            },
            onMutate: () => setTimeout(() => setIsDelayedPending(true), 300),
        },
    });

    const setBarn = async (barnIndex: number, samvaersgrad?: number, harDeltBosted?: boolean) => {
        if (!data) return;

        const oppdatert: ForsorgerInput = {...data};

        if (harDeltBosted !== undefined) {
            oppdatert.ansvar[barnIndex].deltBosted = harDeltBosted;
            await logAmplitudeEvent("svart på sporsmal", {
                sporsmal: "Har barnet delt bosted?",
                verdi: harDeltBosted ? "Ja" : "Nei",
            });
        }

        if (samvaersgrad !== undefined) {
            oppdatert.ansvar[barnIndex].samvarsgrad = samvaersgrad;

            await logAmplitudeEvent("svart på sporsmal", {
                sporsmal: "Hvor mye tid tilbringer du sammen med barnet?",
                verdi: samvaersgrad.toString(),
            });
        }

        mutate({soknadId: soknadId, data: oppdatert});
    };

    useEffect(() => {
        data?.ansvar
            ?.filter(({folkeregistrertSammen}) => !folkeregistrertSammen)
            .forEach(async (_) => {
                const sporsmal = "Har barnet delt bosted?";
                await logAmplitudeEvent("sporsmal ikke vist", {sporsmal});
            });
    }, [data]);

    const forsorgerplikt: ForsorgerDto | undefined = isPending
        ? {
              ...variables?.data,
              ansvar: [...(variables?.data.ansvar ?? []).map((it) => ({...it, uuid: it.uuid ?? ""}))],
              harForsorgerplikt: data?.harForsorgerplikt,
          }
        : data;

    return {forsorgerplikt, setBarn, isLoading, isPending, isDelayedPending};
};

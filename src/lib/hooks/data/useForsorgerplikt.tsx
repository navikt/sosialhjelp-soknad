import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
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
        }

        if (samvaersgrad !== undefined) {
            oppdatert.ansvar[barnIndex].samvarsgrad = samvaersgrad;
        }

        mutate({soknadId, data: oppdatert});
    };

    const forsorgerplikt: ForsorgerDto | undefined = isPending
        ? {
              ...variables?.data,
              ansvar: [...(variables?.data.ansvar ?? []).map((it) => ({...it, uuid: it.uuid ?? ""}))],
              harForsorgerplikt: data?.harForsorgerplikt,
          }
        : data;

    return {forsorgerplikt, setBarn, isLoading, isPending, isDelayedPending};
};

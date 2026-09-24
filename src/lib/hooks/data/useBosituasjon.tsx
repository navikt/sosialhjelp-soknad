import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useGetBosituasjon, useUpdateBosituasjon} from "../../../generated";
import type {BosituasjonDto, BosituasjonDtoBotype} from "../../../generated/model";

export const useBosituasjon = () => {
    const soknadId = useSoknadId();
    const queryClient = useQueryClient();
    const {data, isLoading, isError, queryKey} = useGetBosituasjon(soknadId);
    const {mutate, variables, isPending} = useUpdateBosituasjon({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})},
    });

    const bosituasjon = isPending ? variables?.data : data;

    const setBosituasjon = (nyBosituasjon: Partial<BosituasjonDto>) => {
        const data = {...(bosituasjon as BosituasjonDto), ...nyBosituasjon};
        mutate({soknadId, data});
    };

    const setBotype = (botype: BosituasjonDtoBotype) => setBosituasjon({botype});
    const {botype, antallPersoner} = bosituasjon || {};

    return {
        bosituasjon,
        botype,
        antallPersoner,
        setBosituasjon,
        setBotype,
        isLoading,
        isError,
    };
};

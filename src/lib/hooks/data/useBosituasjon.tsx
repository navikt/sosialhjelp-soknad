import {useBehandlingsId} from "../common/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {
    useGetBosituasjon,
    useUpdateBosituasjon,
} from "../../../generated/new/bosituasjon-controller/bosituasjon-controller.ts";
import type {BosituasjonDto, BosituasjonDtoBotype} from "../../../generated/new/model";

export const useBosituasjon = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data, isLoading, isError, queryKey} = useGetBosituasjon(behandlingsId);
    const {mutate, variables, isPending} = useUpdateBosituasjon({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})},
    });

    const bosituasjon = isPending ? variables?.data : data;

    const setBosituasjon = (nyBosituasjon: Partial<BosituasjonDto>) => {
        const data = {...(bosituasjon as BosituasjonDto), ...nyBosituasjon};
        mutate({soknadId: behandlingsId, data});
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

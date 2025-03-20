import {useBehandlingsId} from "../common/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {
    useGetBosituasjon,
    useUpdateBosituasjon,
} from "../../../generated/new/bosituasjon-controller/bosituasjon-controller.ts";
import {BosituasjonDto, BosituasjonDtoBotype} from "../../../generated/new/model";

export const useBosituasjon = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data, isLoading, isError, queryKey} = useGetBosituasjon(behandlingsId);
    const {mutate, variables, isPending} = useUpdateBosituasjon({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})},
    });

    const setBosituasjon = async (nyBosituasjon: Partial<BosituasjonDto>) => {
        const input = {...data, ...nyBosituasjon};
        mutate({soknadId: behandlingsId, data: input});
    };

    const setBotype = (botype: BosituasjonDtoBotype) => setBosituasjon({botype});

    const botype = isPending ? variables?.data?.botype : data?.botype;
    const antallPersoner = isPending ? variables?.data?.antallPersoner : data?.antallPersoner;

    return {
        data,
        botype,
        antallPersoner,
        setBosituasjon,
        setBotype,
        isLoading,
        isError,
    };
};

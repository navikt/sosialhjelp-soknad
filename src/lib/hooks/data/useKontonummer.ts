import {
    useGetKontonummer,
    useUpdateKontoInformasjonBruker,
} from "../../../generated/new/kontonummer-controller/kontonummer-controller.ts";
import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {
    HarIkkeKontoInputType,
    KontonummerBrukerInputType,
    UpdateKontoInformasjonBrukerBody,
} from "../../../generated/new/model";

export const useKontonummer = () => {
    const soknadId = useSoknadId();
    const {data, isLoading, queryKey} = useGetKontonummer(soknadId);
    const queryClient = useQueryClient();
    const {mutateAsync} = useUpdateKontoInformasjonBruker();

    const updateKontoInformasjon = async ({
        harIkkeKonto,
        kontonummerBruker,
    }: {
        harIkkeKonto?: boolean | null;
        kontonummerBruker?: string | null;
    }) => {
        const input: UpdateKontoInformasjonBrukerBody = harIkkeKonto
            ? {type: HarIkkeKontoInputType.HarIkkeKonto, harIkkeKonto}
            : {type: KontonummerBrukerInputType.KontonummerBruker, kontonummer: kontonummerBruker ?? undefined};

        const data = await mutateAsync({soknadId, data: input});

        queryClient.setQueryData(queryKey, data);
    };

    return {
        data,
        updateKontoInformasjon,
        isLoading,
    };
};

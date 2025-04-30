import {
    useGetKontonummer,
    useUpdateKontoInformasjonBruker,
} from "../../../generated/new/kontonummer-controller/kontonummer-controller.ts";
import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {
    HarIkkeKontoInput,
    HarIkkeKontoInputType,
    KontonummerBrukerInput,
    KontonummerBrukerInputType,
    UpdateKontoInformasjonBrukerBody,
} from "../../../generated/new/model";

const getKontonummerFromVariables = (kontoInput: HarIkkeKontoInput | KontonummerBrukerInput, fallback?: string) => {
    if (kontoInput.type === KontonummerBrukerInputType.KontonummerBruker) {
        return kontoInput.kontonummer ?? fallback;
    }
};

export const useKontonummer = () => {
    const soknadId = useSoknadId();
    const {data, isLoading, queryKey} = useGetKontonummer(soknadId);
    const queryClient = useQueryClient();
    const {mutate, variables, isPending} = useUpdateKontoInformasjonBruker({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})},
    });

    const kontonummer = isPending
        ? getKontonummerFromVariables(variables?.data, data?.kontonummerRegister)
        : data?.kontonummerBruker || data?.kontonummerRegister;

    const isBrukerUtfylt: boolean = isPending
        ? variables?.data.type === KontonummerBrukerInputType.KontonummerBruker && !!variables?.data.kontonummer
        : !!data?.kontonummerBruker;

    const harIkkeKonto = isPending ? variables?.data.type === HarIkkeKontoInputType.HarIkkeKonto : data?.harIkkeKonto;

    const updateKontoInformasjon = (harIkkeKonto?: boolean | null, kontonummer?: string | null) => {
        const data: UpdateKontoInformasjonBrukerBody = harIkkeKonto
            ? {type: HarIkkeKontoInputType.HarIkkeKonto, harIkkeKonto}
            : {type: KontonummerBrukerInputType.KontonummerBruker, kontonummer: kontonummer ?? undefined};

        return mutate({soknadId, data});
    };

    return {kontonummer, harIkkeKonto, updateKontoInformasjon, isLoading, isBrukerUtfylt: isBrukerUtfylt};
};

import {
    useGetKontonummer,
    useUpdateKontoInformasjonBruker,
} from "../../../generated/new/kontonummer-controller/kontonummer-controller.ts";
import {useBehandlingsId} from "../common/useBehandlingsId.ts";
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
    const behandlingsId = useBehandlingsId();
    const {data, isLoading, queryKey} = useGetKontonummer(behandlingsId);
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

        return mutate({soknadId: behandlingsId, data});
    };

    return {kontonummer, harIkkeKonto, updateKontoInformasjon, isLoading, isBrukerUtfylt: isBrukerUtfylt};
};

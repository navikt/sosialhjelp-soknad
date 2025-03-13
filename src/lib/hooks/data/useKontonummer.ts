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

const getKontonummerFromVariables = (kontoInput: HarIkkeKontoInput | KontonummerBrukerInput) => {
    if (kontoInput.type === KontonummerBrukerInputType.KontonummerBruker) {
        return kontoInput.kontonummer;
    }
};

export const useKontonummer = () => {
    const behandlingsId = useBehandlingsId();
    const {data, isLoading, queryKey} = useGetKontonummer(behandlingsId);
    const queryClient = useQueryClient();
    const {mutate, variables, isPending} = useUpdateKontoInformasjonBruker({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})},
    });

    console.log("data", data?.kontonummerBruker);

    const kontonummer = isPending
        ? getKontonummerFromVariables(variables?.data)
        : data?.kontonummerBruker || data?.kontonummerRegister;

    const isBrukerUtfylt = isPending
        ? variables?.data.type === KontonummerBrukerInputType.KontonummerBruker
        : data?.kontonummerBruker;

    const harIkkeKonto = isPending ? variables?.data.type === HarIkkeKontoInputType.HarIkkeKonto : data?.harIkkeKonto;

    const updateKontoInformasjon = (kontonummer: string | undefined, harIkkeKonto: boolean) => {
        const data: UpdateKontoInformasjonBrukerBody = harIkkeKonto
            ? {type: HarIkkeKontoInputType.HarIkkeKonto, harIkkeKonto}
            : {type: KontonummerBrukerInputType.KontonummerBruker, kontonummer};

        return mutate({soknadId: behandlingsId, data});
    };

    return {kontonummer, harIkkeKonto, updateKontoInformasjon, isLoading, isBrukerUtfylt: isBrukerUtfylt};
};

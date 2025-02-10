import {useGetBostotte, useUpdateBostotte} from "../../../generated/new/bostotte-controller/bostotte-controller";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";

export const useInntekterBostotte = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data: bostotte, queryKey, isPending} = useGetBostotte(behandlingsId);
    const {
        mutate,
        isPending: isUpdatePending,
        variables,
    } = useUpdateBostotte({
        mutation: {
            onSettled: () => queryClient.invalidateQueries({queryKey}),
        },
    });

    const setSamtykke = async (nyttHarSamtykke: boolean) => {
        if (!bostotte) return;
        // FIXME: Replace with contentful PUT
        mutate({soknadId: behandlingsId, data: {hasSamtykke: nyttHarSamtykke}});
        await queryClient.invalidateQueries({queryKey});
    };

    const setBekreftelse = async (harInntektHusbanken: boolean) => {
        mutate({soknadId: behandlingsId, data: {hasBostotte: harInntektHusbanken}});
    };

    const setBostotte = async (harBekreftelse: boolean, harSamtykke?: boolean) => {
        mutate({soknadId: behandlingsId, data: {hasBostotte: harBekreftelse, hasSamtykke: harSamtykke}});
    };

    const bekreftelse = bostotte?.hasBostotte;

    // Tidspunkt for mottatt samtykke ellers false
    const tidSamtykkeMottatt =
        !!bostotte?.hasSamtykke && !!bostotte?.samtykkeTidspunkt && new Date(bostotte.samtykkeTidspunkt);

    const dataHentet = !!bostotte?.hasSamtykke; //&& !bostotte?.stotteFraHusbankenFeilet;

    return {
        bostotte,
        bekreftelse,
        tidSamtykkeMottatt,
        dataHentet,
        setSamtykke,
        setBekreftelse,
        isUpdatePending,
        isQueryPending: isPending,
        setBostotte,
        variables,
    };
};

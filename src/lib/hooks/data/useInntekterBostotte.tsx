import {useGetBostotte, useUpdateBostotte} from "../../../generated/new/bostotte-controller/bostotte-controller";
import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";

export const useInntekterBostotte = () => {
    const soknadId = useSoknadId();
    const queryClient = useQueryClient();
    const {data: bostotte, queryKey, isPending} = useGetBostotte(soknadId);
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
        mutate({soknadId, data: {hasSamtykke: nyttHarSamtykke}});
    };

    const setBekreftelse = async (harInntektHusbanken: boolean) => {
        mutate({soknadId, data: {hasBostotte: harInntektHusbanken}});
    };

    const setBostotte = async (harBekreftelse: boolean, harSamtykke?: boolean) => {
        mutate({soknadId, data: {hasBostotte: harBekreftelse, hasSamtykke: harSamtykke}});
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

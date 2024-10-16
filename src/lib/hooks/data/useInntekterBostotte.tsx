import {useBehandlingsId} from "../common/useBehandlingsId";
import {updateBostotte, updateSamtykke2, useHentBostotte} from "../../../generated/bostotte-ressurs/bostotte-ressurs";
import {useQueryClient} from "@tanstack/react-query";

export const useInntekterBostotte = (skipFirstStep?: boolean) => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data: bostotte, queryKey} = useHentBostotte(behandlingsId);

    const isLoading = false;
    const setSamtykke = async (nyttHarSamtykke: boolean) => {
        if (!bostotte) return;
        // FIXME: Replace with contentful PUT
        await updateSamtykke2(behandlingsId, nyttHarSamtykke);
        await queryClient.invalidateQueries({queryKey});
    };

    const setBekreftelse = async (harInntektHusbanken: boolean) => {
        if (!bostotte) return;

        const samtykke = skipFirstStep ? undefined : harInntektHusbanken ? bostotte.samtykke : false;
        const oppdatert = {
            ...bostotte,
            bekreftelse: harInntektHusbanken,
            samtykke,
        };

        if (!harInntektHusbanken) await updateSamtykke2(behandlingsId, false);

        await updateBostotte(behandlingsId, oppdatert);
        await queryClient.invalidateQueries({queryKey});
    };
    if (skipFirstStep) {
        setBekreftelse(true);
    }

    const bekreftelse = bostotte?.bekreftelse;

    // Tidspunkt for mottatt samtykke ellers false
    const tidSamtykkeMottatt =
        !!bostotte?.samtykke && !!bostotte?.samtykkeTidspunkt && new Date(bostotte.samtykkeTidspunkt);

    const dataHentet = !!bostotte?.samtykke; //&& !bostotte?.stotteFraHusbankenFeilet;

    return {bostotte, bekreftelse, tidSamtykkeMottatt, dataHentet, setSamtykke, setBekreftelse, isLoading};
};

import {useBehandlingsId} from "../common/useBehandlingsId";
import {useFeatureFlags} from "../../config";
import * as React from "react";
import {useEffect} from "react";
import {
    getHentBegrunnelseQueryOptions,
    updateBegrunnelse,
    useHentBegrunnelse,
} from "../../../generated/client/begrunnelse-ressurs/begrunnelse-ressurs";
import {BegrunnelseFrontend} from "../../../generated/client/model";
import {faro} from "@grafana/faro-react";
import {useQueryClient} from "@tanstack/react-query";
import {logAmplitudeEvent} from "../../amplitude/Amplitude";
//import {useAmplitude} from "../../amplitude/useAmplitude";

export const useBegrunnelse = () => {
    const behandlingsId = useBehandlingsId();
    //const {logEvent} = useAmplitude();

    // TODO: Avklare denne. Er det behov lenger?
    const {begrunnelseNyTekst} = useFeatureFlags();
    const [isError, setIsError] = React.useState(false);
    const queryClient = useQueryClient();
    const {isPending, queryKey} = useHentBegrunnelse(behandlingsId);

    // Returnerer promise som resolver til dataen når den er klar.
    // For bruk med react-hook-form defaultValues.
    const get = (): Promise<BegrunnelseFrontend> =>
        queryClient.ensureQueryData(getHentBegrunnelseQueryOptions(behandlingsId));

    // Lagrer data på backend og oppdaterer lokal cache.
    const put = async (begrunnelse: BegrunnelseFrontend) => {
        await logAmplitudeEvent("begrunnelse fullført", {
            hvaLengde: (Math.round((begrunnelse?.hvaSokesOm?.length ?? 0) / 20) - 1) * 20,
            hvorforLengde: (Math.round((begrunnelse?.hvorforSoke?.length ?? 0) / 20) - 1) * 20,
            begrunnelseNyTekst,
        });

        try {
            queryClient.setQueryData(queryKey, begrunnelse);
            await updateBegrunnelse(behandlingsId, begrunnelse);
        } catch (e: any) {
            setIsError(true);
            faro.api.pushError(e);
            throw e;
        }
    };

    useEffect(() => {
        logAmplitudeEvent("begrunnelse åpnet", {begrunnelseNyTekst});
    }, [begrunnelseNyTekst]);

    return {get, put, isPending, isError};
};

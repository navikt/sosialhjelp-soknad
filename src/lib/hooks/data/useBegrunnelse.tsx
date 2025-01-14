import {useBehandlingsId} from "../common/useBehandlingsId";
import * as React from "react";
import {useEffect} from "react";
import {
    getHentBegrunnelseQueryOptions,
    updateBegrunnelse,
    useHentBegrunnelse,
} from "../../../generated/begrunnelse-ressurs/begrunnelse-ressurs";
import {BegrunnelseFrontend} from "../../../generated/model";
import {faro} from "@grafana/faro-react";
import {useQueryClient} from "@tanstack/react-query";
import {logAmplitudeEvent} from "../../amplitude/Amplitude";

export const useBegrunnelse = () => {
    const behandlingsId = useBehandlingsId();

    const [isError, setIsError] = React.useState(false);
    const queryClient = useQueryClient();
    const {isPending, queryKey} = useHentBegrunnelse(behandlingsId);

    // Returnerer promise som resolver til dataen når den er klar.
    // For bruk med react-hook-form defaultValues.
    const get = (): Promise<BegrunnelseFrontend> =>
        queryClient.ensureQueryData(getHentBegrunnelseQueryOptions(behandlingsId));

    // Lagrer data på backend og oppdaterer lokal cache.
    const put = async (begrunnelse: BegrunnelseFrontend) => {
        logAmplitudeEvent("begrunnelse fullført", {
            hvaLengde: (Math.round((begrunnelse?.hvaSokesOm?.length ?? 0) / 20) - 1) * 20,
            hvorforLengde: (Math.round((begrunnelse?.hvorforSoke?.length ?? 0) / 20) - 1) * 20,
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
        logAmplitudeEvent("begrunnelse åpnet").then();
    }, [true]);

    return {get, put, isPending, isError};
};

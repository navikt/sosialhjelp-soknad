import {useBehandlingsId} from "../common/useBehandlingsId";
import {useEffect} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {logAmplitudeEvent} from "../../amplitude/Amplitude";
import {
    useGetBegrunnelse,
    useUpdateBegrunnelse,
} from "../../../generated/new/begrunnelse-controller/begrunnelse-controller.ts";
import {BegrunnelseDto, type HarHvaSokesOmInput} from "../../../generated/new/model/index.ts";
import {HarKategorierInput} from "../../../generated/new-ssr/model";

export const useBegrunnelse = () => {
    const behandlingsId = useBehandlingsId();

    const queryClient = useQueryClient();
    const {data, isLoading, queryKey} = useGetBegrunnelse(behandlingsId);
    const invalidate = () => queryClient.invalidateQueries({queryKey});
    const {mutate, isPending, variables, isError} = useUpdateBegrunnelse({
        mutation: {onSettled: invalidate},
    });

    // Lagrer data på backend og oppdaterer lokal cache.
    const updateBegrunnelse = (begrunnelse: Omit<HarHvaSokesOmInput, "type">) => {
        logAmplitudeEvent("begrunnelse fullført", {
            hvaLengde: (Math.round((begrunnelse?.hvaSokesOm?.length ?? 0) / 20) - 1) * 20,
            hvorforLengde: (Math.round((begrunnelse?.hvorforSoke?.length ?? 0) / 20) - 1) * 20,
        });

        mutate({
            soknadId: behandlingsId,
            data: {type: "HarHvaSokesOm", ...begrunnelse},
        });
    };

    const updateCategories = (kategorier: Omit<HarKategorierInput, "type">) => {
        mutate({soknadId: behandlingsId, data: {type: "HarKategorier", ...kategorier}});
    };

    useEffect(() => {
        logAmplitudeEvent("begrunnelse åpnet").then();
    }, []);

    const begrunnelse: BegrunnelseDto | undefined = isPending
        ? {
              hvaSokesOm: variables.data.type === "HarHvaSokesOm" ? variables.data.hvaSokesOm : "",
              hvorforSoke: variables.data.hvorforSoke,
              kategorier:
                  variables.data.type === "HarKategorier"
                      ? {annet: variables.data.annet, definerte: variables.data.kategorier}
                      : {annet: "", definerte: []},
          }
        : data;

    return {begrunnelse, updateBegrunnelse, updateCategories, isLoading, isError, invalidate};
};

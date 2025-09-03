import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {
    useGetBegrunnelse,
    useUpdateBegrunnelse,
} from "../../../generated/new/begrunnelse-controller/begrunnelse-controller.ts";
import {BegrunnelseDto, type HarHvaSokesOmInput} from "../../../generated/new/model/index.ts";
import {HarKategorierInput} from "../../../generated/new-ssr/model";

export const useBegrunnelse = () => {
    const soknadId = useSoknadId();

    const queryClient = useQueryClient();
    const {data, isLoading, queryKey} = useGetBegrunnelse(soknadId);
    const invalidate = () => queryClient.invalidateQueries({queryKey});
    const {mutate, isPending, variables, isError} = useUpdateBegrunnelse({
        mutation: {onSettled: invalidate},
    });

    // Lagrer data på backend og oppdaterer lokal cache.
    const updateBegrunnelse = (begrunnelse: Omit<HarHvaSokesOmInput, "type">) => {
        mutate({
            soknadId,
            data: {type: "HarHvaSokesOm", ...begrunnelse},
        });
    };

    const updateCategories = (kategorier: Omit<HarKategorierInput, "type">) => {
        mutate({soknadId, data: {type: "HarKategorier", ...kategorier}});
    };

    const begrunnelse: BegrunnelseDto | undefined = isPending
        ? {
              hvaSokesOm: variables.data.type === "HarHvaSokesOm" ? variables.data.hvaSokesOm : "",
              hvorforSoke: variables.data.type === "HarHvaSokesOm" ? variables.data.hvorforSoke : "",
              kategorier:
                  variables.data.type === "HarKategorier"
                      ? {annet: variables.data.annet, definerte: variables.data.kategorier}
                      : {annet: "", definerte: []},
          }
        : data;

    return {begrunnelse, updateBegrunnelse, updateCategories, isLoading, isError, invalidate};
};

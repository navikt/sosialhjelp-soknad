import {Result} from "@swan-io/boxed";
import {QueryKey, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {useBehandlingsId} from "./useBehandlingsId";
import {faro} from "@grafana/faro-react";

/**
 * Placeholder-type
 */
type TError = any;

export type UseDigisosResult<InputDTO, OutputDTO> = {
    mutate: (data: InputDTO) => Promise<Result<OutputDTO, TError>>;
    isLoading: boolean;
};

export const useDigisosMutation = <TOutput, TInput>(
    getHook: (behandlingsId: string) => UseQueryResult<TOutput | undefined, TError> & {queryKey: QueryKey},
    mutator: (behandlingsId: string, data: TInput) => Promise<TOutput>
): UseDigisosResult<TInput, TOutput> => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {isLoading, queryKey} = getHook(behandlingsId);

    const mutate = async (data: TInput) => {
        try {
            const mutatedResource = await mutator(behandlingsId, data);
            queryClient.setQueryData(queryKey, mutatedResource);
            return Result.Ok(mutatedResource);
        } catch (e: any) {
            faro.api.pushError(e);
            return Result.Error(e);
        }
    };

    return {
        mutate,
        isLoading,
    };
};

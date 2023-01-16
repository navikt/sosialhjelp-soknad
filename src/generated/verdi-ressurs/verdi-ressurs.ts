/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {useQuery, useMutation} from "@tanstack/react-query";
import type {
    UseQueryOptions,
    UseMutationOptions,
    QueryFunction,
    MutationFunction,
    UseQueryResult,
    QueryKey,
} from "@tanstack/react-query";
import type {VerdierFrontend} from ".././model";
import {axiosInstance} from "../../lib/orval/axios-instance";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (config: any, args: infer P) => any ? P : never;

export const hentVerdier = (
    behandlingsId: string,
    options?: SecondParameter<typeof axiosInstance>,
    signal?: AbortSignal
) => {
    return axiosInstance<VerdierFrontend>(
        {url: `/soknader/${behandlingsId}/inntekt/verdier`, method: "get", signal},
        options
    );
};

export const getHentVerdierQueryKey = (behandlingsId: string) => [`/soknader/${behandlingsId}/inntekt/verdier`];

export type HentVerdierQueryResult = NonNullable<Awaited<ReturnType<typeof hentVerdier>>>;
export type HentVerdierQueryError = unknown;

export const useHentVerdier = <TData = Awaited<ReturnType<typeof hentVerdier>>, TError = unknown>(
    behandlingsId: string,
    options?: {
        query?: UseQueryOptions<Awaited<ReturnType<typeof hentVerdier>>, TError, TData>;
        request?: SecondParameter<typeof axiosInstance>;
    }
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getHentVerdierQueryKey(behandlingsId);

    const queryFn: QueryFunction<Awaited<ReturnType<typeof hentVerdier>>> = ({signal}) =>
        hentVerdier(behandlingsId, requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof hentVerdier>>, TError, TData>(queryKey, queryFn, {
        enabled: !!behandlingsId,
        ...queryOptions,
    }) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};

export const updateVerdier = (
    behandlingsId: string,
    verdierFrontend: VerdierFrontend,
    options?: SecondParameter<typeof axiosInstance>
) => {
    return axiosInstance<void>(
        {
            url: `/soknader/${behandlingsId}/inntekt/verdier`,
            method: "put",
            headers: {"Content-Type": "application/json"},
            data: verdierFrontend,
        },
        options
    );
};

export type UpdateVerdierMutationResult = NonNullable<Awaited<ReturnType<typeof updateVerdier>>>;
export type UpdateVerdierMutationBody = VerdierFrontend;
export type UpdateVerdierMutationError = unknown;

export const useUpdateVerdier = <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<
        Awaited<ReturnType<typeof updateVerdier>>,
        TError,
        {behandlingsId: string; data: VerdierFrontend},
        TContext
    >;
    request?: SecondParameter<typeof axiosInstance>;
}) => {
    const {mutation: mutationOptions, request: requestOptions} = options ?? {};

    const mutationFn: MutationFunction<
        Awaited<ReturnType<typeof updateVerdier>>,
        {behandlingsId: string; data: VerdierFrontend}
    > = (props) => {
        const {behandlingsId, data} = props ?? {};

        return updateVerdier(behandlingsId, data, requestOptions);
    };

    return useMutation<
        Awaited<ReturnType<typeof updateVerdier>>,
        TError,
        {behandlingsId: string; data: VerdierFrontend},
        TContext
    >(mutationFn, mutationOptions);
};

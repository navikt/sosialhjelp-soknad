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
import type {FormueFrontend} from ".././model";
import {axiosInstance} from "../../lib/orval/axios-instance";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (config: any, args: infer P) => any ? P : never;

export const hentFormue = (
    behandlingsId: string,
    options?: SecondParameter<typeof axiosInstance>,
    signal?: AbortSignal
) => {
    return axiosInstance<FormueFrontend>(
        {url: `/soknader/${behandlingsId}/inntekt/formue`, method: "get", signal},
        options
    );
};

export const getHentFormueQueryKey = (behandlingsId: string) => [`/soknader/${behandlingsId}/inntekt/formue`];

export type HentFormueQueryResult = NonNullable<Awaited<ReturnType<typeof hentFormue>>>;
export type HentFormueQueryError = unknown;

export const useHentFormue = <TData = Awaited<ReturnType<typeof hentFormue>>, TError = unknown>(
    behandlingsId: string,
    options?: {
        query?: UseQueryOptions<Awaited<ReturnType<typeof hentFormue>>, TError, TData>;
        request?: SecondParameter<typeof axiosInstance>;
    }
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getHentFormueQueryKey(behandlingsId);

    const queryFn: QueryFunction<Awaited<ReturnType<typeof hentFormue>>> = ({signal}) =>
        hentFormue(behandlingsId, requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof hentFormue>>, TError, TData>(queryKey, queryFn, {
        enabled: !!behandlingsId,
        ...queryOptions,
    }) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};

export const updateFormue = (
    behandlingsId: string,
    formueFrontend: FormueFrontend,
    options?: SecondParameter<typeof axiosInstance>
) => {
    return axiosInstance<void>(
        {
            url: `/soknader/${behandlingsId}/inntekt/formue`,
            method: "put",
            headers: {"Content-Type": "application/json"},
            data: formueFrontend,
        },
        options
    );
};

export type UpdateFormueMutationResult = NonNullable<Awaited<ReturnType<typeof updateFormue>>>;
export type UpdateFormueMutationBody = FormueFrontend;
export type UpdateFormueMutationError = unknown;

export const useUpdateFormue = <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<
        Awaited<ReturnType<typeof updateFormue>>,
        TError,
        {behandlingsId: string; data: FormueFrontend},
        TContext
    >;
    request?: SecondParameter<typeof axiosInstance>;
}) => {
    const {mutation: mutationOptions, request: requestOptions} = options ?? {};

    const mutationFn: MutationFunction<
        Awaited<ReturnType<typeof updateFormue>>,
        {behandlingsId: string; data: FormueFrontend}
    > = (props) => {
        const {behandlingsId, data} = props ?? {};

        return updateFormue(behandlingsId, data, requestOptions);
    };

    return useMutation<
        Awaited<ReturnType<typeof updateFormue>>,
        TError,
        {behandlingsId: string; data: FormueFrontend},
        TContext
    >(mutationFn, mutationOptions);
};

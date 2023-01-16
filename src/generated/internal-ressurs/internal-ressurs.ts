/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {useQuery} from "@tanstack/react-query";
import type {UseQueryOptions, QueryFunction, UseQueryResult, QueryKey} from "@tanstack/react-query";
import type {SelftestResult} from ".././model";
import {axiosInstance} from "../../lib/orval/axios-instance";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (config: any, args: infer P) => any ? P : never;

export const getSelftest = (options?: SecondParameter<typeof axiosInstance>, signal?: AbortSignal) => {
    return axiosInstance<SelftestResult>({url: `/internal/selftest`, method: "get", signal}, options);
};

export const getGetSelftestQueryKey = () => [`/internal/selftest`];

export type GetSelftestQueryResult = NonNullable<Awaited<ReturnType<typeof getSelftest>>>;
export type GetSelftestQueryError = unknown;

export const useGetSelftest = <TData = Awaited<ReturnType<typeof getSelftest>>, TError = unknown>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSelftest>>, TError, TData>;
    request?: SecondParameter<typeof axiosInstance>;
}): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getGetSelftestQueryKey();

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getSelftest>>> = ({signal}) =>
        getSelftest(requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof getSelftest>>, TError, TData>(
        queryKey,
        queryFn,
        queryOptions
    ) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};

export const isAlive = (options?: SecondParameter<typeof axiosInstance>, signal?: AbortSignal) => {
    return axiosInstance<string>({url: `/internal/isAlive`, method: "get", signal}, options);
};

export const getIsAliveQueryKey = () => [`/internal/isAlive`];

export type IsAliveQueryResult = NonNullable<Awaited<ReturnType<typeof isAlive>>>;
export type IsAliveQueryError = unknown;

export const useIsAlive = <TData = Awaited<ReturnType<typeof isAlive>>, TError = unknown>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof isAlive>>, TError, TData>;
    request?: SecondParameter<typeof axiosInstance>;
}): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getIsAliveQueryKey();

    const queryFn: QueryFunction<Awaited<ReturnType<typeof isAlive>>> = ({signal}) => isAlive(requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof isAlive>>, TError, TData>(
        queryKey,
        queryFn,
        queryOptions
    ) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};

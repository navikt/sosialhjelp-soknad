/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {useQuery} from "@tanstack/react-query";
import type {UseQueryOptions, QueryFunction, UseQueryResult, QueryKey} from "@tanstack/react-query";
import type {InnsendtSoknadDto} from ".././model";
import {axiosInstance} from "../../lib/orval/axios-instance";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (config: any, args: infer P) => any ? P : never;

export const ping = (options?: SecondParameter<typeof axiosInstance>, signal?: AbortSignal) => {
    return axiosInstance<string>({url: `/minesaker/ping`, method: "get", signal}, options);
};

export const getPingQueryKey = () => [`/minesaker/ping`];

export type PingQueryResult = NonNullable<Awaited<ReturnType<typeof ping>>>;
export type PingQueryError = unknown;

export const usePing = <TData = Awaited<ReturnType<typeof ping>>, TError = unknown>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof ping>>, TError, TData>;
    request?: SecondParameter<typeof axiosInstance>;
}): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getPingQueryKey();

    const queryFn: QueryFunction<Awaited<ReturnType<typeof ping>>> = ({signal}) => ping(requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof ping>>, TError, TData>(
        queryKey,
        queryFn,
        queryOptions
    ) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};

export const hentInnsendteSoknaderForBruker1 = (
    options?: SecondParameter<typeof axiosInstance>,
    signal?: AbortSignal
) => {
    return axiosInstance<InnsendtSoknadDto[]>({url: `/minesaker/innsendte`, method: "get", signal}, options);
};

export const getHentInnsendteSoknaderForBruker1QueryKey = () => [`/minesaker/innsendte`];

export type HentInnsendteSoknaderForBruker1QueryResult = NonNullable<
    Awaited<ReturnType<typeof hentInnsendteSoknaderForBruker1>>
>;
export type HentInnsendteSoknaderForBruker1QueryError = unknown;

export const useHentInnsendteSoknaderForBruker1 = <
    TData = Awaited<ReturnType<typeof hentInnsendteSoknaderForBruker1>>,
    TError = unknown
>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof hentInnsendteSoknaderForBruker1>>, TError, TData>;
    request?: SecondParameter<typeof axiosInstance>;
}): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getHentInnsendteSoknaderForBruker1QueryKey();

    const queryFn: QueryFunction<Awaited<ReturnType<typeof hentInnsendteSoknaderForBruker1>>> = ({signal}) =>
        hentInnsendteSoknaderForBruker1(requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof hentInnsendteSoknaderForBruker1>>, TError, TData>(
        queryKey,
        queryFn,
        queryOptions
    ) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};

"use client";
import {AsyncData, Result} from "@swan-io/boxed";
import {ReactElement, useMemo} from "react";
import {UseQueryResult} from "@tanstack/react-query";
import {TextPlaceholder} from "../../../lib/components/animasjoner/TextPlaceholder";
import {useGETErrorHandler} from "./useGETErrorHandler";
import {AxiosError} from "axios";

type OKExpecter<TData> = (okHandler: (value: TData) => ReactElement | null) => ReactElement | null;

type UseAlgebraicResult<TData, TError> = UseQueryResult<TData, TError> & {
    request: AsyncData<Result<TData, TError>>;

    /**
     * If the request is successful, runs the callback and returns its value.
     *
     * Errors are handled with the global GET error handler hook,
     * and loading is by default indicated with a default text placeholder.
     */
    expectOK: OKExpecter<Exclude<TData, undefined>>;
};

// Not fully sure why I need to intersect these types, but FWIW,
// I did it to ensure that typeof data == TData and typeof error == TError...
type UseQueryHookResult<TData, TError> = UseQueryResult<TData, TError> & {data: TData; error: TError};

//
// Type guards
//

/**
 * Resolves a React Query hook result into an AsyncData<Result> which can be used with a match chain.
 *
 * @param result - return value from a React Query parameter
 * @see {@link https://swan-io.github.io/boxed/core-concepts Boxed core concepts}
 */
const resolveQueryState = <TData, TError>(
    result: UseQueryHookResult<TData, TError>
): AsyncData<Result<TData, TError>> => {
    const {error, data, status} = result;

    switch (status) {
        case "error":
            return AsyncData.Done(Result.Error(error));
        case "success":
            return AsyncData.Done(Result.Ok(data));
        case "pending":
            return AsyncData.Loading();
    }
};

/**
 * Wraps a React Query request as an algebraic data type through the Boxed library.
 * This can be a useful time-saver for some use cases, e.g. where the component only
 * displays data based on a GET request,
 *
 * @see {@link https://www.youtube.com/watch?v=4co_az7ipMA Talk which inspired me to write this}
 * @see {@link https://swan-io.github.io/boxed/ Library documentation for Boxed}
 *
 * @example
 *  const {expectOK} = useAlgebraic(useHentKontonummer(behandlingsId));
 *  // The callback will only be called if the query succeeds, otherwise
 *  // a loader will be displayed for the loading state and an error
 *  // is handled with the GETErrorHandler.
 *  return expectOK((data) => (<div>Hello {data}</div>);
 *
 * @param queryResult - Return value of a React Queryhook
 *
 * @param loadPlaceholder - Optional. Component to be shown while loading, defaults to <TextPlaceholder lines={1} />
 *
 * @returns
 *      Returns everything it's passed, additionally:
 *
 *      request - Data and error wrapped as a Result inside an AsyncData
 *
 *      Returverdien fra React Query-hooken, pluss request og expectOK
 */
export const useAlgebraic = <TData, TError extends AxiosError | null>(
    queryResult: UseQueryHookResult<TData, TError>,
    loadPlaceholder: ReactElement = <TextPlaceholder lines={1} />
): UseAlgebraicResult<TData, TError> => {
    const {GETErrorHandler} = useGETErrorHandler();
    const request = useMemo(() => resolveQueryState(queryResult), [queryResult]);

    // Rename this to "ideally"?
    const expectOK: OKExpecter<Exclude<TData, undefined>> = (okHandler) =>
        request.match({
            NotAsked: () => null,
            Loading: () => loadPlaceholder,
            Done: (response) =>
                response.match({
                    Error: GETErrorHandler,
                    Ok: (response) => okHandler(response as Exclude<TData, undefined>),
                }),
        });

    // By the time the result is Ok, TData will not be undefined -
    // so we exclude it to save unnecessary checking for undefined
    // in the .match chain.
    return {...queryResult, expectOK, request};
};

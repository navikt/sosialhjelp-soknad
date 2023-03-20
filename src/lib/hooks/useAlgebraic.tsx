import {AsyncData, Result} from "@swan-io/boxed";
import {ReactElement, useEffect, useState} from "react";
import {QueryObserverLoadingErrorResult, QueryObserverSuccessResult, UseQueryResult} from "@tanstack/react-query";
import TextPlaceholder from "../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {useGETErrorHandler} from "./useGETErrorHandler";
import {AxiosError} from "axios";

type OKExpecter<TData> = (okHandler: (value: Exclude<TData, undefined>) => ReactElement | null) => ReactElement | null;

type UseAlgebraicResult<TData, TError> = UseQueryResult<TData, TError> & {
    request: AsyncData<Result<TData, TError>>;

    /**
     * If the request is successful, runs the callback and returns its value.
     *
     * Errors are handled with the global GET error handler hook,
     * and loading is by default indicated with a default text placeholder.
     */
    expectOK: OKExpecter<TData>;
};

// Not fully sure why I need to intersect these types, but FWIW,
// I did it to ensure that typeof data == TData and typeof error == TError...
type UseQueryHookResult<TData, TError> = UseQueryResult<TData, TError> & {data: TData; error: TError};

// The return type is typed explicitly so if react-query ever gets more than three
// states, this will refuse to compile.
const resolveQueryState = <TData, TError>({
    status,
}: UseQueryHookResult<TData, TError>): ((queryResult: any) => AsyncData<Result<TData, TError>>) => {
    switch (status) {
        case "loading":
            return AsyncData.Loading;
        case "success":
            return ({data}: QueryObserverSuccessResult<TData, TError>) => AsyncData.Done(Result.Ok(data));
        case "error":
            return ({error}: QueryObserverLoadingErrorResult<TData, TError>) => AsyncData.Done(Result.Error(error));
    }
};

/**
 * Wraps a React Query request as an algebraic data type through the Boxed library.
 * This can be a useful time-saver for some use cases, eg. where the component only
 * displays data based on a GET request,
 *
 * @see {@link https://www.youtube.com/watch?v=4co_az7ipMA Talk which inspired me to write this}
 * @see {@link https://swan-io.github.io/boxed/ Library documentation for Boxed}
 *
 * @example
 *  const {expectOK} = useAlgebraic(useHentKontonummer(behandlingsId));
 *  return expectOK((data) => (<div>Hello {data}</div>);
 *
 * @param queryResult - Return value of a React Queryhook
 *
 * @param loadPlaceholder - Component to be shown while loading
 *
 * @returns
 *      Returns everything it's passed, additionally:
 *
 *      request - Data and error wrapped as a Result inside an AsyncData
 *
 *      Returverdien fra React Query-hooken, pluss request og expectOK
 */
// Rename this to useOptimism?
export const useAlgebraic = <TData, TError extends AxiosError | null>(
    queryResult: UseQueryHookResult<TData, TError>,
    loadPlaceholder: ReactElement = <TextPlaceholder lines={1} />
) => {
    const [request, setRequest] = useState(AsyncData.NotAsked<Result<TData, TError>>());
    const {GETErrorHandler} = useGETErrorHandler();

    useEffect(() => setRequest(resolveQueryState(queryResult)(queryResult)), [queryResult]);

    // Rename this to ideally?
    const expectOK: OKExpecter<TData> = (okHandler) =>
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
    const retval: UseAlgebraicResult<TData, TError> = {...queryResult, expectOK, request};
    return retval;
};

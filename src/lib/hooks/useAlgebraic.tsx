import {AsyncData, Result} from "@swan-io/boxed";
import {ReactElement, useEffect, useState} from "react";
import {QueryStatus} from "@tanstack/query-core/src/types";
import {UseQueryResult} from "@tanstack/react-query";
import TextPlaceholder from "../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import * as React from "react";
import {useErrorHandler} from "./useErrorHandler";

type Maybe<T> = T | null;
type RequestHandler<TData> = (okHandler: (response: TData) => Maybe<ReactElement>) => Maybe<ReactElement>;

type UseAlgebraicResult<TData, TError> = {
    // By the time the result is Ok, TData will not be undefined -
    // so we exclude it to save unnecessary checking for undefined
    // in the .match chain.
    request: AsyncData<Result<Exclude<TData, undefined>, TError>>;
    expectOK: RequestHandler<Exclude<TData, undefined>>;
} & UseQueryResult<TData, TError>;

export const useAlgebraic = <TData, TError>({
    data,
    status,
    error,
    ...rest
}: {
    data: TData;
    status: QueryStatus;
    error: TError;
}): UseAlgebraicResult<TData, TError> => {
    const errorHandler = useErrorHandler();
    const [request, setRequest] = useState(AsyncData.NotAsked<Result<TData, TError>>);

    useEffect(() => {
        const queryStates: Record<QueryStatus, () => AsyncData<Result<TData, TError>>> = {
            loading: () => AsyncData.Loading(),
            success: () => AsyncData.Done(Result.Ok(data)),
            error: () => AsyncData.Done(Result.Error(error)),
        };
        setRequest(queryStates[status]());
    }, [status, data, error]);

    const expectOK: RequestHandler<TData> = (okHandler) => {
        return request.match({
            NotAsked: () => null,
            Loading: () => <TextPlaceholder lines={1} />,
            Done: (response) =>
                response.match({
                    Error: errorHandler,
                    Ok: okHandler,
                }),
        });
    };

    return {...rest, status, data, error, expectOK, request} as UseAlgebraicResult<TData, TError>;
};

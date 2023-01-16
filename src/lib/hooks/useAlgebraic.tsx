import {AsyncData, Result} from "@swan-io/boxed";
import {useEffect, useState} from "react";
import {QueryStatus} from "@tanstack/query-core/src/types";
import {UseQueryResult} from "@tanstack/react-query";

type UseAlgebraicResult<TData, TError> = {
    // By the time the result is Ok, TData will not be undefined -
    // so we exclude it to save unnecessary checking for undefined
    // in the .match chain.
    request: AsyncData<Result<Exclude<TData, undefined>, TError>>;
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
    const [request, setRequest] = useState(AsyncData.NotAsked<Result<TData, TError>>);

    useEffect(() => {
        const queryStates: Record<QueryStatus, () => AsyncData<Result<TData, TError>>> = {
            loading: () => AsyncData.Loading(),
            success: () => AsyncData.Done(Result.Ok(data)),
            error: () => AsyncData.Done(Result.Error(error)),
        };
        setRequest(queryStates[status]());
    }, [status, data, error]);

    return {...rest, status, data, error, request} as UseAlgebraicResult<TData, TError>;
};

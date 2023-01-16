import {AsyncData, Result} from "@swan-io/boxed";
import {useEffect, useState} from "react";
import {QueryStatus} from "@tanstack/query-core/src/types";

export const useAlgebraic = <TData, TError>({
    data,
    status,
    error,
    ...rest
}: {
    data: TData;
    status: QueryStatus;
    error: TError;
}) => {
    const [request, setRequest] = useState(AsyncData.NotAsked<Result<TData, TError>>);

    useEffect(() => {
        switch (status) {
            case "success":
                setRequest(AsyncData.Done(Result.Ok(data!)));
                return;
            case "loading":
                setRequest(AsyncData.Loading);
                return;
            case "error":
                setRequest(AsyncData.Done(Result.Error(error)));
        }
    }, [status, data, error]);

    return {...rest, status, data, error, request};
};

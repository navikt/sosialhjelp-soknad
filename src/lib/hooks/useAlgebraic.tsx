import {UseQueryResult} from "@tanstack/react-query";
import {AsyncData, Result} from "@swan-io/boxed";
import {useEffect, useState} from "react";

// TODO: Document this better
export const useAlgebraic = <A, E = unknown>(
    orvalRequest: UseQueryResult<A | undefined, E>
): AsyncData<Result<A, E>> => {
    const [request, setRequest] = useState(AsyncData.NotAsked<Result<A, E>>);
    const {data, status, error} = orvalRequest;

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
    }, [status]);

    return request;
};

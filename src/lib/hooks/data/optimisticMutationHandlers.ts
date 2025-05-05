import {QueryClient, QueryKey, UseMutationOptions} from "@tanstack/react-query";

type OptimisticHandlers<TData extends object, TVariables extends Partial<TData>> = Pick<
    UseMutationOptions<TData, unknown, {data: TVariables}, {previousData?: TData}>,
    "onMutate" | "onError" | "onSuccess"
>;

const simpleMerge = <TData extends object, TVariables extends Partial<TData>>(
    oldData: TData | undefined,
    variables: TVariables
): TData =>
    ({
        ...(oldData || {}),
        ...variables,
    }) as unknown as TData;

export const optimisticMutationHandlers = <TData extends object, TVariables extends Partial<TData>>(
    queryClient: QueryClient,
    queryKey: QueryKey,
    applyOptimisticUpdate: (oldData: TData | undefined, variables: TVariables) => TData = simpleMerge,
    mergeServerResponse?: (oldData: TData | undefined, newData: TData) => TData
): OptimisticHandlers<TData, TVariables> => ({
    onMutate: async (variables) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({queryKey});

        // Snapshot the previous value
        const previousData = queryClient.getQueryData<TData>(queryKey);

        const optimism = applyOptimisticUpdate(previousData, variables.data);
        // Optimistically update to the new value
        queryClient.setQueryData(queryKey, optimism);

        // Return a context object with the snapshotted value
        return {previousData};
    },

    // If the mutation failed and we have a context, roll back to the previous value
    onError: (_err, _variables, context) => {
        if (context) return queryClient.setQueryData(queryKey, context.previousData);
    },

    // Once the mutation succeeds, we store that as the new value
    onSuccess: (newData, _variables, context) => {
        const previousData = context.previousData;
        const merged = mergeServerResponse ? mergeServerResponse(previousData, newData) : newData;

        queryClient.setQueryData(queryKey, merged);
    },
});

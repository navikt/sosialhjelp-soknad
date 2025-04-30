import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {
    useGetForsorgerplikt,
    useUpdateForsorgerplikt,
} from "../../../generated/new/forsorgerplikt-controller/forsorgerplikt-controller.ts";
import {ForsorgerInputBarnebidrag} from "../../../generated/new/model";
import {useState} from "react";

export const useBarnebidrag = () => {
    const soknadId = useSoknadId();
    const queryClient = useQueryClient();
    const {data, queryKey} = useGetForsorgerplikt(soknadId);
    const [isDelayedLoading, setIsDelayedLoading] = useState(false);
    const {mutate, isPending, variables} = useUpdateForsorgerplikt({
        mutation: {
            onSettled: (_data, _error, _variables, context) => {
                clearTimeout(context);
                setIsDelayedLoading(false);
                return queryClient.invalidateQueries({queryKey});
            },
            onMutate: () =>
                setTimeout(() => {
                    setIsDelayedLoading(true);
                }, 300),
        },
    });

    const setBarnebidrag = (barnebidrag: ForsorgerInputBarnebidrag) => {
        if (!data) return;
        const oppdatert = {...data, barnebidrag};
        mutate({soknadId: soknadId, data: oppdatert});
    };

    const barnebidrag = isPending ? variables?.data?.barnebidrag : data?.barnebidrag;

    return {barnebidrag, setBarnebidrag, isDelayedLoading};
};

import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useGetBoutgifter, useUpdateBoutgifter} from "../../../generated/new/boutgift-controller/boutgift-controller.ts";
import {BoutgifterDto, UpdateBoutgifterBody} from "../../../generated/new/model";

const mapToDto = (
    variables?: UpdateBoutgifterBody,
    skalViseInfoVedBekreftelse?: boolean
): Partial<BoutgifterDto> | undefined => {
    if (!variables) return;
    if (variables?.type === "HarIkkeBoutgifterInput") {
        return {bekreftelse: false};
    }
    return {
        annet: variables?.hasAnnenBoutgift,
        bekreftelse: true,
        boliglan: variables?.hasBoliglan,
        husleie: variables?.hasHusleie,
        kommunalAvgift: variables?.hasKommunalAvgift,
        oppvarming: variables?.hasOppvarming,
        strom: variables?.hasStrom,
        skalViseInfoVedBekreftelse,
    };
};

export const useBoutgifter = () => {
    const soknadId = useSoknadId();
    const queryClient = useQueryClient();
    const {data, queryKey} = useGetBoutgifter(soknadId);
    const {mutate, variables, isPending} = useUpdateBoutgifter({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})},
    });

    const boutgifter = isPending ? mapToDto(variables?.data, data?.skalViseInfoVedBekreftelse) : data;

    const setBoutgifter = async (valg: (keyof Omit<BoutgifterDto, "bekreftelse" | "skalViseInfoVedBekreftelse">)[]) => {
        if (!boutgifter) return;

        const oppdatert: UpdateBoutgifterBody = {
            ...boutgifter,
            type: "HarBoutgifterInput",
            hasHusleie: valg.includes("husleie"),
            hasStrom: valg.includes("strom"),
            hasKommunalAvgift: valg.includes("kommunalAvgift"),
            hasOppvarming: valg.includes("oppvarming"),
            hasBoliglan: valg.includes("boliglan"),
            hasAnnenBoutgift: valg.includes("annet"),
        };
        mutate({soknadId, data: oppdatert});
    };

    return {boutgifter, setBoutgifter};
};

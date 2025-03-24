import {useBehandlingsId} from "../common/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {useGetBoutgifter, useUpdateBoutgifter} from "../../../generated/new/boutgift-controller/boutgift-controller.ts";
import {BoutgifterDto, UpdateBoutgifterBody} from "../../../generated/new/model/index.ts";

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
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data, queryKey} = useGetBoutgifter(behandlingsId);
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
        mutate({soknadId: behandlingsId, data: oppdatert});
    };

    return {boutgifter, setBoutgifter};
};

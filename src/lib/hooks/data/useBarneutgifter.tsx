import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {
    useGetBarneutgifter,
    useUpdateBarneutgifter,
} from "../../../generated/new/barneutgift-controller/barneutgift-controller.ts";
import {BarneutgifterDto, type HarBarneutgifterInput, UpdateBarneutgifterBody} from "../../../generated/new/model";

const mapToDto = (variables: UpdateBarneutgifterBody | undefined): Partial<BarneutgifterDto> | undefined => {
    if (!variables) return;
    if (variables.type === "HarIkkeBarneutgifterInput") {
        return {
            hasBekreftelse: false,
        };
    }
    return {
        ...variables,
        hasBekreftelse: true,
    };
};

export const useBarneutgifter = () => {
    const soknadId = useSoknadId();
    const queryClient = useQueryClient();
    const {data, queryKey} = useGetBarneutgifter(soknadId, {}, queryClient);
    const {mutate, variables, isPending} = useUpdateBarneutgifter({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})},
    });

    const barneutgifter = isPending ? mapToDto(variables?.data) : data;

    const setBarneutgifter = async (valg: (keyof Omit<BarneutgifterDto, "bekreftelse" | "harForsorgerplikt">)[]) => {
        if (!barneutgifter) return;

        const oppdatert: HarBarneutgifterInput = {
            ...barneutgifter,
            type: "HarBarneutgifterInput",
            hasFritidsaktiviteter: valg.includes("hasFritidsaktiviteter"),
            hasBarnehage: valg.includes("hasBarnehage"),
            hasSfo: valg.includes("hasSfo"),
            hasTannregulering: valg.includes("hasTannregulering"),
            hasAnnenUtgiftBarn: valg.includes("hasAnnenUtgiftBarn"),
        };
        mutate({soknadId, data: oppdatert});
    };

    const setBekreftelse = async (bekreftelse: boolean) => {
        if (!barneutgifter) return;

        if (!bekreftelse) {
            mutate({soknadId, data: {type: "HarIkkeBarneutgifterInput"}});
            return;
        }
        const oppdatert: HarBarneutgifterInput = {
            ...barneutgifter,
            type: "HarBarneutgifterInput",
            hasAnnenUtgiftBarn: barneutgifter.hasAnnenUtgiftBarn ?? false,
            hasFritidsaktiviteter: barneutgifter.hasFritidsaktiviteter ?? false,
            hasBarnehage: barneutgifter.hasBarnehage ?? false,
            hasSfo: barneutgifter.hasSfo ?? false,
            hasTannregulering: barneutgifter.hasTannregulering ?? false,
        };
        mutate({soknadId, data: oppdatert});
    };

    return {barneutgifter, setBarneutgifter, setBekreftelse};
};

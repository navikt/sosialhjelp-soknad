import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useGetVerdier, useUpdateVerdier} from "../../../generated/new/verdi-controller/verdi-controller.ts";
import {HarVerdierInput, UpdateVerdierBody, VerdierDto} from "../../../generated/new/model";

const mapToDto = (vars?: UpdateVerdierBody): Partial<VerdierDto> | undefined => {
    if (!vars) {
        return undefined;
    }

    if (vars.type === "HarIkkeVerdierInput") {
        return {
            bekreftelse: vars.hasBekreftelse,
        };
    }

    return {
        ...vars,
        bekreftelse: vars?.hasBekreftelse,
        hasAnnetVerdi: vars?.hasBeskrivelseVerdi,
    };
};

export const useVerdier = () => {
    const soknadId = useSoknadId();
    const queryClient = useQueryClient();
    const {data, queryKey} = useGetVerdier(soknadId);
    const {mutate, variables, isPending} = useUpdateVerdier({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})},
    });

    const verdier: Partial<VerdierDto> | undefined = isPending ? mapToDto(variables?.data) : data;

    const setBekreftelse = async (verdi: boolean) => {
        if (!verdier) return;

        if (!verdi) {
            mutate({soknadId: soknadId, data: {type: "HarIkkeVerdierInput", hasBekreftelse: verdi}});
            return;
        }

        mutate({
            soknadId: soknadId,
            data: {
                type: "HarVerdierInput",
                hasBekreftelse: verdi,
                hasBeskrivelseVerdi: false,
                hasBolig: false,
                hasCampingvogn: false,
                hasFritidseiendom: false,
                hasKjoretoy: false,
            },
        });
    };

    const setVerdier = async (checked: (keyof VerdierDto)[]) => {
        if (!verdier) return;

        const oppdatert: HarVerdierInput = {
            type: "HarVerdierInput",
            hasBekreftelse: true,
            hasBolig: checked.includes("hasBolig"),
            hasCampingvogn: checked.includes("hasCampingvogn"),
            hasKjoretoy: checked.includes("hasKjoretoy"),
            hasFritidseiendom: checked.includes("hasFritidseiendom"),
            hasBeskrivelseVerdi: checked.includes("hasAnnetVerdi"),
            beskrivelseVerdi: checked.includes("hasAnnetVerdi") ? verdier.beskrivelseVerdi : "",
        };
        mutate({soknadId: soknadId, data: oppdatert});
    };

    const setBeskrivelseAvAnnet = async (beskrivelseAvAnnet: string) => {
        if (!verdier) return;
        const oppdatert: HarVerdierInput = {
            type: "HarVerdierInput",
            hasBolig: verdier.hasBolig ?? false,
            hasCampingvogn: verdier.hasCampingvogn ?? false,
            hasFritidseiendom: verdier.hasFritidseiendom ?? false,
            hasKjoretoy: verdier.hasKjoretoy ?? false,
            hasBeskrivelseVerdi: verdier.hasAnnetVerdi ?? false,
            hasBekreftelse: true,
            beskrivelseVerdi: beskrivelseAvAnnet,
        };
        mutate({soknadId: soknadId, data: oppdatert});
    };

    return {verdier, setBekreftelse, setVerdier, setBeskrivelseAvAnnet};
};

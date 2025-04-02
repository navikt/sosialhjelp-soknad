import {useQueryClient} from "@tanstack/react-query";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {useUpdateFormue, useGetFormue} from "../../../generated/new/formue-controller/formue-controller";
import {FormueDto, FormueInput} from "../../../generated/new/model";

function mapToDto(vars?: FormueInput): FormueDto | undefined {
    if (!vars) {
        return undefined;
    }
    return {
        ...vars,
        hasSparing: vars.hasBeskrivelseSparing,
    };
}

function mapToVars(data?: FormueDto): FormueInput | undefined {
    if (!data) {
        return undefined;
    }
    return {
        ...data,
        hasBeskrivelseSparing: data?.hasSparing,
        beskrivelseSparing: data?.beskrivelseSparing,
    };
}

export const useFormue = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data, queryKey} = useGetFormue(behandlingsId);
    const {mutate, variables, isPending} = useUpdateFormue({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})},
    });

    const formue: FormueDto | undefined = isPending ? mapToDto(variables?.data) : data;

    const setFormue = (valg: (keyof Omit<FormueDto, "beskrivelseAvAnnet">)[]) => {
        if (!formue) return;

        const oppdatert: FormueInput = {
            hasBrukskonto: valg.includes("hasBrukskonto"),
            hasBsu: valg.includes("hasBsu"),
            hasLivsforsikring: valg.includes("hasLivsforsikring"),
            hasSparekonto: valg.includes("hasSparekonto"),
            hasVerdipapirer: valg.includes("hasVerdipapirer"),
            hasBeskrivelseSparing: valg.includes("hasSparing"),
            beskrivelseSparing: valg.includes("hasSparing") ? formue.beskrivelseSparing : "",
        };

        mutate({soknadId: behandlingsId, data: oppdatert});
    };
    const setBeskrivelse = (beskrivelseAvAnnet: string) => {
        if (!formue) return;
        const variables = mapToVars(formue);
        if (!variables) return;
        const oppdatert: FormueInput = {...variables, beskrivelseSparing: beskrivelseAvAnnet};
        mutate({soknadId: behandlingsId, data: oppdatert});
    };

    return {formue, setFormue, setBeskrivelse};
};

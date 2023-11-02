import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {updateFormue, useHentFormue} from "../../../generated/formue-ressurs/formue-ressurs";
import {FormueFrontend} from "../../../generated/model";

export const useFormue = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data: formue, queryKey} = useHentFormue(behandlingsId);

    const setFormue = async (valg: (keyof Omit<FormueFrontend, "beskrivelseAvAnnet">)[]) => {
        if (!formue) return;

        const oppdatert: FormueFrontend = {
            brukskonto: valg.includes("brukskonto"),
            bsu: valg.includes("bsu"),
            livsforsikring: valg.includes("livsforsikring"),
            sparekonto: valg.includes("sparekonto"),
            verdipapirer: valg.includes("verdipapirer"),
            annet: valg.includes("annet"),
            beskrivelseAvAnnet: valg.includes("annet") ? formue.beskrivelseAvAnnet : "",
        };

        await updateFormue(behandlingsId, oppdatert);
        queryClient.setQueryData(queryKey, oppdatert);
    };
    const setBeskrivelse = async (beskrivelseAvAnnet: string) => {
        if (!formue) return;

        const oppdatert = {...formue, beskrivelseAvAnnet};
        await updateFormue(behandlingsId, oppdatert);
        queryClient.setQueryData(queryKey, oppdatert);
    };

    return {formue, setFormue, setBeskrivelse};
};

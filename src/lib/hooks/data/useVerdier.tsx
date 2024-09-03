import {useBehandlingsId} from "../common/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {updateVerdier, useHentVerdier} from "../../../generated/verdi-ressurs/verdi-ressurs";
import {VerdierFrontend} from "../../../generated/model";

export const useVerdier = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data: verdier, queryKey} = useHentVerdier(behandlingsId);

    const setBekreftelse = async (verdi: boolean) => {
        if (!verdier) return;
        const oppdatert = {...verdier};
        oppdatert.bekreftelse = verdi;

        if (!verdi) {
            oppdatert.bolig = false;
            oppdatert.campingvogn = false;
            oppdatert.kjoretoy = false;
            oppdatert.fritidseiendom = false;
            oppdatert.annet = false;
            oppdatert.beskrivelseAvAnnet = "";
        }

        await updateVerdier(behandlingsId, oppdatert);
        queryClient.setQueryData(queryKey, oppdatert);
    };

    const setVerdier = async (checked: (keyof VerdierFrontend)[]) => {
        if (!verdier) return;

        const oppdatert: VerdierFrontend = {
            ...verdier,
            bolig: checked.includes("bolig"),
            campingvogn: checked.includes("campingvogn"),
            kjoretoy: checked.includes("kjoretoy"),
            fritidseiendom: checked.includes("fritidseiendom"),
            annet: checked.includes("annet"),
            beskrivelseAvAnnet: checked.includes("annet") ? verdier.beskrivelseAvAnnet : "",
        };

        await updateVerdier(behandlingsId, oppdatert);
        queryClient.setQueryData(queryKey, oppdatert);
    };

    const setBeskrivelseAvAnnet = async (beskrivelseAvAnnet: string) => {
        if (!verdier) return;
        const oppdatert = {...verdier, beskrivelseAvAnnet};
        await updateVerdier(behandlingsId, oppdatert);
        queryClient.setQueryData(queryKey, oppdatert);
    };

    return {verdier, setBekreftelse, setVerdier, setBeskrivelseAvAnnet};
};

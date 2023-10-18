import {useQueryClient} from "@tanstack/react-query";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {
    updateTelefonnummer,
    useHentTelefonnummer,
} from "../../../generated/telefonnummer-ressurs/telefonnummer-ressurs";

export const useTelefonnummer = () => {
    const queryClient = useQueryClient();

    const behandlingsId = useBehandlingsId();
    const {data, queryKey, isLoading} = useHentTelefonnummer(behandlingsId);
    const setTelefonnummer = async (brukerutfyltVerdi: string | null) =>
        queryClient.setQueryData(
            queryKey,
            await updateTelefonnummer(behandlingsId, {
                brukerdefinert: !!brukerutfyltVerdi?.length,
                brukerutfyltVerdi: brukerutfyltVerdi?.length ? `+47${brukerutfyltVerdi}` : null,
            })
        );

    const fraSystem = data?.systemverdi;
    const fraBruker = data?.brukerutfyltVerdi;

    return {data, fraSystem, fraBruker, setTelefonnummer, isLoading};
};

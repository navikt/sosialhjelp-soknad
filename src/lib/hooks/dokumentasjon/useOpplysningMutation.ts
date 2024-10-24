import {useBehandlingsId} from "../common/useBehandlingsId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {logWarning} from "../../log/loggerUtils.ts";
import {mergeRowUpdateIntoQueryData} from "./mergeRowUpdateIntoQueryData.ts";

import {VedleggFrontend, VedleggFrontends} from "../../../generated/model/index.ts";
import {
    useHentOkonomiskeOpplysninger,
    useUpdateOkonomiskOpplysning,
} from "../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs.ts";

/**
 * En hook for å oppdatere økonomiske opplysninger både i klient-cache og på server.
 * Eksisterer for å jobbe rundt backend API som ikke er i tråd med generelle REST-prinsipper.
 */
export const useOpplysningMutation = () => {
    const behandlingsId = useBehandlingsId();
    const {mutate: mutateServer} = useUpdateOkonomiskOpplysning();
    const {queryKey} = useHentOkonomiskeOpplysninger(behandlingsId);
    const queryClient = useQueryClient();

    const mutateClientCache = (data: VedleggFrontend) => {
        const cached = queryClient.getQueryData<VedleggFrontends>(queryKey);

        if (!cached) {
            logWarning("burde ikke skje: forsøk på å oppdatere økonomiske opplysninger før de er hentet?");
            return;
        }

        try {
            const updated = mergeRowUpdateIntoQueryData(cached, data);
            queryClient.setQueryData(queryKey, updated);
        } catch (e: any) {
            logWarning(`Klarte ikke å oppdatere økonomiske opplysninger i cache: ${e}`);
        }
    };

    /**
     * Oppdaterer opplysningen både i klientens cache og på serverside.
     * Muterer tilstanden på queryCache for GET okonomiskeOpplysninger.
     * @param data VedleggFrontend som skal oppdateres
     */
    const mutateOpplysning = (data: VedleggFrontend) => {
        mutateClientCache(data);
        mutateServer({behandlingsId, data});
    };

    return {mutateOpplysning};
};

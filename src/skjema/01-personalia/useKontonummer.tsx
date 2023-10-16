import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {
    getHentKontonummerQueryKey,
    hentKontonummer,
    updateKontonummer,
} from "../../generated/kontonummer-ressurs/kontonummer-ressurs";
import * as React from "react";
import {KontonummerFrontend, KontonummerInputDTO} from "../../generated/model";

export const useKontonummer = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const queryKey = getHentKontonummerQueryKey(behandlingsId);

    queryClient.prefetchQuery(queryKey, async () => {
        const data = await hentKontonummer(behandlingsId);
        setIsLoading(false);
        return data;
    });

    const [isLoading, setIsLoading] = React.useState(true);

    const save = async (konto: KontonummerInputDTO) => {
        try {
            const data = await updateKontonummer(behandlingsId, konto);
            refreshCache(data);
        } catch (e) {
            console.error(e);
        }
    };
    const load = async () => hentKontonummer(behandlingsId);

    const refreshCache = (updatedResource: KontonummerFrontend) => queryClient.setQueryData(queryKey, updatedResource);

    return {
        load,
        save,
        isLoading,
    };
};

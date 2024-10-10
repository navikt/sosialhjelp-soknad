import {useBehandlingsId} from "../../../lib/hooks/common/useBehandlingsId.ts";
import {useEffect, useReducer} from "react";
import {adresseReducer} from "./adresseReducer.tsx";
import {logAmplitudeEvent} from "../../../lib/amplitude/Amplitude.tsx";
import {
    getHentAdresserQueryKey,
    hentAdresser,
    updateAdresse,
} from "../../../generated/adresse-ressurs/adresse-ressurs.ts";
import {
    AdresseFrontend,
    AdresserFrontend,
    AdresserFrontendValg,
    NavEnhetFrontend,
} from "../../../generated/model/index.ts";
import {useQueryClient} from "@tanstack/react-query";

export const useAdresser = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const [state, dispatch] = useReducer(adresseReducer, {mode: "uninitialized"});

    useEffect(() => {
        hentAdresser(behandlingsId).then((backendState) => {
            dispatch({type: "synchronize", backendState});
            setQueryDataNavEnhet(backendState.navEnhet);
        });
    }, [behandlingsId]);

    const setQueryDataNavEnhet = (navEnhet: NavEnhetFrontend | undefined) => {
        const queryKey = getHentAdresserQueryKey(behandlingsId);
        const cachedData = queryClient.getQueryData<AdresserFrontend>(queryKey);

        const updated = {
            ...(cachedData || {}),
            navEnhet,
        };

        queryClient.setQueryData(queryKey, updated);
    };

    const setAdresseValg = async (addresseValgt: AdresserFrontendValg) => {
        if (state.mode === "uninitialized")
            throw new Error("Cannot set adresseValg while uninitialized, UI should be disabled");

        if (addresseValgt !== state.valg) {
            dispatch({type: "setNavEnhet", navEnhet: undefined});
            setQueryDataNavEnhet(undefined);
        }
        await logAmplitudeEvent("adresseValg", {addresseValgt});

        dispatch({type: "adresseValg", adresseValg: addresseValgt});

        if (addresseValgt !== AdresserFrontendValg.soknad) {
            const [navEnhet] = await updateAdresse(behandlingsId, {valg: addresseValgt});
            dispatch({type: "setNavEnhet", navEnhet});
            setQueryDataNavEnhet(navEnhet);
        }
    };

    const setBrukerdefinertAdresse = async (soknad: AdresseFrontend) => {
        if (state.mode === "uninitialized")
            throw new Error("Cannot set adresseValg while uninitialized, UI should be disabled");

        // Backend surprise: Denne returnerer en liste med én eller null navenheter.
        const [navEnhet] = await updateAdresse(behandlingsId, {
            ...state,
            soknad,
        });

        dispatch({type: "adresseSoknadChange", soknad, navEnhet});
        setQueryDataNavEnhet(navEnhet);
    };

    switch (state.mode) {
        case "uninitialized":
            return {isPending: true};
        case "uncommittedChanges":
            return {
                isPending: false,
                valg: "soknad",
                midlertidig: state.midlertidig,
                folkeregistrert: state.folkeregistrert,
                navEnhet: undefined,
                brukerdefinert: state.soknad,
                setAdresseValg,
                setBrukerdefinertAdresse,
            };
        case "synchronized":
            return {
                isPending: false,
                valg: state.valg,
                midlertidig: state.midlertidig,
                folkeregistrert: state.folkeregistrert,
                navEnhet: state.navEnhet,
                brukerdefinert: state.soknad,
                setAdresseValg,
                setBrukerdefinertAdresse,
            };
    }
};

import {useBehandlingsId} from "../../../lib/hooks/common/useBehandlingsId.ts";
import {Dispatch, SetStateAction, useEffect, useReducer} from "react";
import {adresseReducer} from "./adresseReducer.tsx";
import {logAmplitudeEvent} from "../../../lib/amplitude/Amplitude.tsx";
import {hentAdresser, updateAdresse} from "../../../generated/adresse-ressurs/adresse-ressurs.ts";
import {AdresseFrontend, AdresserFrontendValg, NavEnhetFrontend} from "../../../generated/model/index.ts";

export const useAdresser = (setNavEnhet: Dispatch<SetStateAction<NavEnhetFrontend | undefined>>) => {
    const behandlingsId = useBehandlingsId();
    const [state, dispatch] = useReducer(adresseReducer, {mode: "uninitialized"});

    useEffect(() => {
        hentAdresser(behandlingsId).then((backendState) => {
            dispatch({type: "synchronize", backendState});
            setNavEnhet(backendState.navEnhet);
        });
    }, [behandlingsId]);

    const setAdresseValg = async (addresseValgt: AdresserFrontendValg) => {
        if (state.mode === "uninitialized")
            throw new Error("Cannot set adresseValg while uninitialized, UI should be disabled");

        dispatch({type: "setNavEnhet", navEnhet: undefined});
        setNavEnhet(undefined);

        await logAmplitudeEvent("adresseValg", {addresseValgt});

        dispatch({type: "adresseValg", adresseValg: addresseValgt});

        if (addresseValgt !== AdresserFrontendValg.soknad) {
            const [navEnhet] = await updateAdresse(behandlingsId, {valg: addresseValgt});
            dispatch({type: "setNavEnhet", navEnhet});
            setNavEnhet(navEnhet);
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
        setNavEnhet(navEnhet);
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

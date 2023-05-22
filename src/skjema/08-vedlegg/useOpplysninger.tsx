import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {useDispatch} from "react-redux";
import {useHentOkonomiskeOpplysninger} from "../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {VedleggFrontends} from "../../generated/model";
import {
    VedleggFrontendsMinusEtParTingSomTrengerAvklaring,
    vedleggGrupper,
} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerConfig";
import {
    gotDataFromBackend,
    validVedleggFrontends,
} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerActions";
import * as React from "react";
import {logWarning} from "../../nav-soknad/utils/loggerUtils";
import {getSortertListeAvOpplysninger} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerUtils";

export const useOpplysninger = () => {
    const behandlingsId = useBehandlingsId();

    //// Redux-hack for å forsikre oss om at retro-koden fremdeles henter dataene
    //// Har lært av feilen på barnebidragsiden :)
    const dispatch = useDispatch();

    const {data, isLoading, isSuccess, isError, error} = useHentOkonomiskeOpplysninger<
        VedleggFrontends | VedleggFrontendsMinusEtParTingSomTrengerAvklaring
    >(behandlingsId, {});

    if (data && !validVedleggFrontends(data)) {
        throw new Error("useOpplysninger mottok ugyldig spec - frontends API ute av synk med Swagger?");
    }

    //// Redux-hack for å forsikre oss om at retro-koden fremdeles henter dataene
    //// Har lært av feilen på barnebidragsiden :)
    React.useEffect(() => {
        if (isSuccess) dispatch(gotDataFromBackend(data));
        if (isError) logWarning(`isError i useOpplysninger, error ${error}`);
    }, [data, dispatch, isSuccess, isError, error]);

    const sorterte = data ? getSortertListeAvOpplysninger(data) : [];

    // Filtrer vekk tomme grupper, slik at vi kan bruke liste.length under for å mekke grønne linjer mellom ting
    const grupper = vedleggGrupper.filter((gruppeNavn) => {
        return sorterte.filter(({gruppe}) => gruppe === gruppeNavn).length;
    });

    return {
        data,
        isLoading,
        grupper,
        sorterte,
        bekreftet: data?.isOkonomiskeOpplysningerBekreftet ?? undefined,
    };
};

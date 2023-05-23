import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {useHentOkonomiskeOpplysninger} from "../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {VedleggFrontends} from "../../generated/model";
import {
    validVedleggFrontends,
    VedleggFrontendsMinusEtParTingSomTrengerAvklaring,
    vedleggGrupper,
} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerConfig";
import * as React from "react";
import {getSortertListeAvOpplysninger} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerUtils";
import {useMemo} from "react";

export const useOpplysninger = () => {
    const behandlingsId = useBehandlingsId();

    const {data, isLoading} = useHentOkonomiskeOpplysninger<
        VedleggFrontends | VedleggFrontendsMinusEtParTingSomTrengerAvklaring
    >(behandlingsId, {});

    if (data && !validVedleggFrontends(data)) {
        throw new Error(`useOpplysninger mottok ugyldig type ${data} - frontends API ute av synk med Swagger?`);
    }

    const sorterte = useMemo(() => (data ? getSortertListeAvOpplysninger(data) : []), [data]);

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

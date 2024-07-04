import {useMemo} from "react";
import {VedleggFrontends} from "../../../generated/model";
import {Opplysning, opplysningSpec, vedleggGrupper} from "../../opplysninger";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {useHentOkonomiskeOpplysninger} from "../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {logError} from "../../log/loggerUtils";

export const flettOgSorter = ({okonomiskeOpplysninger, slettedeVedlegg}: VedleggFrontends): Opplysning[] => {
    const current = okonomiskeOpplysninger?.map((opplysning): Opplysning => ({...opplysning}));
    const deleted = slettedeVedlegg?.map((opplysning): Opplysning => ({...opplysning, slettet: true}));
    return [...(current ?? []), ...(deleted ?? [])].sort(
        (a: Opplysning, b: Opplysning) => opplysningSpec[a.type].sortKey - opplysningSpec[b.type].sortKey
    );
};

export const useOpplysninger = () => {
    const behandlingsId = useBehandlingsId();

    const {data, isLoading, error} = useHentOkonomiskeOpplysninger(behandlingsId, {});

    if (error) {
        logError(`Feil ved HentOkonomiskeOpplysninger: ${error}`);
    }

    const sorterte = useMemo(() => (data ? flettOgSorter(data) : []), [data]);

    // Filtrer vekk tomme grupper, slik at vi kan bruke liste.length under for å mekke grønne linjer mellom ting
    const grupper = vedleggGrupper.filter((gruppeNavn) => sorterte.filter(({gruppe}) => gruppe === gruppeNavn).length);

    return {
        data,
        isLoading,
        grupper,
        sorterte,
        bekreftet: data?.isOkonomiskeOpplysningerBekreftet ?? undefined,
    };
};

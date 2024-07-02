import {useMemo} from "react";
import {VedleggFrontendGruppe, VedleggFrontends} from "../../../generated/model";
import {Opplysning, opplysningSpec, vedleggGrupper} from "../../opplysninger";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {useHentOkonomiskeOpplysninger} from "../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {logError} from "../../log/loggerUtils";
import {useSkatteetatenData} from "../data/useSkatteetatenData";

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
    const {samtykke} = useSkatteetatenData();

    if (error) {
        logError(`Feil ved HentOkonomiskeOpplysninger: ${error}`);
    }

    const sorterte = useMemo(() => (data ? flettOgSorter(data) : []), [data]);

    // Filtrer vekk tomme grupper, slik at vi kan bruke liste.length under for å mekke grønne linjer mellom ting
    const grupper = vedleggGrupper.filter((gruppeNavn) => sorterte.filter(({gruppe}) => gruppe === gruppeNavn).length);

    // For å jobbe rundt at dokumentasjonskravet for arbeid|lonnsslipp forsvinner når samtykke er true,
    // som fører til at arbeid-gruppa blir tom og dermed forsvinner. Men vi har hardkodet at dersom
    // skatteetaten-samtykke er innvilget, skal vi vise det panelet i kontekst av arbeid-gruppa.
    const grupperMedSuperstyggHack =
        !grupper.includes("arbeid") && !samtykke ? grupper : (["arbeid", ...grupper] as VedleggFrontendGruppe[]);

    return {
        data,
        isLoading,
        grupper: grupperMedSuperstyggHack,
        sorterte,
        bekreftet: data?.isOkonomiskeOpplysningerBekreftet ?? undefined,
    };
};

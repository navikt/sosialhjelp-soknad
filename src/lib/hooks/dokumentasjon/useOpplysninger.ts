import {useMemo} from "react";
import {VedleggFrontends} from "../../../generated/model";
import {Opplysning, opplysningSpec, vedleggGrupper} from "../../opplysninger";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {useHentOkonomiskeOpplysninger} from "../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {logError} from "../../log/loggerUtils";
import {VedleggFrontendTypeMinusUferdig} from "../../../locales/nb/dokumentasjon.ts";
import {useGetForventetDokumentasjon} from "../../../generated/new/okonomiske-opplysninger-controller/okonomiske-opplysninger-controller.ts";
import {ForventetDokumentasjonDto, DokumentasjonDto} from "../../../generated/new/model";

export const flettOgSorter = ({forventetDokumentasjon}: ForventetDokumentasjonDto): Opplysning[] => {
    return forventetDokumentasjon
        .filter((opplysning) => opplysning.type !== "kort|behov")
        .toSorted(
            (a: DokumentasjonDto, b: DokumentasjonDto) =>
                opplysningSpec[a.type as VedleggFrontendTypeMinusUferdig].sortKey -
                opplysningSpec[b.type as VedleggFrontendTypeMinusUferdig].sortKey
        );
};

export const useOpplysninger = () => {
    const behandlingsId = useBehandlingsId();

    const {data, isLoading, error} = useGetForventetDokumentasjon(behandlingsId);

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

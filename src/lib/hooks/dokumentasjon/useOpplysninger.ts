import {useMemo} from "react";
import {VedleggFrontends} from "../../../generated/model";
import {Opplysning, opplysningSpec, vedleggGrupper} from "../../opplysninger";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {useHentOkonomiskeOpplysninger} from "../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {logError} from "../../log/loggerUtils";
//import {VedleggFrontendTypeMinusUferdig} from "../../../locales/nb/dokumentasjon.ts";

export const flettOgSorter = ({okonomiskeOpplysninger, slettedeVedlegg}: VedleggFrontends): Opplysning[] => {
    const current = okonomiskeOpplysninger?.map((opplysning): Opplysning => ({...opplysning}));
    const deleted = slettedeVedlegg?.map((opplysning): Opplysning => ({...opplysning, slettet: true}));

    return [...(current ?? []), ...(deleted ?? [])].sort((a: Opplysning, b: Opplysning) => {
        const aType = a.type as keyof typeof opplysningSpec;
        const bType = b.type as keyof typeof opplysningSpec;

        console.log("🔍 Sorting opplysninger - Type A:", aType, "Type B:", bType);
        console.log("🔍 opplysningSpec for A:", opplysningSpec[aType]);
        console.log("🔍 opplysningSpec for B:", opplysningSpec[bType]);

        if (!opplysningSpec[aType]) {
            console.error(`🚨 Missing type in opplysningSpec: ${aType}`);
        }
        if (!opplysningSpec[bType]) {
            console.error(`🚨 Missing type in opplysningSpec: ${bType}`);
        }

        return (opplysningSpec[aType]?.sortKey ?? 9999) - (opplysningSpec[bType]?.sortKey ?? 9999);
    });
};

export const useOpplysninger = () => {
    const behandlingsId = useBehandlingsId();

    const {data, isLoading, error} = useHentOkonomiskeOpplysninger(behandlingsId, {});

    if (error) {
        console.log(`Feil ved HentOkonomiskeOpplysninger: ${error}`);
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

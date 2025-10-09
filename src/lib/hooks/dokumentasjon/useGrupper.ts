import {useSoknadId} from "../common/useSoknadId.ts";
import {type DokumentasjonDtoType} from "../../../generated/new/model";
import {useGetForventetDokumentasjon} from "../../../generated/new/dokumentasjon-controller/dokumentasjon-controller.ts";
import {useMemo} from "react";

export enum GruppeKey {
    Statsborgerskap = "statsborgerskap",
    Arbeid = "arbeid",
    Familie = "familie",
    Bosituasjon = "bosituasjon",
    Inntekt = "inntekt",
    Utgifter = "utgifter",
    GenerelleVedlegg = "generelle vedlegg",
    AndreUtgifter = "andre utgifter",
}

const inntekter: DokumentasjonDtoType[] = [
    "FORMUE_BRUKSKONTO",
    "FORMUE_BSU",
    "FORMUE_LIVSFORSIKRING",
    "FORMUE_SPAREKONTO",
    "FORMUE_VERDIPAPIRER",
    "FORMUE_ANNET",
    "JOBB",
    "UTBETALING_FORSIKRING",
    "UTBETALING_UTBYTTE",
    "UTBETALING_SALG",
    "UTBETALING_ANNET",
    "SLUTTOPPGJOER",
];

const arbeid: DokumentasjonDtoType[] = ["STUDIELAN_INNTEKT", "SLUTTOPPGJOER", "JOBB"];

const bosituasjon: DokumentasjonDtoType[] = ["UTGIFTER_HUSLEIE", "UTGIFTER_ANNET_BO"];

const utgifter: DokumentasjonDtoType[] = [
    "UTGIFTER_KOMMUNAL_AVGIFT",
    "UTGIFTER_OPPVARMING",
    "UTGIFTER_STROM",
    "UTGIFTER_BARN_TANNREGULERING",
    "UTGIFTER_BARN_FRITIDSAKTIVITETER",
    "UTGIFTER_ANNET_BARN",
    "UTGIFTER_SFO",
    "UTGIFTER_BARNEHAGE",
    "UTGIFTER_BOLIGLAN",
];

const familie: DokumentasjonDtoType[] = ["BARNEBIDRAG_MOTTAR", "BARNEBIDRAG_BETALER"];

export const gruppeMapping = (type: DokumentasjonDtoType) => {
    if (inntekter.includes(type)) {
        return GruppeKey.Inntekt;
    } else if (arbeid.includes(type)) {
        return GruppeKey.Arbeid;
    } else if (familie.includes(type)) {
        return GruppeKey.Familie;
    } else if (bosituasjon.includes(type)) {
        return GruppeKey.Bosituasjon;
    } else if ("UTGIFTER_ANDRE_UTGIFTER" === type) {
        return GruppeKey.AndreUtgifter;
    } else if (utgifter.includes(type)) {
        return GruppeKey.Utgifter;
    } else {
        return GruppeKey.GenerelleVedlegg;
    }
};

const useGrupper = () => {
    const soknadId = useSoknadId();
    const {data, isLoading} = useGetForventetDokumentasjon(soknadId);
    const grupper = useMemo(
        () =>
            Object.values(GruppeKey).filter((gruppe) =>
                data?.dokumentasjon?.some((dok) => gruppeMapping(dok.type) === gruppe)
            ),
        [data]
    );
    return {grupper, isLoading};
};

export default useGrupper;

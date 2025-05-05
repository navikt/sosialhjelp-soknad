import {GruppeKey, gruppeMapping} from "./useGrupper";
import {useSoknadId} from "../common/useSoknadId.ts";
import {useGetForventetDokumentasjon} from "../../../generated/new/dokumentasjon-controller/dokumentasjon-controller.ts";
import {DokumentasjonDto} from "../../../generated/new/model";

const useGruppe = (gruppeKey: GruppeKey) => {
    const soknadId = useSoknadId();
    const {data, isLoading} = useGetForventetDokumentasjon(soknadId);
    const forventetDokumentasjon: DokumentasjonDto[] =
        data?.dokumentasjon.filter((opplysning) => gruppeMapping(opplysning.type) === gruppeKey) ?? [];
    return {
        forventetDokumentasjon,
        isLoading,
    };
};

export default useGruppe;

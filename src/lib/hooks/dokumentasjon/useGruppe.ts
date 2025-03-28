import {GruppeKey, gruppeMapping} from "./useGrupper";
import {useBehandlingsId} from "../common/useBehandlingsId.ts";
import {useGetForventetDokumentasjon} from "../../../generated/new/dokumentasjon-controller/dokumentasjon-controller.ts";
import {DokumentasjonDto} from "../../../generated/new/model";

const useGruppe = (gruppeKey: GruppeKey) => {
    const behandlingsId = useBehandlingsId();
    const {data, isLoading} = useGetForventetDokumentasjon(behandlingsId);
    const forventetDokumentasjon: DokumentasjonDto[] =
        data?.dokumentasjon.filter((opplysning) => gruppeMapping(opplysning.type) === gruppeKey) ?? [];
    return {
        forventetDokumentasjon,
        isLoading,
    };
};

export default useGruppe;

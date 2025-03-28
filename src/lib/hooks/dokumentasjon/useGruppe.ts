import {GruppeKey, gruppeMapping} from "./useGrupper";
import {useBehandlingsId} from "../common/useBehandlingsId.ts";
import {Opplysning} from "../../opplysninger.ts";
import {useGetForventetDokumentasjon} from "../../../generated/new/dokumentasjon-controller/dokumentasjon-controller.ts";

const useGruppe = (gruppeKey: GruppeKey) => {
    const behandlingsId = useBehandlingsId();
    const {data, isLoading} = useGetForventetDokumentasjon(behandlingsId);
    const opplysninger: Opplysning[] =
        data?.dokumentasjon.filter((opplysning) => gruppeMapping(opplysning.type) === gruppeKey) ?? [];
    return {
        opplysninger: opplysninger,
        isLoading,
    };
};

export default useGruppe;

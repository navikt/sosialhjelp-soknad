import {GruppeKey, gruppeMapping} from "./useGrupper";
import {useGetForventetDokumentasjon} from "../../../generated/new/okonomiske-opplysninger-controller/okonomiske-opplysninger-controller.ts";
import {useBehandlingsId} from "../common/useBehandlingsId.ts";
import {Opplysning} from "../../opplysninger.ts";

const useGruppe = (gruppeKey: GruppeKey) => {
    const behandlingsId = useBehandlingsId();
    const {data, isLoading} = useGetForventetDokumentasjon(behandlingsId);
    const opplysninger: Opplysning[] =
        data?.forventetDokumentasjon.filter((opplysning) => gruppeMapping(opplysning.type) === gruppeKey) ?? [];
    return {
        opplysninger: opplysninger,
        isLoading,
    };
};

export default useGruppe;

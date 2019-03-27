import {Dispatch} from "../reduxTypes";
import {fetchPut, fetchToJson} from "../../utils/rest-utils";
import {navigerTilServerfeil} from "../navigasjon/navigasjonActions";
import {OkonomiskeOpplysninger, OkonomiskOpplysning} from "./okonomiskeOpplysningerTypes";


export function hentOkonomiskeOpplysninger(brukerBehandlingId: string) {
    return (dispatch: Dispatch) => {
        fetchToJson(okonomomiskeOpplysningerUrl(brukerBehandlingId)).then((response: OkonomiskeOpplysninger) => {
            // dispatch(oppdaterSoknadsdataSti(sti, response));
        }).catch(() => {
            dispatch(navigerTilServerfeil());
        });
    }
}

export function lagreOkonomiskOpplysning(brukerBehandlingId: string, okonomiskOpplysning: OkonomiskOpplysning) {
    return (dispatch: Dispatch) => {
        fetchPut(okonomomiskeOpplysningerUrl(brukerBehandlingId), JSON.stringify(okonomiskOpplysning))
            .catch(() => {
                dispatch(navigerTilServerfeil());
            });
    }
}

function okonomomiskeOpplysningerUrl(behandlingsId: string) {
    return (
        `/soknader/${behandlingsId}/okonomiskeOpplysninger`
    )
}

// function vedleggUrl(vedleggId: string) {
//     return (
//         `/vedlegg/${vedleggId}`
//     )
// }
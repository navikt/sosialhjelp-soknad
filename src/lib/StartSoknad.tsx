import {Dispatch} from "redux";
import {opprettSoknad} from "../generated/soknad-ressurs/soknad-ressurs";
import {opprettSoknadOk} from "../digisos/redux/soknad/soknadActions";

export const startSoknad = async (dispatch: Dispatch) => {
    const {brukerBehandlingId} = await opprettSoknad();
    dispatch(opprettSoknadOk(brukerBehandlingId));
    return brukerBehandlingId;
};

import {fetchPost} from "./rest-utils";
import {NavLogEntry} from "../../digisos/redux/navlogger/navloggerTypes";

export function loggErrorToServer(navLogEntry: NavLogEntry) {
    try {
        fetchPost( "informasjon/actions/logg", JSON.stringify(navLogEntry));
    } catch (e) {
        console.warn("Logg to server failed.");
    }
}
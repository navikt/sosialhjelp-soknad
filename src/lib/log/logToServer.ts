import {axiosInstance} from "../api/axiosInstance";
import {Logg} from "./types";

export const logToServer = async (navLogEntry: Logg) => {
    try {
        await axiosInstance(
            {
                url: `/informasjon/actions/logg`,
                method: "post",
                headers: {"Content-Type": "application/json"},
                data: navLogEntry,
            },
            {digisosIgnoreErrors: true}
        );
    } catch (e) {
        console.warn(`Logg til server failed (${e}).`);
    }
};

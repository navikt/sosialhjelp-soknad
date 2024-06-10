import {logToServer} from "./logToServer";
import {logLocally} from "./logLocally";
import {Logg, LoggLevel} from "./types";

export const logInfo = (message: string): Promise<void> => log(message, LoggLevel.INFO);
export const logWarning = (message: string): Promise<void> => log(message, LoggLevel.WARN);
export const logError = (message: string): Promise<void> => log(message, LoggLevel.ERROR);

const log = async (message: string, level: LoggLevel) => {
    const navLogEntry: Logg = {
        url: window.location.href,
        userAgent: window.navigator.userAgent,
        message: message,
        level,
    };

    if (import.meta.env.REACT_APP_DIGISOS_ENV !== "prod-sbs") {
        logLocally(navLogEntry);
    } else await logToServer(navLogEntry);
};

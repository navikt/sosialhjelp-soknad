import {logToServer} from "./logToServer";
import {logLocally} from "./logLocally";
import {Logg, LoggLevel} from "./types";
import digisosConfig from "../config";

export const logInfo = (message: string): Promise<void> => log(message, LoggLevel.INFO);
export const logWarning = (message: string): Promise<void> => log(message, LoggLevel.WARN);
export const logError = (message: string): Promise<void> => log(message, LoggLevel.ERROR);

const log = async (message: string, level: LoggLevel) => {
    const navLogEntry: Logg = {
        // FIXME
        // url: window.location.href,
        // userAgent: window.navigator.userAgent,
        message: message,
        level,
    };

    if (digisosConfig.logLocally) {
        logLocally(navLogEntry);
    } else await logToServer(navLogEntry);
};

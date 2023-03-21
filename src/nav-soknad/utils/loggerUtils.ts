import {Logg, LoggLevel} from "../../generated/model";
import {loggFraKlient} from "../../generated/informasjon-ressurs/informasjon-ressurs";

export const logWindowError: typeof window.onerror = (message, jsFileUrl, lineNumber, columnNumber) => {
    logToServer({
        url: window.location.href,
        userAgent: window.navigator.userAgent,
        message: `window.onerror: ${message.toString()}`,
        level: LoggLevel.WARN,
        jsFileUrl,
        lineNumber: lineNumber?.toString(),
        columnNumber: columnNumber?.toString(),
    }).then();
};

export const logInfo = async (message: string) => log(message, LoggLevel.INFO);
export const logWarning = async (message: string) => log(message, LoggLevel.WARN);
export const logError = async (message: string) => log(message, LoggLevel.ERROR);

const logLocally = ({message, level}: Logg) => {
    switch (level) {
        case "ERROR":
            console.error(message);
            break;
        case "INFO":
            console.log(message);
            break;
        case "WARN":
            console.warn(message);
            break;
    }
};

const log = async (message: string, level: LoggLevel) => {
    const navLogEntry: Logg = {
        url: window.location.href,
        userAgent: window.navigator.userAgent,
        message: message,
        level,
    };

    if (process.env.NODE_ENV === "development") logLocally(navLogEntry);
    logToServer(navLogEntry);
};

const logToServer = async (navLogEntry: Logg) => {
    try {
        await loggFraKlient(navLogEntry);
    } catch (e) {
        console.warn("Logg til server failed.");
    }
};

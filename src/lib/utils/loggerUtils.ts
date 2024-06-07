import {axiosInstance} from "../api/axiosInstance";

/**
 * OBS: Disse er duplisert fra generert kode fordi orval ellers klaget på en sirkulær avhengighet.
 */
interface Logg {
    columnNumber?: string;
    jsFileUrl?: string;
    level: LoggLevel;
    lineNumber?: string;
    message?: string;
    url?: string;
    userAgent?: string;
}
type LoggLevel = (typeof LoggLevel)[keyof typeof LoggLevel];
const LoggLevel = {ERROR: "ERROR", WARN: "WARN", INFO: "INFO"} as const;

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

export const logInfo = (message: string): Promise<void> => log(message, LoggLevel.INFO);
export const logWarning = (message: string): Promise<void> => log(message, LoggLevel.WARN);
export const logError = (message: string): Promise<void> => log(message, LoggLevel.ERROR);

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

    if (import.meta.env.REACT_APP_DIGISOS_ENV !== "prod-sbs") {
        logLocally(navLogEntry);
    } else await logToServer(navLogEntry);
};

const logToServer = async (navLogEntry: Logg) => {
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

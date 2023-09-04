import {axiosInstance} from "../../lib/orval/soknad-api-axios";

// Caveat coder: These types are originally from the OpenAPI spec, but I've
// duplicated them here to prevent orval throwing an error when generating
// the types. Presumed harmless; I suspect this API won't change much before
// we get rid of it.
type LoggLevel = (typeof LoggLevel)[keyof typeof LoggLevel];

const LoggLevel = {
    ERROR: "ERROR",
    WARN: "WARN",
    INFO: "INFO",
} as const;

interface Logg {
    level: LoggLevel;
    message?: string;
    jsFileUrl?: string;
    lineNumber?: string;
    columnNumber?: string;
    url?: string;
    userAgent?: string;
}

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

    if (process.env.NODE_ENV === "development") logLocally(navLogEntry);
    logToServer(navLogEntry);
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

import {fetchPost} from "./rest-utils";

export enum NavLogLevel {
    ERROR = "ERROR",
    WARN = "WARN",
    INFO = "INFO",
}

export interface NavLogEntry {
    level: NavLogLevel;
    message: string;
    url?: string;
    jsFileUrl?: string;
    lineNumber?: any;
    columnNumber?: any;
    userAgent?: string;
    error?: any;
}

const createLogEntry = (message: string, level: NavLogLevel, jsFileUrl?: string): NavLogEntry => {
    return {
        url: window.location.href,
        userAgent: window.navigator.userAgent,
        message: message.toString(),
        jsFileUrl,
        level,
    };
};

export const logInfo = (message: string) => {
    if (process.env.NODE_ENV === "development") console.info(message);
    logToServer(createLogEntry(message, NavLogLevel.INFO));
};

export const logWarning = (message: string, omitStacktrace?: boolean) => {
    if (process.env.NODE_ENV === "development")
        omitStacktrace ? console.log("Warning: " + message) : console.warn(message);
    logToServer(createLogEntry(message, NavLogLevel.WARN));
};

export const logError = (message: string, jsFileUrl?: string) => {
    if (process.env.NODE_ENV === "development") console.error(message);
    logToServer(createLogEntry(message, NavLogLevel.ERROR, jsFileUrl));
};

export const logException = (logEntry: NavLogEntry) => {
    if (process.env.NODE_ENV === "development") console.warn(logEntry.message);
    logToServer(logEntry);
};

function logToServer(navLogEntry: NavLogEntry) {
    fetchPost("informasjon/actions/logg", JSON.stringify(navLogEntry)).catch((e) => {
        console.warn("Logg til server failed.");
    });
}

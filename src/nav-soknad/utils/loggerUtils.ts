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
    return logToServer(createLogEntry(message, NavLogLevel.INFO));
};

export const logWarning = (message: string) => {
    return logToServer(createLogEntry(message, NavLogLevel.WARN));
};

export const logError = (message: string, jsFileUrl?: string) => {
    return logToServer(createLogEntry(message, NavLogLevel.ERROR, jsFileUrl));
};

export const logException = (logEntry: NavLogEntry) => {
    return logToServer(logEntry);
};

function logToServer(navLogEntry: NavLogEntry) {
    try {
        fetchPost("informasjon/actions/logg", JSON.stringify(navLogEntry));
    } catch (e) {
        console.warn("Logg to server failed.");
    }
}

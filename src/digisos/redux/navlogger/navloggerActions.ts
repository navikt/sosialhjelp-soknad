import {ActionTypeKeys, NavLogEntry, NavloggerActionTypes, NavLogLevel} from "./navloggerTypes";

const loggFeil = (message: string): NavloggerActionTypes => {
    return {
        type: ActionTypeKeys.INIT,
        logEntry: createLogEntry(message, NavLogLevel.ERROR),
    };
};

const loggInfo = (message: string): NavloggerActionTypes => {
    return {
        type: ActionTypeKeys.INIT,
        logEntry: createLogEntry(message, NavLogLevel.INFO),
    };
};

const loggAdvarsel = (message: string): NavloggerActionTypes => {
    return {
        type: ActionTypeKeys.INIT,
        logEntry: createLogEntry(message, NavLogLevel.WARN),
    };
};

const loggingTilServerFeilet = (): NavloggerActionTypes => {
    return {
        type: ActionTypeKeys.FEILET,
    };
};

const createLogEntry = (message: string, level: NavLogLevel): NavLogEntry => {
    return {
        url: window.location.href,
        userAgent: window.navigator.userAgent,
        message: message.toString(),
        level,
    };
};

const loggException = (
    errorMessage: string,
    url: string,
    line?: number,
    column?: number,
    error?: any
): NavloggerActionTypes => {
    const stacktrace = error.hasOwnProperty("stack") ? "\nStacktrace" + error.stack : "";
    const logEntry: NavLogEntry = {
        level: NavLogLevel.ERROR,
        userAgent: window.navigator.userAgent,
        url: document.location.href,
        message: errorMessage,
        jsFileUrl: url,
        lineNumber: line,
        error: stacktrace,
    };
    if (column) {
        logEntry.columnNumber = column;
    }
    return {
        type: ActionTypeKeys.INIT,
        logEntry,
    };
};

export {loggFeil, loggInfo, loggAdvarsel, loggException, loggingTilServerFeilet};

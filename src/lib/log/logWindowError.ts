import {logToServer} from "./logToServer";
import {LoggLevel} from "./types";

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

/**
 * OBS: Disse er duplisert fra generert kode fordi orval ellers klaget på en sirkulær avhengighet.
 */
export interface Logg {
    columnNumber?: string;
    jsFileUrl?: string;
    level: LoggLevel;
    lineNumber?: string;
    message?: string;
    url?: string;
    userAgent?: string;
}

export type LoggLevel = (typeof LoggLevel)[keyof typeof LoggLevel];
export const LoggLevel = {ERROR: "ERROR", WARN: "WARN", INFO: "INFO"} as const;

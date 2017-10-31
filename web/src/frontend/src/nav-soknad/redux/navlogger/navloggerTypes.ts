export enum NavLogLevel {
	ERROR = "ERROR",
	WARN = "WARN",
	INFO = "INFO"
}

export interface NavLogEntry {
	level: NavLogLevel;
	message: string;
	url?: string;
	jsFileUrl?: string;
	lineNumber?: any;
	columnNumber?: any;
	userAgent?: string;
}

export enum ActionTypeKeys {
	INIT = "navlogger/INIT",
	FEILET = "navlogger/FEILET"
}

export type NavloggerActionTypes = NavLogInitAction | NavLogFeiletAction;

export interface NavLogInitAction {
	type: ActionTypeKeys.INIT;
	logEntry: NavLogEntry;
}

export interface NavLogFeiletAction {
	type: ActionTypeKeys.FEILET;
}

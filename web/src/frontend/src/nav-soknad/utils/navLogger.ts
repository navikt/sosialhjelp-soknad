import { fetchPost } from "./rest-utils";

interface Options {
	url?: string;
}

enum LogLevel {
	ERROR = "ERROR",
	WARN = "WARN",
	INFO = "INFO"
}

interface LogEntry {
	level: LogLevel;
	message: string;
	url?: string;
	jsFileUrl?: string;
	lineNumber?: any;
	columnNumber?: any;
	userAgent?: string;
}

class NavLogger {

	url: string;

	constructor(options?: Options) {
		this.url = (options && options.url) || "actions/logg";

		window.onerror = (errorMessage, url, line, column) => {
			const json: LogEntry = {
				level: LogLevel.ERROR,
				message: errorMessage,
				jsFileUrl: url,
				lineNumber: line
			};
			if (column) {
				json.columnNumber = column;
			}
			fetchPost(options.url, JSON.stringify(json));
		};
	}

	error(msg: string): void {
		this.logToServer({level: LogLevel.ERROR, message: msg});
	}

	warn(msg: string): void {
		this.logToServer({level: LogLevel.WARN, message: msg});
	}

	info(msg: string): void {
		this.logToServer({level: LogLevel.INFO, message: msg});
	}

	private logToServer(json: LogEntry): void {
		json.url = window.location.href;
		json.userAgent = window.navigator.userAgent;
		fetchPost(this.url, JSON.stringify(json));
	}

}

export default NavLogger;

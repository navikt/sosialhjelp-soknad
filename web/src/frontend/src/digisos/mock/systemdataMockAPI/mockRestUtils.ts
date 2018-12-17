import {getApiBaseUrl, getCookie} from "../../../nav-soknad/utils/rest-utils";

export function settMockData(path: string, payload: object) {
	const url = getApiBaseUrl() + "internal/mock/tjeneste/" + path;
	const OPTIONS: RequestInit = {
		headers: new Headers({
			"accept": "application/json, text/plain, */*",
			"Content-Type": "application/json",
			"X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API")
		}),
		method: "POST",
		credentials: "same-origin",
		body: JSON.stringify(payload)
	};
	return fetch(url, OPTIONS)
		.then((response: Response) => {
			return ;
		});
}

export function clearMockData(path: string) {
	const url = getApiBaseUrl() + "internal/mock/tjeneste/" + path;
	const OPTIONS: RequestInit = {
		headers: new Headers({
			"accept": "application/json, text/plain, */*",
			"Content-Type": "application/json",
			"X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API")
		}),
		method: "DELETE",
		credentials: "same-origin",
	};
	return fetch(url, OPTIONS)
		.then((response: Response) => {
			return ;
		});
}
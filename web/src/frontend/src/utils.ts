export function erDev(): boolean {
	const url = window.location.href;
	return url.indexOf("localhost:3000") > 0;
}

function kjorerJetty(): boolean {
	const url = window.location.href;
	return url.indexOf(":8189") > 0;
}

export function getApiBaseUrl(): string {
	if (erDev()) {
		return "http://localhost:3001/";
	}
	return kjorerJetty() ? "http://127.0.0.1:8181/sendsoknad/" : "/sendsoknad/";
}

export const MED_CREDENTIALS: RequestInit = { credentials: "same-origin" };

export function apiPath() {
	return erDev() ? "informasjon/" : "sendsoknad/";
}

export function fetchPost(urlPath: string, body: string) {
	const OPTIONS: RequestInit = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST",
		body
	};
	return fetch(getApiBaseUrl() + apiPath() + urlPath, OPTIONS)
		.then(sjekkStatuskode)
		.then(toJson);
}

export function fetchToJson(urlPath: string ) {
	const OPTIONS: RequestInit = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "GET"
	};
	return fetch(getApiBaseUrl() + apiPath() + urlPath, OPTIONS)
		.then(sjekkStatuskode)
		.then(toJson);
}

function toJson<T>(response: Response): Promise<T> {
	return response.json();
}

function sjekkStatuskode(response: Response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	throw new Error(response.statusText);
}

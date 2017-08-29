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
		return "http://localhost:3001/informasjon";
	}
	return kjorerJetty() ? "http://127.0.0.1:8181/sendsoknad/" : "/sendsoknad/";
}

/* For å snakke mot sendsoknad app når den kjører lokalt */
const API_BASE_URL = "http://localhost:8181/sendsoknad";

export function fetchPost(url: string, body: string) {
	const OPTIONS: RequestInit = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST",
		body
	};
	return fetch(API_BASE_URL + url, OPTIONS)
		.then(sjekkStatuskode)
		.then(toJson);
}

export function fetchToJson(url: string ) {
	const OPTIONS: RequestInit = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "GET"
	};
	return fetch(API_BASE_URL + url, OPTIONS)
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

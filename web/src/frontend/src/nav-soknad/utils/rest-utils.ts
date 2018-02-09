/* tslint:disable */
export function erDev(): boolean {
	const url = window.location.href;
	return url.indexOf("localhost:3000") > 0;
}

export function kjorerJetty(): boolean {
	const url = window.location.href;
	return url.indexOf(":8189") > 0;
}

export function getApiBaseUrl(): string {
	if (erDev()) {
		// Kjør mot lokal sendsoknad:
		return "http://localhost:8181/sendsoknad/";

		// Kjør mot lokal mock backend:
		// return "http://localhost:3001/";
	}
	return kjorerJetty() ? "http://127.0.0.1:8181/sendsoknad/" : "/sendsoknad/";
}

function getServletBaseUrl(): string {
	if (erDev()) {
		// Kjør mot lokal jetty
		// return "http://localhost:8189/soknadsosialhjelp/";
		return "http://localhost:3001/";
	}
	return "/soknadsosialhjelp/";
}

export function downloadAttachedFile(urlPath: string): void {
	const filUrl = `${getApiBaseUrl()}${urlPath}`;
	window.open(filUrl);
}

export const MED_CREDENTIALS: RequestInit = { credentials: "same-origin" };

enum RequestMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE"
}

const getHeaders = () => [
	["Content-Type", "application/json"],
	["X-XSRF-TOKEN", getCookie("XSRF-TOKEN-SOKNAD-API")],
	["accept", "application/json, text/plain, */*"]
];

const serverRequest = (method: string, urlPath: string, body: string) => {
	const OPTIONS: RequestInit = {
		headers: getHeaders(),
		method,
		credentials: "same-origin",
		body: body ? body : undefined
	};
	return fetch(getApiBaseUrl() + urlPath, OPTIONS)
		.then(sjekkStatuskode)
		.then(toJson);
};

export function fetchToJson(urlPath: string) {
	return serverRequest(RequestMethod.GET, urlPath, null);
}

export function fetchPut(urlPath: string, body: string) {
	return serverRequest(RequestMethod.PUT, urlPath, body);
}

export function fetchPost(urlPath: string, body: string) {
	return serverRequest(RequestMethod.POST, urlPath, body);
}

export function fetchDelete(urlPath: string) {
	const OPTIONS: RequestInit = {
		headers: getHeaders(),
		method: RequestMethod.DELETE,
		credentials: "same-origin"
	};
	return fetch(getApiBaseUrl() + urlPath, OPTIONS).then(sjekkStatuskode);
}

export function fetchOppsummering(urlPath: string) {
	const OPTIONS: RequestInit = {
		headers: [["accept", "application/vnd.oppsummering+html"]],
		method: "GET",
		credentials: "same-origin"
	};
	return fetch(getApiBaseUrl() + urlPath, OPTIONS)
		.then(sjekkStatuskode)
		.then((response: Response) => {
			return response.text();
		});
}

export function fetchKvittering(urlPath: string) {
	const OPTIONS: RequestInit = {
		headers: [
			["accept", "application/vnd.kvitteringforinnsendtsoknad+json"],
			["Content-Type", "application/json"],
			["X-XSRF-TOKEN", getCookie("XSRF-TOKEN-SOKNAD-API")]
		],
		method: "GET",
		credentials: "same-origin"
	};
	return fetch(getApiBaseUrl() + urlPath, OPTIONS)
		.then(sjekkStatuskode)
		.then((response: Response) => {
			return response.json();
		});
}

export function fetchFeatureToggles() {
	const OPTIONS: RequestInit = {
		headers: getHeaders(),
		method: "GET",
		credentials: "same-origin"
	};
	return fetch(getServletBaseUrl() + "api/feature", OPTIONS)
		.then(sjekkStatuskode)
		.then(toJson);
}

export function fetchUpload(urlPath: string, formData: FormData) {
	const OPTIONS: RequestInit = {
		headers: [
			["X-XSRF-TOKEN", getCookie("XSRF-TOKEN-SOKNAD-API")],
			["accept", "application/json, text/plain, */*"]
		],
		method: "POST",
		credentials: "same-origin",
		body: formData
	};
	return fetch(getApiBaseUrl() + urlPath, OPTIONS)
		.then(sjekkStatuskode)
		.then(toJson);
}

export function toJson<T>(response: Response): Promise<T> {
	if (response.status === 204) {
		return response.text() as Promise<any>;
	}
	return response.json();
}

function sjekkStatuskode(response: Response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	throw new Error(response.statusText);
}

export function getCookie(name: string) {
	const value = "; " + document.cookie;
	const parts = value.split("; " + name + "=");
	if (parts.length === 2) {
		return parts
			.pop()
			.split(";")
			.shift();
	} else {
		return "null";
	}
}

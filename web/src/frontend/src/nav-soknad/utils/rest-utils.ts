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

enum RequestMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE"
}

const serverRequest = (method: string, urlPath: string, body: string) => {
	const OPTIONS: RequestInit = {
		headers: {
			"Content-Type": "application/json",
			"X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API"),
			"accept": "application/json, text/plain, */*"
		},
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

export function fetchHtml(urlPath: string) {
	const OPTIONS: RequestInit = {
		headers: {
			"accept": "application/vnd.oppsummering+html"
		},
		method: "GET",
		credentials: "same-origin"
	};
	return fetch(getApiBaseUrl() + urlPath, OPTIONS)
		.then(sjekkStatuskode)
		.then((response: Response) => {
			return response.text();
		});
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

function getCookie(name: string) {
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

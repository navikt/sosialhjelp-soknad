export function erDev(): boolean {
	const url = window.location.href;
	return (url.indexOf("localhost:3000") > 0 || url.indexOf("devillo.no:3000") > 0);
}

enum RequestMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE"
}

const getHeaders = () => {
	return new Headers({
		"Content-Type": "application/json",
		"X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API"),
		"accept": "application/json, text/plain, */*"
	});
};

export function kjorerJetty(): boolean {
	const url = window.location.href;
	return url.indexOf(":8189") > 0;
}

export function getApiBaseUrl(): string {
	if (erDev()) {
		// Kjør mot lokal soknadsosialhjelp-server:
		// return "http://localhost:8181/soknadsosialhjelp-server/";

		// Kjør mot lokal mock backend:
		return "http://localhost:3001/soknadsosialhjelp-server/";
	}
	if (window.location.href.indexOf("localhost:8080") >= 0) {
		return "http://localhost:8181/soknadsosialhjelp-server/";
	}
	if (window.location.origin.indexOf("nais.oera") >= 0) {
		return window.location.origin.replace("soknadsosialhjelp", "soknadsosialhjelp-server") + "/soknadsosialhjelp-server/";
	}
	if (window.location.origin.indexOf("heroku") >= 0) {
		return window.location.origin.replace("sosialhjelp-test", "sosialhjelp-api-test") + "/soknadsosialhjelp-server/";
	}
	return kjorerJetty() ? "http://127.0.0.1:8181/soknadsosialhjelp-server/" : "/soknadsosialhjelp-server/";
}

export function getCookie(name: string) {
	const value = "; " + document.cookie;
	const splits = value.split("; " + name + "=");
	let parts: any[] = [];
	if (splits) {
		parts = splits;
	}
	if (parts.length === 2) {
		return parts.pop().split(";").shift();
	} else {
		return "null";
	}
}

function determineCredentialsParameter() {
	return window.location.origin.indexOf("nais.oera") || erDev() || "heroku" ? "include" : "same-origin";
}

function sjekkStatuskode(response: Response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	throw new Error(response.statusText);
}

export function toJson<T>(response: Response): Promise<T> {
	if (response.status === 204) {
		return response.text() as Promise<any>;
	}
	return response.json();
}

export const serverRequest = (method: string, urlPath: string, body: string) => {
	const OPTIONS: RequestInit = {
		headers: getHeaders(),
		method,
		credentials: determineCredentialsParameter(),
		body: body ? body : undefined
	};

	const promise = new Promise((resolve, reject) => {
		fetch(getApiBaseUrl() + urlPath, OPTIONS)
			.then((response: Response) => {
				if (response.status === 409) {
					throw new Error(response.statusText);
				} else {
					sjekkStatuskode(response);
					resolve(toJson(response));
				}
			})
			.catch((reason: any) => reject(reason));
	});
	return promise;
};

export function fetchToJson(urlPath: string) {
	return serverRequest(RequestMethod.GET, urlPath, "");
}

export function fetchPut(urlPath: string, body: string) {
	return serverRequest(RequestMethod.PUT, urlPath, body);
}

export function fetchPost(urlPath: string, body: string) {
	return serverRequest(RequestMethod.POST, urlPath, body);
}

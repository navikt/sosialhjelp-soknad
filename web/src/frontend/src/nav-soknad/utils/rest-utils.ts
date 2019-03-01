/* tslint:disable */
import { REST_FEIL } from "../types/restFeilTypes";
import {loggFeil} from "../redux/navlogger/navloggerActions";
import {put} from "redux-saga/effects";
import {push} from "react-router-redux";
import {Sider} from "../redux/navigasjon/navigasjonTypes";
import { store } from '../../index';


export const hostAdresseProd = 'tjenester.nav.no';
export const hostAdresseTest = 'tjenester-q0.nav.no';
export const hostAdresseTestNaist1 = 'sosialhjelp-soknad-t1.nais.oera-q.local';
export const hostAdresseTestNaisq0 = 'sosialhjelp-soknad-q0.nais.oera-q.local';
export const hostAdresseTestNaisq1 = 'sosialhjelp-soknad-q1.nais.oera-q.local';
export const hostAdresseLocal = 'localhost:3000';
export const hostAdresseLocalJetty = 'localhost:8080';

export const loginServiceUrlProd = 'https://loginservice.nav.no/login';
export const loginServiceUrlTest = 'https://loginservice-q.nav.no/login';
export const loginServiceUrlLocal = 'http://localhost:8181/sosialhjelp/soknad-api/local/cookie';

export const loginServiceLogoutUrlProd = 'https://loginservice.nav.no/slo';
export const loginServiceLogoutUrlTest = 'https://loginservice-q.nav.no/slo';
export const loginServiceLogoutUrlLocal = 'http://localhost:8181/sosialhjelp/soknad-api/local/slo';

export function erDev(): boolean {
	const url = window.location.href;
	return (url.indexOf("localhost:3000") > 0 || url.indexOf("devillo.no:3000") > 0);
}

export function kjorerJetty(): boolean {
	const url = window.location.href;
	return url.indexOf(":8189") > 0;
}

export function getApiBaseUrl(): string {
	if (erDev()) {
		// Kjør mot lokal sosialhjelp-soknad-api:
		return "http://localhost:8181/sosialhjelp/soknad-api/";

		// Kjør mot lokal mock backend:
		// return "http://localhost:3001/sendsoknad/";
	}
	if (location.href.indexOf("localhost:8080") >= 0) {
		return "http://localhost:8181/sosialhjelp/soknad-api/";
	}
	return kjorerJetty() ? "http://127.0.0.1:8181/sosialhjelp/soknad-api/" : "/sosialhjelp/soknad-api/";
	if (location.origin.indexOf("nais.oera") >= 0) {
		return location.origin.replace("soknad", "soknad-api") + "/sosialhjelp/soknad-api/";
	}
	return kjorerJetty() ? "http://127.0.0.1:8181/sosialhjelp/soknad-api/" : "/sosialhjelp/soknad-api/";
}

export function getRedirectPathname(): string {
	return '/sosialhjelp/soknad/link';
}

export function getLoginServiceUrl(): string {

	const host = window.location.host;
	const currentOrigin = window.location.origin;
	const gotoParameter = "?goto=" + window.location.pathname;
	const redirectPath = currentOrigin + getRedirectPathname() + gotoParameter;
	const redirectParam = '?redirect=' + redirectPath;

	if (host === hostAdresseProd) {
		return loginServiceUrlProd + redirectParam;
	}
	if (host === hostAdresseTest ||
		host === hostAdresseTestNaist1 ||
		host === hostAdresseTestNaisq0 ||
		host === hostAdresseTestNaisq1
	){
		return loginServiceUrlTest + redirectParam;
	}
	if (host === hostAdresseLocal || hostAdresseLocalJetty) {
		return loginServiceUrlLocal + redirectParam;
	}

	loggFeil("host er feil / ukjent. Host: " + host);
	return loginServiceUrlProd + redirectParam;
}

export function getLoginServiceLogoutUrl(){
	const host = window.location.host;

	if (host === hostAdresseProd) {
		return loginServiceLogoutUrlProd;
	}
	if (host === hostAdresseTest ||
		host === hostAdresseTestNaist1 ||
		host === hostAdresseTestNaisq0 ||
		host === hostAdresseTestNaisq1
	){
		return loginServiceLogoutUrlTest;
	}
	if (host === hostAdresseLocal) {
		return loginServiceLogoutUrlLocal;
	}

	loggFeil("host er feil / ukjent. Host: " + host);

	return loginServiceLogoutUrlProd;
}



function determineCredentialsParameter() {
	return location.origin.indexOf("nais.oera") || erDev() ? "include" : "same-origin";
}

function getServletBaseUrl(): string {
	if (erDev()) {
		// Kjør mot lokal jetty
		// return "http://localhost:8189/sosialhjelp/soknad/";
		return "http://localhost:3001/sendsoknad/";
	}
	return "/sosialhjelp/soknad/";
}

export function downloadAttachedFile(urlPath: string): void {
	const filUrl = `${getApiBaseUrl()}${urlPath}`;
	window.open(filUrl);
}

export const MED_CREDENTIALS: RequestInit = { credentials: determineCredentialsParameter() };

enum RequestMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE"
}

const getHeaders = () => {return new Headers({
	"Content-Type": "application/json",
	"X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API"),
	"accept": "application/json, text/plain, */*"
})};

const serverRequest = (method: string, urlPath: string, body: string) => {

	const OPTIONS: RequestInit = {
		headers: getHeaders(),
		method,
		credentials: determineCredentialsParameter(),
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
		credentials: determineCredentialsParameter()
	};
	return fetch(getApiBaseUrl() + urlPath, OPTIONS).then(sjekkStatuskode);
}

export function fetchOppsummering(urlPath: string) {
	const OPTIONS: RequestInit = {
		headers: new Headers({"accept": "application/vnd.oppsummering+html"}),
		method: "GET",
		credentials: determineCredentialsParameter()
	};
	return fetch(getApiBaseUrl() + urlPath, OPTIONS)
		.then(sjekkStatuskode)
		.then((response: Response) => {
			return response.text();
		});
}

export function fetchKvittering(urlPath: string) {
	const OPTIONS: RequestInit = {
		headers: new Headers({
			"accept": "application/vnd.kvitteringforinnsendtsoknad+json",
			"Content-Type": "application/json",
			"X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API")
		}),
		method: "GET",
		credentials: determineCredentialsParameter()
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
		credentials: determineCredentialsParameter()
	};
	return fetch(getServletBaseUrl() + "api/feature", OPTIONS)
		.then(sjekkStatuskode)
		.then(toJson);
}

let generateUploadOptions = function (formData: FormData) {
	const UPLOAD_OPTIONS: RequestInit = {
		headers: new Headers({
			"X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API"),
			"accept": "application/json, text/plain, */*"
		}),
		method: "POST",
		credentials: determineCredentialsParameter(),
		body: formData
	};
	return UPLOAD_OPTIONS;
};

export function fetchUpload(urlPath: string, formData: FormData) {
	return fetch(getApiBaseUrl() + urlPath, generateUploadOptions(formData))
		.then(sjekkStatuskode)
		.then(toJson);
}

export function fetchUploadIgnoreErrors(urlPath: string, formData: FormData) {
	return fetch(getApiBaseUrl() + urlPath, generateUploadOptions(formData))
		.then(toJson);
}

export function toJson<T>(response: Response): Promise<T> {
	if (response.status === 204) {
		return response.text() as Promise<any>;
	}
	if (response.status === 401) {
		return response.text() as Promise<any>;
	}
	return response.json();
}

function sjekkStatuskode(response: Response) {

	const AUTHENTICATION = "authentication";
	const LINK_VISITED = "linkVisited";
	let linkVisited: boolean = store.getState()[AUTHENTICATION][LINK_VISITED];

	if (response.status === 401){
		if(window.location.pathname !== getRedirectPathname()){
			if (!linkVisited){
				window.location.href = getLoginServiceUrl();
			}
		} else {
			put(push(Sider.SERVERFEIL));
		}
		return response;
	}
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

export function detekterInternFeilKode(feilKode: string): string {
	let internFeilKode = feilKode;
	if (feilKode.match(/Request Entity Too Large/i)) {
		internFeilKode = REST_FEIL.FOR_STOR_FIL;
	}
	if (feilKode.match(/Unsupp?orted Media Type/i)) {
		internFeilKode = REST_FEIL.FEIL_FILTPYE;
	}
	return internFeilKode;
}
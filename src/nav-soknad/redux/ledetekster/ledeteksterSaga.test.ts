import { hentTeksterSaga, leggNoklerPaaLedetekster, urlInneholderVistekster } from "./ledeteksterSaga";
import { henterTekster, hentetTekster, hentTeksterFeilet } from "./ledeteksterActions";
import { call, put } from "redux-saga/effects";
import { fetchGet } from "../../utils/rest-utils";
import { loggFeil } from "../navlogger/navloggerActions";

describe("ledeteksterSaga", () => {

	describe("hentTeksterSaga - hovedflyt", () => {

		const saga = hentTeksterSaga();
		const visNokler = false;
		const response = {
			tekst: "tekst"
		};

		it("put henteTekster", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(henterTekster())
			});
		});

		it("fetch tekster", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: call(fetchGet, "informasjon/tekster?sprak=nb_NO&type=soknadsosialhjelp")
			});
		});

		it("call urlInneholderVistekster", () => {
			expect(saga.next(response)).toEqual({
				done: false,
				value: call(urlInneholderVistekster)
			});
		});

		it("put henteTekster med responsen fra fetch", () => {
			expect(saga.next(visNokler)).toEqual({
				done: false,
				value: put(hentetTekster(response))
			});
		});

		it("ferdig", () => {
			expect(saga.next()).toEqual({
				done: true
			});
		});
	});

	describe("hentTeksterSaga - dekorer tekster flyt", () => {
		const saga = hentTeksterSaga();
		const visNokler = true;
		const response = {
			tekst: "tekst"
		};

		saga.next(); // put henteTekster
		saga.next(); // fetch tekster
		saga.next(response); // kaller urlInneholderVistekster

		it("put hentTekster med dekorert response fra fetch", () => {
			expect(saga.next(visNokler)).toEqual({
				done: false,
				value: put(hentetTekster(leggNoklerPaaLedetekster(response)))
			});
		});

		it("ferdig", () => {
			expect(saga.next()).toEqual({
				done: true
			});
		});

	});

	describe("hentTeksterSaga - feilflyt", () => {
		const saga = hentTeksterSaga();
		const reason = "Serverfeil";
		saga.next();

		it("put hentTekstFeiler", () => {
			expect(saga.throw(reason)).toEqual({
				done: false,
				value: put(loggFeil("Problemer med å hente ledetekster: " + reason.toString()))
			});
		});

		it("er ferdig", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(hentTeksterFeilet(reason))
			});
		});

		it("er ferdig", () => {
			expect(saga.next()).toEqual({
				done: true
			});
		});
	});

	describe("leggNoklerPaaLedetekster", () => {
		it("legger til [key} bak hver nøkel", () => {
			const input = {
				key1: "value1",
				key2: "value2"
			};
			const expectedOutput = {
				key1: "value1 [key1]",
				key2: "value2 [key2]"
			};
			expect(leggNoklerPaaLedetekster(input)).toEqual(expectedOutput);
		});
	});

});

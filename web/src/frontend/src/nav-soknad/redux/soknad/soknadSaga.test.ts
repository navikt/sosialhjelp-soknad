import { call, put } from "redux-saga/effects";
// import { finnFaktum, oppdaterFaktumMedProperties } from "../../utils";
import {
	opprettSoknadSaga,
	startSoknadSaga,
	hentSoknadSaga,
	slettSoknadSaga,
	sendSoknadSaga,
	hentKvitteringSaga,
	SKJEMAID
} from "./soknadSaga";
import {
	opprettSoknadOk,
	startSoknad,
	sendSoknad,
	sendSoknadOk,
	slettSoknad,
	slettSoknadOk,
	hentKvittering,
	hentKvitteringOk,
	resetSoknad,
	startSoknadOk
} from "./soknadActions";
import {
	StartSoknadAction,
	SendSoknadAction,
	SlettSoknadAction,
	HentKvitteringAction
} from "./soknadActionTypes";
import {
	tilSteg,
	navigerTilKvittering,
	navigerTilDittNav,
	tilStart
} from "../navigasjon/navigasjonActions";
import { lagreFaktum, resetFakta } from "../fakta/faktaActions";
import { Faktum } from "../../types";
import {
	fetchPost,
	fetchDelete,
	fetchKvittering
} from "../../utils/rest-utils";

describe("soknadSaga", () => {
	describe("opprettSoknadSaga", () => {
		const response = { brukerBehandlingId: "1" };
		const saga = opprettSoknadSaga();
		it("call fetchPost", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: call(
					fetchPost,
					"soknader",
					JSON.stringify({ soknadType: SKJEMAID })
				)
			});
		});

		it("put opprettSoknadOk", () => {
			expect(saga.next(response)).toEqual({
				done: false,
				value: put(opprettSoknadOk(response.brukerBehandlingId))
			});
		});

		it("ferdig", () => {
			expect(saga.next()).toEqual({
				done: true,
				value: "1"
			});
		});
	});

	describe("startSoknadSaga - horten", () => {
		const action: StartSoknadAction = startSoknad(
			"horten"
		) as StartSoknadAction;

		const saga = startSoknadSaga(action);

		it("resets soknad", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(resetSoknad())
			});
		});
		it("resets fakta", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(resetFakta())
			});
		});

		it("calls opprettSoknad", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: call(opprettSoknadSaga)
			});
		});

		it("calls hentSoknad", () => {
			expect(saga.next("1")).toEqual({
				done: false,
				value: call(hentSoknadSaga, { brukerBehandlingId: "1" })
			});
		});

		it("puts kommune", () => {
			const faktum = { faktumId: 0, key: "personalia.kommune" };
			const soknad = {
				fakta: [faktum]
			};
			expect(saga.next(soknad)).toEqual({
				done: false,
				value: put(lagreFaktum({ ...faktum, value: "horten" } as Faktum))
			});
		});

		it("says startSoknadOk", () => {
			expect(saga.next()).toEqual({ done: false, value: put(startSoknadOk()) });
		});

		it("puts tilSteg(1)", () => {
			expect(saga.next()).toEqual({ done: false, value: put(tilSteg(1)) });
		});

		it("ferdig", () => {
			expect(saga.next()).toEqual({ done: true });
		});
	});

	describe("sendSoknad", () => {
		const action = sendSoknad("1") as SendSoknadAction;
		const saga = sendSoknadSaga(action);

		const faktum: Faktum = {
			faktumId: 1,
			key: "1",
			value: "",
			properties: {},
			soknadId: 1,
			parrentFaktum: null
		};
		saga.next(); // Select infofaktum
		saga.next(faktum); // Select fakta
		saga.next([faktum]); // Lagre faktum

		it("call sendSoknad", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: call(
					fetchPost,
					"soknader/1/actions/send",
					JSON.stringify({ behandlingsId: "1" })
				)
			});
		});

		it("puts soknad sendt", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(sendSoknadOk("1"))
			});
		});

		it("puts navigerTilKvittering", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(navigerTilKvittering("1"))
			});
		});

		it("is ferdig", () => {
			expect(saga.next()).toEqual({
				done: true
			});
		});
	});

	describe("slettSoknad default", () => {
		const action = slettSoknad("1") as SlettSoknadAction;
		const saga = slettSoknadSaga(action);

		it("calls slettSoknad", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: call(fetchDelete, "soknader/1")
			});
		});

		it("puts slettSoknadOk", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(slettSoknadOk())
			});
		});

		it("puts navigerTilDittNAV", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(navigerTilDittNav())
			});
		});

		it("er ferdig", () => {
			expect(saga.next()).toEqual({
				done: true
			});
		});
	});

	describe("slettSoknad ved navigasjon til start", () => {
		const action = slettSoknad("1", "START") as SlettSoknadAction;
		const saga = slettSoknadSaga(action);

		it("calls slettSoknad", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: call(fetchDelete, "soknader/1")
			});
		});

		it("puts slettSoknadOk", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(slettSoknadOk())
			});
		});

		it("puts navigerTilDittNAV", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(tilStart())
			});
		});

		it("er ferdig", () => {
			expect(saga.next()).toEqual({
				done: true
			});
		});
	});

	describe("hentKvittering", () => {
		const action = hentKvittering("1") as HentKvitteringAction;
		const saga = hentKvitteringSaga(action);
		it("calls hentKvittering", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: call(fetchKvittering, "soknader/1?sprak=nb_NO")
			});
		});
		const kvittering = {
			navenhet: "horten",
			orgnummer: "123",
			dato: "12. 12. 2017"
		};
		it("puts kvitteringOk", () => {
			expect(saga.next(kvittering)).toEqual({
				done: false,
				value: put(hentKvitteringOk(kvittering))
			});
		});
		it("er ferdig", () => {
			expect(saga.next()).toEqual({ done: true });
		});
	});
});

import { call, put } from "redux-saga/effects";
import {
	opprettSoknadSaga,
	startSoknadSaga,
	hentSoknadSaga,
	slettSoknadSaga,
	sendSoknadSaga,
	SKJEMAID
} from "./soknadSaga";
import {
	opprettSoknadOk,
	startSoknad,
	sendSoknad,
	sendSoknadOk,
	slettSoknad,
	slettSoknadOk
} from "./soknadActions";
import {
	StartSoknadAction,
	SoknadInfoTekster,
	SendSoknadAction,
	SlettSoknadAction
} from "./soknadActionTypes";
import {
	tilSteg,
	navigerTilKvittering,
	navigerTilDittNav
} from "../navigasjon/navigasjonActions";
import { lagreFaktum } from "../fakta/faktaActions";
import { Faktum } from "../../types";
import { fetchPost, fetchDelete } from "../../utils/rest-utils";

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
		const info: SoknadInfoTekster = {
			"1": "",
			"2": "",
			"3": "",
			"4": ""
		};

		const action: StartSoknadAction = startSoknad(
			info,
			"horten"
		) as StartSoknadAction;

		const saga = startSoknadSaga(action);

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

		it("puts informasjonsFaktum", () => {
			saga.next();
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

	describe("slettSoknad", () => {
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
});

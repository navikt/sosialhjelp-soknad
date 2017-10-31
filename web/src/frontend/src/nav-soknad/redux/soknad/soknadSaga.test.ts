import { call, put } from "redux-saga/effects";
import {
	opprettSoknadSaga,
	startSoknadSaga,
	hentSoknadSaga,
	// hentKvittergSaga,
	// sendSoknadSaga,
	SKJEMAID
} from "./soknadSaga";
import { opprettSoknadOk, startSoknad } from "./soknadActions";
import { StartSoknadAction, SoknadInfoTekster } from "./soknadActionTypes";
import { tilSteg } from "../navigasjon/navigasjonActions";
import { lagreFaktum } from "../fakta/faktaActions";
import { Faktum } from "../../types";
import { fetchPost } from "../../utils/rest-utils";

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
});

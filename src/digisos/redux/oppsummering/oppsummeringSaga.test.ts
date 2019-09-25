import { hentOppsummeringSaga } from "./oppsummeringSaga";
import { selectBrukerBehandlingId } from "../selectors";
import { call, select, put } from "redux-saga/effects";
import { fetchOppsummering } from "../../../nav-soknad/utils/rest-utils";
import { hentOppsumeringFeilet, setOppsumering } from "./oppsummeringActions";

describe("oppsummeringSaga", () => {
	describe("hentOppsummeringSaga - hovedflyt", () => {
		const saga = hentOppsummeringSaga();
		const behandlingsID = "id1234";
		const response = "response";

		it("select selectBrukerBehandlingId", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: select(selectBrukerBehandlingId)
			});
		});

		it("call fetchOppsummering", () => {
			expect(saga.next(behandlingsID)).toEqual({
				done: false,
				value: call( fetchOppsummering, `soknader/id1234/` )
			});
		});

		it("put setOppsumering", () => {
			expect(saga.next(response)).toEqual({
				done: false,
				value: put(setOppsumering("response"))
			});
		});

		it("ferdig", () => {
			expect(saga.next()).toEqual({
				done: true
			});
		});
	});

	describe("hentOppsummeringSaga - feilflyt", () => {
		const saga = hentOppsummeringSaga();
		const reason = "reason";
		saga.next();

		it("put hentOppsumeringFeilet", () => {
			expect(saga.throw(reason)).toEqual({
				done: false,
				value: put(hentOppsumeringFeilet(reason))
			});
		});

		it("ferdig", () => {
			expect(saga.next()).toEqual({
				done: true
			});
		});
	});
});

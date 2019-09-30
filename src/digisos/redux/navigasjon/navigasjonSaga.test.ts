import "raf/polyfill";
import {
	getHistoryLength,
	navigateTo,
	tilbakeEllerForsidenSaga,
	tilFinnDittNavKontorSaga,
	tilStegSaga
} from "./navigasjonSaga";
import { call, put } from "redux-saga/effects";
import {
	Sider,
	TilSteg
} from "./navigasjonTypes";
import { SagaIterator } from "redux-saga";
import { tilSteg } from "./navigasjonActions";
import {goBack, push} from "connected-react-router";

const ferdig = (saga: SagaIterator) => {
	expect(saga.next()).toEqual({
		done: true
	});
};

describe("navigasjonSaga", () => {
	describe("tilFinnDittNavKontorSaga", () => {
		const saga = tilFinnDittNavKontorSaga();
		it("call navigateTo", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: call(navigateTo, Sider.FINN_DITT_NAV_KONTOR)
			});
		});

		it("ferdig", () => ferdig(saga));
	});

	describe("tilbakeEllerForsidenSaga - forsiden ", () => {
		const saga = tilbakeEllerForsidenSaga();
		it("call getHistoryLength", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: call(getHistoryLength)
			});
		});

		it("call navigateTo", () => {
			expect(saga.next(1)).toEqual({
				done: false,
				value: call(navigateTo, Sider.FORSIDEN)
			});
		});

		it("ferdig", () => ferdig(saga));
	});

	describe("tilbakeEllerForsidenSaga - tilbake ", () => {
		const saga = tilbakeEllerForsidenSaga();
		saga.next();

		it("put goBack", () => {
			expect(saga.next(2)).toEqual({
				done: false,
				value: put(goBack())
			});
		});

		it("ferdig", () => ferdig(saga));
	});

	describe("tilStegSaga", () => {
		const behandlingsId = "id1234";
		const action = tilSteg(1, behandlingsId);
		const saga = tilStegSaga(action as TilSteg);

		it("put push", () => {
			expect(saga.next(behandlingsId)).toEqual({
				done: false,
				value: put(push("/skjema/id1234/1"))
			});
		});
	});

});

import "raf/polyfill";
import {
	getHistoryLength,
	navigateTo,
	tilbakeEllerForsidenSaga,
	tilFinnDittNavKontorSaga,
	tilServerfeilSaga,
	tilStegSaga
} from "./navigasjonSaga";
import { call, put, select } from "redux-saga/effects";
import {
	Sider,
	TilSteg
} from "./navigasjonTypes";
import { SagaIterator } from "redux-saga";
import { tilSteg } from "./navigasjonActions";
import { settAvbrytSoknadSjekk } from "../soknad/soknadActions";
import {goBack, push} from "connected-react-router";
import {State} from "../reducers";

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

	describe("tilServerfeilSaga", () => {
		const saga = tilServerfeilSaga();
		it("sets avbrytDialogSjek to false", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(settAvbrytSoknadSjekk(false))
			});
		});
		it("call navigateTo", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(push(Sider.SERVERFEIL))
			});
		});
		it("sets avbrytDialogSjek to true", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(settAvbrytSoknadSjekk(true))
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

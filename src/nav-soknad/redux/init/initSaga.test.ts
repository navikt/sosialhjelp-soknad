import { put } from "redux-saga/effects";
import { InitActionTypeKeys } from "./initTypes";
import {
	isAllDataLoaded,
	initActions,
	initActionFeilet
} from "./initSaga";
import { initFeilet } from "./initActions";
import { MiljovariablerActionTypeKeys } from "../miljovariabler/miljovariablerTypes";
import { LedeteksterActionTypeKeys } from "../ledetekster/ledeteksterTypes";
import { TilgangActionTypeKeys } from "../tilgang/tilgangTypes";

describe("initSaga", () => {

	describe("isAllDataLoaded", () => {
		const actions = [...initActions];
		it("loadsTilgang", () => {
			const saga = isAllDataLoaded({
				type: TilgangActionTypeKeys.OK
			});
			expect(saga.next(actions)).toEqual({
				done: true
			});
		});
		it("loadsTekster", () => {
			const saga = isAllDataLoaded({
				type: LedeteksterActionTypeKeys.OK
			});
			expect(saga.next(actions)).toEqual({
				done: true
			});
		});
		it("loadsMiljøvariabler", () => {
			const saga = isAllDataLoaded({
				type: MiljovariablerActionTypeKeys.OK
			});
			expect(saga.next(actions)).toEqual({
				done: true
			});
		});
	});

	describe("initFeilet", () => {
		const action = {
			type: InitActionTypeKeys.FEILET
		};
		const saga = initActionFeilet();
		expect(saga.next(action)).toEqual({
			done: false,
			value: put(initFeilet())
		});
		expect(saga.next(action)).toEqual({
			done: true
		});
	});
});

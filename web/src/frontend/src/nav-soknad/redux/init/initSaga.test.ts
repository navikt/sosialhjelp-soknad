import { put } from "redux-saga/effects";
import { InitActionTypeKeys } from "./initTypes";
import {
	startInit,
	isAllDataLoaded,
	initActions,
	initActionFeilet
} from "./initSaga";
import { initFerdig, initFeilet } from "./initActions";
import { hentMiljovariabler } from "../miljovariabler/miljovariablerActions";
import { hentTekster } from "../ledetekster/ledeteksterActions";
import { hentTilgang } from "../tilgang/tilgangActions";
import { hentFeatureToggles } from "../featuretoggles/featureTogglesActions";
import { FeatureTogglesActionTypeKeys } from "../featuretoggles/featureTogglesTypes";
import { MiljovariablerActionTypeKeys } from "../miljovariabler/miljovariablerTypes";
import { LedeteksterActionTypeKeys } from "../ledetekster/ledeteksterTypes";
import { TilgangActionTypeKeys } from "../tilgang/tilgangTypes";

describe("initSaga", () => {
	describe("startInit", () => {
		const saga = startInit();

		it("henterTekster", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(hentMiljovariabler())
			});
			expect(saga.next()).toEqual({
				done: false,
				value: put(hentFeatureToggles())
			});
			expect(saga.next()).toEqual({
				done: false,
				value: put(hentTilgang())
			});
			expect(saga.next()).toEqual({
				done: false,
				value: put(hentTekster())
			});
			expect(saga.next()).toEqual({
				done: true
			});
		});
	});

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
		it("loadsFeaturetoggles", () => {
			const saga = isAllDataLoaded({
				type: FeatureTogglesActionTypeKeys.OK
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
				done: false,
				value: put(initFerdig())
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

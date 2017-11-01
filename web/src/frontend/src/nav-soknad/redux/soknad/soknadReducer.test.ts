import soknadReducer, { defaultState } from "./soknadReducer";
import {
	SoknadActionTypeKeys,
	HentSoknaOkAction,
	AvbrytSoknadAction,
	FortsettSoknadAction,
	ResetSoknadAction
} from "./soknadActionTypes";
import { Soknad, Faktum } from "../../types";

const faktum: Faktum = {
	soknadId: 1,
	faktumId: 1,
	key: "test.faktum",
	value: "abc",
	properties: null,
	parrentFaktum: null
};

const soknad: Soknad = {
	...defaultState.data,
	soknadId: 1,
	fakta: [faktum]
};

describe("soknad reducer", () => {
	it("should load soknad", () => {
		const action: HentSoknaOkAction = {
			type: SoknadActionTypeKeys.HENT_SOKNAD_OK,
			data: soknad
		};
		const updatedState = soknadReducer(defaultState, action);
		expect(updatedState.data.soknadId).toBe(1);
	});

	it("should show avbrytSoknadDialog", () => {
		const action: AvbrytSoknadAction = {
			type: SoknadActionTypeKeys.AVBRYT_SOKNAD
		};
		const updatedState = soknadReducer(defaultState, action);
		expect(updatedState.avbrytDialogSynlig).toBeTruthy();
	});

	it("should hide avbrytSoknadDialog", () => {
		const action: FortsettSoknadAction = {
			type: SoknadActionTypeKeys.FORTSETT_SOKNAD
		};
		const updatedState = soknadReducer(defaultState, action);
		expect(updatedState.avbrytDialogSynlig).toBeFalsy();
	});

	it("should reset soknad", () => {
		const updateAction: HentSoknaOkAction = {
			type: SoknadActionTypeKeys.HENT_SOKNAD_OK,
			data: soknad
		};
		const updatedState = soknadReducer(defaultState, updateAction);
		expect(updatedState.data.soknadId).toBe(1);
		const resetAction: ResetSoknadAction = {
			type: SoknadActionTypeKeys.RESET_SOKNAD
		};
		const resetState = soknadReducer(updatedState, resetAction);
		expect(resetState.data.soknadId).toBe(null);
	});
});

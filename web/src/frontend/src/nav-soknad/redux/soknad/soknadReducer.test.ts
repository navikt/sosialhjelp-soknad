import soknadReducer, { defaultState } from "./soknadReducer";
import { SoknadActionTypeKeys, HentSoknaOkAction } from "./soknadActionTypes";
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
	fakta: [faktum]
};

describe("soknad reducer", () => {
	it("should load soknad", () => {
		const action: HentSoknaOkAction = {
			type: SoknadActionTypeKeys.HENT_SOKNAD_OK,
			data: soknad
		};
		const updatedState = soknadReducer(defaultState, action);
		expect(updatedState.data.fakta.length).toBe(1);
	});
});

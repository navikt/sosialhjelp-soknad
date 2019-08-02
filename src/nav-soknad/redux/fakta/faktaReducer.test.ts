import faktumReducer from "./faktaReducer";
import { FaktumActionTypeKeys, FaktaActionTypeKeys } from "./faktaActionTypes";

describe("facts reducer", () => {
	const defaultState = {
		restStatus: FaktaActionTypeKeys.OTHER_ACTION,
		data: [
			{
				key: "bolk",
				value: "Not updated value",
				type: "BRUKERREGISTRERT",
				faktumId: 1,
				soknadId: 1,
				parrentFaktum: 1,
				properties: {}
			}
		],
		progresjonPending: false
	};

	const testFaktum = {
		key: "bolk",
		value: "123",
		type: "BRUKERREGISTRERT",
		faktumId: 1,
		soknadId: 1,
		parrentFaktum: 1,
		properties: {}
	};

	it("should updates single fact", () => {
		const newFaktumState = faktumReducer(defaultState, {
			type: FaktumActionTypeKeys.OPPDATER_FAKTUM,
			faktum: testFaktum
		});
		expect(newFaktumState.data[0].value).toEqual("123");
	});

	it("should bulk update all facts", () => {
		expect(
			faktumReducer(defaultState, {
				type: FaktaActionTypeKeys.SET_FAKTA,
				fakta: [testFaktum, testFaktum]
			}).data.length
		).toEqual(2);
	});
});

import faktumReducer from "./faktaReducer";
import { ActionTypeKeys } from "./faktaTypes";

describe("facts reducer", () => {
	const defaultState = {
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
		]
	};

	const testFaktum = {
		key: "bolk",
		value: 123,
		type: "BRUKERREGISTRERT",
		faktumId: 1,
		soknadId: 1,
		parrentFaktum: 1,
		properties: {}
	};

	it("should updates single fact", () => {
		const newFaktumState = faktumReducer(defaultState, {
			type: ActionTypeKeys.SET_FAKTUM_VERDI,
			faktum: testFaktum
		});
		expect(newFaktumState.data[0].value).toEqual(123);
	});

	it("should bulk update all facts", () => {
		expect(
			faktumReducer(defaultState, {
				type: ActionTypeKeys.SET_FAKTA,
				fakta: [testFaktum, testFaktum]
			}).data.length
		).toEqual(2);
	});

});

import faktumReducer from "./reducer";
import { ActionTypeKeys } from "./types";

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

	it("should updates single fact", () => {
		const newFaktumState = faktumReducer(defaultState, {
			type: ActionTypeKeys.SET_FAKTUM_VERDI,
			faktum: {
				key: "bolk",
				value: 123,
				type: "BRUKERREGISTRERT",
				faktumId: 1,
				soknadId: 1,
				parrentFaktum: 1,
				properties: {}
			}

		});
		expect(newFaktumState.data[0].value).toEqual(123);
	});

	// it("should throw exception when adding unknown fact key", () => {
	// 	try {
	// 		// const newFaktumState =
	// 		faktumReducer(defaultState, {
	// 			type: ActionTypeKeys.SET_FAKTUM_VERDI,
	// 			faktumKey: "ny-bolk",
	// 			value: 456,
	// 			faktumId: 456
	// 		});
	// 		// expect(newFaktumState.data.length).toEqual(2);
	// 		// expect(newFaktumState.data.slice(-1)[0].key).toEqual("ny-bolk");
	// 		fail();
	// 	} catch(e) {
	// 	}
	//
	// });
	//
	// it("should bulk update all facts", () => {
	// 	expect(
	// 		faktumReducer(defaultState, {
	// 			type: ActionTypeKeys.SET_FAKTA,
	// 			fakta: [
	// 				{
	// 					key: "bolk",
	// 					value: null,
	// 					type: "BRUKERREGISTRERT",
	// 					faktumId: 543
	// 				},
	// 				{
	// 					key: "foo",
	// 					value: "bar",
	// 					type: "BRUKERREGISTRERT",
	// 					faktumId: 5434
	// 				}
	// 			]
	// 		}).data.length
	// 	).toEqual(2);
	// });
	//
	// it("reset fact", () => {
	// 	const initialState = faktumReducer(defaultState, {
	// 		type: ActionTypeKeys.SET_FAKTA,
	// 		fakta: [
	// 			{
	// 				key: "bolk",
	// 				value: null,
	// 				type: "BRUKERREGISTRERT",
	// 				faktumId: 54232
	// 			},
	// 			{
	// 				key: "foo",
	// 				value: "bar",
	// 				type: "BRUKERREGISTRERT",
	// 				faktumId: 542342
	// 			}
	// 		]
	// 	});
	// 	expect(
	// 		faktumReducer(initialState, {
	// 			type: ActionTypeKeys.RESET_FAKTUM_VERDI,
	// 			faktumKey: "foo",
	// 			faktumId: 8484
	// 		}).data.length
	// 	).toEqual(1);
	// });
});

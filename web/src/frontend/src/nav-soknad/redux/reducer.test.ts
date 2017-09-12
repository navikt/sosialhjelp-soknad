import faktumReducer from "./reducer";
import { ActionTypeKeys } from "./types";

describe("facts reducer", () => {
	const defaultState = {
		data: [
			{
				key: "bolk",
				value: "Not updated value",
				type: "BRUKERREGISTRERT"
			}
		]
	};
	it("should updates single fact", () => {
		const newFaktumState = faktumReducer(defaultState, {
			type: ActionTypeKeys.SET_FAKTUM_VERDI,
			faktumKey: "bolk",
			value: 123
		});
		expect(newFaktumState.data[0].value).toEqual(123);
	});

	it("should add unknown fact", () => {
		const newFaktumState = faktumReducer(defaultState, {
			type: ActionTypeKeys.SET_FAKTUM_VERDI,
			faktumKey: "ny-bolk",
			value: 456
		});
		expect(newFaktumState.data.length).toEqual(2);
		expect(newFaktumState.data.slice(-1)[0].key).toEqual("ny-bolk");
	});

	it("should bulk update all facts", () => {
		expect(
			faktumReducer(defaultState, {
				type: ActionTypeKeys.SET_FAKTA,
				fakta: [
					{
						key: "bolk",
						value: null,
						type: "BRUKERREGISTRERT"
					},
					{
						key: "foo",
						value: "bar",
						type: "BRUKERREGISTRERT"
					}
				]
			}).data.length
		).toEqual(2);
	});

	it("reset fact", () => {
		const initialState = faktumReducer(defaultState, {
			type: ActionTypeKeys.SET_FAKTA,
			fakta: [
				{
					key: "bolk",
					value: null,
					type: "BRUKERREGISTRERT"
				},
				{
					key: "foo",
					value: "bar",
					type: "BRUKERREGISTRERT"
				}
			]
		});
		expect(
			faktumReducer(initialState, {
				type: ActionTypeKeys.RESET_FAKTUM_VERDI,
				faktumKey: "foo"
			}).data.length
		).toEqual(1);
	});
});

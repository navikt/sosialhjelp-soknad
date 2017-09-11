import faktumReducer from "./reducer";
import { setFaktumVerdi } from "./actions";

describe("setFaktumVerdi action creator", () => {
	const defaultState = {
		data: [
			{
				key: "bolk",
				value: "Not updated value",
				type: "TEST"
			},
			{
				key: "bolk2",
				value: 123,
				type: "TEST"
			}
		]
	};

	it("should update fact", () => {
		let newFaktumState = faktumReducer(
			defaultState,
			setFaktumVerdi("bolk", 789)
		);
		expect(newFaktumState.data.length).toEqual(2);
		expect(newFaktumState.data[0].value).toEqual(789);
		expect(newFaktumState.data[0].key).toEqual("bolk");

		newFaktumState = faktumReducer(
			newFaktumState,
			setFaktumVerdi("bolk", false)
		);
		expect(newFaktumState.data[0].value).toEqual(false);
		newFaktumState = faktumReducer(
			newFaktumState,
			setFaktumVerdi("bolk", true)
		);
		expect(newFaktumState.data[0].value).toEqual(true);
	});

	it("should add fact", () => {
		const newFaktumState = faktumReducer(
			defaultState,
			setFaktumVerdi("ny_bolk", 789)
		);
		expect(newFaktumState.data.length).toEqual(3);
		expect(newFaktumState.data.slice(-1)[0].key).toEqual("ny_bolk");
	});
});

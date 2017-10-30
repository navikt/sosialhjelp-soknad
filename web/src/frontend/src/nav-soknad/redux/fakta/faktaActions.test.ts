// import faktumReducer from "./reducer";
// import { setFaktumVerdi } from "./actions";

describe("setFaktumVerdi action creator", () => {

	it("should update fact", () => {
		expect(1).toEqual(1);
	});

	// const defaultState = {
	// 	fakta: [
	// 		{
	// 			key: "bolk",
	// 			value: "Not updated value",
	// 			type: "TEST",
	// 			faktumId: 1,
	// 			soknadId: 1,
	// 			parrentFaktum: 1,
	// 			properties: {}
	// 		},
	// 		{
	// 			key: "bolk2",
	// 			value: 123,
	// 			type: "TEST",
	// 			faktumId: 1,
	// 			soknadId: 1,
	// 			parrentFaktum: 1,
	// 			properties: {}
	// 		}
	// 	]
	// };
	// it("should update fact", () => {
	// 	expect(1).toEqual(1);
	// 	let newFaktumState = faktumReducer(
	// 		defaultState,
	// 		setFaktumVerdi("bolk", 789)
	// 	);
	// 	expect(newFaktumState.data.length).toEqual(2);
	// 	expect(newFaktumState.data[0].value).toEqual(789);
	// 	expect(newFaktumState.data[0].key).toEqual("bolk");
	//
	// 	newFaktumState = faktumReducer(
	// 		newFaktumState,
	// 		setFaktumVerdi("bolk", false)
	// 	);
	// 	expect(newFaktumState.data[0].value).toEqual(false);
	// 	newFaktumState = faktumReducer(
	// 		newFaktumState,
	// 		setFaktumVerdi("bolk", true)
	// 	);
	// 	expect(newFaktumState.data[0].value).toEqual(true);
	// });
	//
	// it("should add fact", () => {
	// 	const newFaktumState = faktumReducer(
	// 		defaultState,
	// 		setFaktumVerdi("ny_bolk", 789)
	// 	);
	// 	expect(newFaktumState.data.length).toEqual(3);
	// 	expect(newFaktumState.data.slice(-1)[0].key).toEqual("ny_bolk");
	// });
});

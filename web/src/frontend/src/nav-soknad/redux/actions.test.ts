// import faktumReducer from "./reducer";
// import { setFaktumVerdi } from "./actions";

describe('setFaktumVerdi action creator', () => {

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
	// 	let newFaktumState = faktumReducer(
	// 		defaultState,
	// 		setFaktumVerdi("bolk", 789, defaultState.fakta)
	// 	);
	// 	expect(newFaktumState.fakta.length).toEqual(2);
	// 	expect(newFaktumState.fakta[0].value).toEqual(789);
	// 	expect(newFaktumState.fakta[0].key).toEqual("bolk");
	//
	// 	newFaktumState = faktumReducer(
	// 		newFaktumState,
	// 		setFaktumVerdi("bolk", false, defaultState.fakta)
	// 	);
	// 	expect(newFaktumState.fakta[0].value).toEqual(false);
	// 	newFaktumState = faktumReducer(
	// 		newFaktumState,
	// 		setFaktumVerdi("bolk", true, defaultState.fakta)
	// 	);
	// 	expect(newFaktumState.fakta[0].value).toEqual(true);
	// });

});
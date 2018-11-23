import AdresseAutocompleteReducer, {
	AdresseAutocompleteActionTypeKeys,
	AdresseAutocompleteStatus,
	AdresseAutocompleteState
} from "./adresseAutocompleteReducer";

describe("adresse autcomplete", () => {

	const defaultState: AdresseAutocompleteState = {
		value: "",
		status: AdresseAutocompleteStatus.INITIELL,
		valgtAdresse: null,
	};

	const reducer = AdresseAutocompleteReducer;

	it("should handle state", () => {
		const newState = reducer(defaultState,
			{
				type: AdresseAutocompleteActionTypeKeys.SETT_VERDI,
				value: "rakei"
			});
		expect(newState.value).toEqual("rakei");
	});

	it("burde detektere at bare husnummer er tastet inn", () => {
		// const initialState = reducer(defaultState, {
		// 	type: AdresseAutcompleteActionTypeKeys.SETT_VALGT_ADRESSE,
		// 	valgtAdresse: {
		// 		adresse "rakeivegen, 0123 Oslo"
		// 	}
		// });
		// const newState = reducer(initialState,
		// {
		// 	type: AdresseAutcompleteActionTypeKeys.SETT_VERDI,
		// 		value: "rakeivegen 45b, 0123 Oslo"
		// });

	});
});

import SoknadsdataReducer, {
	initialSoknadsdataState,
	oppdaterSoknadsdataSti, SoknadsSti
} from "./soknadsdataReducer";

describe("søknadsdata reducer", () => {

	it('should not overwrite existing values', function () {
		const reducer = SoknadsdataReducer;
		const telefonnummerData = {
			"brukerdefinert": true,
			"systemverdi": "+4798765432",
			"verdi": "+4791852968"
		};
		const action = oppdaterSoknadsdataSti(SoknadsSti.TELEFONNUMMER, telefonnummerData);
		const state1 = reducer(initialSoknadsdataState, action);

		expect(state1.personalia.telefonnummer.verdi).toEqual(telefonnummerData.verdi);

		const kontonummerData = {
			brukerdefinert: true,
			systemverdi: "1111",
			brukerutfyltVerdi: "222",
			harIkkeKonto: false
		};
		const state2 = SoknadsdataReducer(state1, oppdaterSoknadsdataSti(SoknadsSti.BANKINFORMASJON, kontonummerData));
		expect(state2.personalia.kontonummer.brukerutfyltVerdi).toEqual(kontonummerData.brukerutfyltVerdi);
		expect(state2.personalia.telefonnummer.verdi).toEqual(telefonnummerData.verdi);
	});
});

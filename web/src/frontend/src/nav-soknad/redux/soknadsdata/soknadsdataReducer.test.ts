
describe("søknadsdata reducer", () => {

	it('should handle updates', function () {
		const telefonnummerData = {
			"personalia": {
				"telefonnummer": {
					"brukerdefinert": true,
					"systemverdi": "+4798765432",
					"verdi": "+4791852968"
				}
			}
		};
		expect(telefonnummerData).toBeTruthy();
	});

});
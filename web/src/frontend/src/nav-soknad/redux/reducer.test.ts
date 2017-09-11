import faktumReducer from "./reducer";
import { ActionTypeKeys } from "./types";

describe('facts reducer', () => {
    const defaultState = {
        fakta: [
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
    	let newFaktumState = faktumReducer(defaultState, {
		    type: ActionTypeKeys.SET_FAKTUM_VERDI,
		    faktumKey: "bolk",
		    value: 123
	    });
        expect(newFaktumState.fakta[0].value).toEqual(123);
    });

    it("should add unknown fact", () => {
		let newFaktumState = faktumReducer(defaultState, {
			type: ActionTypeKeys.SET_FAKTUM_VERDI,
			faktumKey: "ny-bolk",
			value: 456
		});
		expect(newFaktumState.fakta.length).toEqual(2);
		expect(newFaktumState.fakta.slice(-1)[0].key).toEqual("ny-bolk");
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
            })
            .fakta.length
        ).toEqual(2)
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
            }).fakta.length
        ).toEqual(1)
    });
});
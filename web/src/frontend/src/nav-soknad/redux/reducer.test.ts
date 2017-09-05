import faktumReducer from "./reducer";
import { ActionTypeKeys } from "./types";

describe('facts reducer', () => {
    const defaultState = {
        fakta: [
            {
                key: "bolker",
                value: "Not updated value",
                type: "BRUKERREGISTRERT"
            }
        ]
    };
    it("updates single fact", () => {
        expect(
            faktumReducer(defaultState, {
                type: ActionTypeKeys.SET_FAKTUM_VERDI,
                faktumKey: "bolker",
                value: "Updated value"
            })
        ).toEqual(
            {
                fakta: [
                    {
                        key: "bolker",
                        value: "Updated value",
                        type: "BRUKERREGISTRERT"
                    }
                ]
            }
        )
    });

    it("set all facts", () => {
        expect(
            faktumReducer(defaultState, {
                type: ActionTypeKeys.SET_FAKTA,
                fakta: [
                    {
                        key: "bolker",
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
                    key: "bolker",
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
import "raf/polyfill";
import {tilStegSaga} from "./navigasjonSaga";
import {put} from "redux-saga/effects";
import {TilSteg} from "./navigasjonTypes";
import {tilSteg} from "./navigasjonActions";
import {push} from "connected-react-router";

describe("navigasjonSaga", () => {
    describe("tilStegSaga", () => {
        const behandlingsId = "id1234";
        const action = tilSteg(1, behandlingsId);
        const saga = tilStegSaga(action as TilSteg);

        it("put push", () => {
            expect(saga.next(behandlingsId)).toEqual({
                done: false,
                value: put(push("/skjema/id1234/1")),
            });
        });
    });
});

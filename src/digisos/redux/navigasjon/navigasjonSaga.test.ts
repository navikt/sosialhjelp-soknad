import "raf/polyfill";
import {navigateTo, tilFinnDittNavKontorSaga, tilStegSaga} from "./navigasjonSaga";
import {call, put} from "redux-saga/effects";
import {Sider, TilSteg} from "./navigasjonTypes";
import {SagaIterator} from "redux-saga";
import {tilSteg} from "./navigasjonActions";
import {push} from "connected-react-router";

const ferdig = (saga: SagaIterator) => {
    expect(saga.next()).toEqual({
        done: true,
    });
};

describe("navigasjonSaga", () => {
    describe("tilFinnDittNavKontorSaga", () => {
        const saga = tilFinnDittNavKontorSaga();
        it("call navigateTo", () => {
            expect(saga.next()).toEqual({
                done: false,
                value: call(navigateTo, Sider.FINN_DITT_NAV_KONTOR),
            });
        });

        it("ferdig", () => ferdig(saga));
    });

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

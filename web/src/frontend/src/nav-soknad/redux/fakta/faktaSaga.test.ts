import "raf/polyfill";

import {
	feiletFaktumSaga,
	lagreFaktumSaga,
	opprettFaktumSaga,
	slettFaktumSaga
} from "./faktaSaga";
import {
	lagreFaktum,
	lagreFaktumFeilet,
	lagretFaktum,
	opprettetFaktum,
	opprettFaktum,
	opprettFaktumFeilet,
	slettetFaktum,
	slettFaktum,
	slettFaktumFeilet
} from "./faktaActions";
import { Faktum } from "../../types/navSoknadTypes";
import { call, put, select } from "redux-saga/effects";
import { fetchDelete, fetchPost, fetchPut } from "../../utils/rest-utils";
import { prepFaktumForLagring } from "./faktaUtils";
import { navigerTilServerfeil } from "../navigasjon/navigasjonActions";
import { LagreFaktum, OpprettFaktum, SlettFaktum } from "./faktaTypes";
import { selectBrukerBehandlingId } from "../selectors";

describe("faktaSaga", () => {
	describe("lagreFaktumSaga - hovedflyt", () => {
		const faktum: Faktum =  {
			faktumId: 1,
			value: "1234",
			soknadId: 1,
			parrentFaktum: null,
			key: "test",
			properties: []
		};
		const response = faktum;
		const action = lagreFaktum(faktum) as LagreFaktum;
		const saga = lagreFaktumSaga(action);

		it("call fetchPut", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: call( fetchPut, "fakta/1", prepFaktumForLagring(action.faktum) )
			});
		});

		it("put lagretFaktum", () => {
			expect(saga.next(response)).toEqual({
				done: false,
				value: put( lagretFaktum(faktum) )
			});
		});

		it("ferdig", () => {
			expect(saga.next()).toEqual({
				done: true
			});
		});
	});

	describe("lagreFaktumSaga - fetchPut feilet", () => {
		const faktum: Faktum =  {
			faktumId: 1,
			value: "1234",
			soknadId: 1,
			parrentFaktum: null,
			key: "test",
			properties: []
		};
		const reason = "Serverfeil";
		const action = lagreFaktum(faktum) as LagreFaktum;
		const saga = lagreFaktumSaga(action);
		saga.next();

		it("put lagreFaktumFeilet", () => {
			expect(saga.throw(reason)).toEqual({
				done: false,
				value: put( lagreFaktumFeilet("Serverfeil") )
			});
		});

		it("ferdig", () => {
			expect(saga.next()).toEqual({
				done: true
			});
		});
	});

	describe("opprettFaktumSaga - hovedflyt", () => {
		const faktum = {
			key: "test.test",
			parrentFaktum: 1
		};
		const brukerBehandlingId = "id1234";
		const response: Faktum =  {
			faktumId: 1,
			value: "1234",
			soknadId: 1,
			parrentFaktum: 1,
			key: "test.test",
			properties: []
		};
		const action = opprettFaktum(faktum) as OpprettFaktum;
		const saga = opprettFaktumSaga(action);

		it("select brukerBehandlingId", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: select( selectBrukerBehandlingId )
			});
		});

		it("call fetchPost", () => {
			expect(saga.next(brukerBehandlingId)).toEqual({
				done: false,
				value: call( fetchPost, "fakta?behandlingsId=id1234", JSON.stringify(faktum) )
			});
		});

		it("put opprettetFaktum", () => {
			expect(saga.next(response)).toEqual({
				done: false,
				value: put( opprettetFaktum(response) )
			});
		});

		it("ferdig", () => {
			expect(saga.next()).toEqual({
				done: true
			});
		});
	});

	describe("opprettFaktumSaga - fetchPut feilet", () => {
		const faktum = {
			key: "test.test",
			parrentFaktum: 1
		};
		const reason = "Serverfeil";
		const action = opprettFaktum(faktum) as OpprettFaktum;
		const saga = opprettFaktumSaga(action);
		saga.next();

		it("put opprettFaktumFeilet", () => {
			expect(saga.throw(reason)).toEqual({
				done: false,
				value: put( opprettFaktumFeilet("Serverfeil") )
			});
		});

		it("ferdig", () => {
			expect(saga.next()).toEqual({
				done: true
			});
		});
	});

	describe("slettFaktumSaga - hovedFlyt", () => {
		const faktumId = 1;
		const action = slettFaktum(faktumId) as SlettFaktum;
		const saga = slettFaktumSaga(action);

		it("call fetchDelete", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: call( fetchDelete, "fakta/1")
			});
		});

		it("put slettetFaktum", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put( slettetFaktum() )
			});
		});

		it("ferdig", () => {
			expect(saga.next()).toEqual({
				done: true
			});
		});
	});

	describe("slettFaktumSaga - fetchDelete feilet", () => {
		const faktumId = 1;
		const action = slettFaktum(faktumId) as SlettFaktum;
		const saga = slettFaktumSaga(action);
		const reason = "Serverfeil";
		saga.next();

		it("put opprettFaktumFeilet", () => {
			expect(saga.throw(reason)).toEqual({
				done: false,
				value: put( slettFaktumFeilet("Serverfeil") )
			});
		});

		it("ferdig", () => {
			expect(saga.next()).toEqual({
				done: true
			});
		});
	});

	describe("feiletFaktumSaga", () => {
		const saga = feiletFaktumSaga();
		it("put navigerTilServerfeil", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(navigerTilServerfeil())
			});
		});

		it("ferdig", () => {
			expect(saga.next()).toEqual({
				done: true
			});
		});
	});
});

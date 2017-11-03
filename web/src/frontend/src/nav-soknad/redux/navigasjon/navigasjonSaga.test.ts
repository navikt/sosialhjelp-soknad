import {
	navigateTo,
	tilFinnDittNavKontorSaga,
	tilServerfeilSaga,
	tilbakeEllerForsidenSaga,
	getHistoryLength,
	tilStegSaga,
	gaVidereSaga,
	skalHoppeOverNesteStegSaga
} from "./navigasjonSaga";
import { call, put, select, take } from "redux-saga/effects";
import { GaVidere, Sider, TilSteg } from "./navigasjonTypes";
import { push, goBack } from "react-router-redux";
import { SagaIterator } from "redux-saga";
import { gaVidere, tilSteg } from "./navigasjonActions";
import { setFaktum, lagreFaktum } from "../fakta/faktaActions";
import { Faktum } from "../../types/navSoknadTypes";
import { oppdaterFaktumMedVerdier } from "../../utils/faktumUtils";
import { FaktumActionTypeKeys } from "../fakta/faktaActionTypes";
import { selectProgresjonFaktum, selectBrukerBehandlingId, selectSynligFaktaData } from "../selectors";
import { hentSynligeFakta } from "../../../digisos/redux/synligefakta/synligeFaktaActions";
import { SynligeFaktaActionTypeKeys } from "../../../digisos/redux/synligefakta/synligeFaktaTypes";

const ferdig = (saga: SagaIterator) => {
	expect(saga.next()).toEqual({
		done: true
	});
};

describe("navigasjonSaga", () => {
	describe("tilFinnDittNavKontorSaga", () => {
		const saga = tilFinnDittNavKontorSaga();
		it("call navigateTo", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: call( navigateTo, Sider.FINN_DITT_NAV_KONTOR )
			});
		});

		it("ferdig", () => ferdig(saga));
	});

	describe("tilServerfeilSaga", () => {
		const saga = tilServerfeilSaga();
		it("call navigateTo", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put( push(Sider.SERVERFEIL ) )
			});
		});

		it("ferdig", () => ferdig(saga));
	});

	describe("tilbakeEllerForsidenSaga - forsiden ", () => {
		const saga = tilbakeEllerForsidenSaga();
		it("call getHistoryLength", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: call( getHistoryLength )
			});
		});

		it("call navigateTo", () => {
			expect(saga.next(1)).toEqual({
				done: false,
				value: call(navigateTo, Sider.FORSIDEN)
			});
		});

		it("ferdig", () => ferdig(saga));
	});

	describe("tilbakeEllerForsidenSaga - tilbake ", () => {
		const saga = tilbakeEllerForsidenSaga();
		saga.next();

		it("put goBack", () => {
			expect(saga.next(2)).toEqual({
				done: false,
				value: put( goBack() )
			});
		});

		it("ferdig", () => ferdig(saga));
	});

	describe("tilStegSaga", () => {
		const action = tilSteg(1);
		const saga = tilStegSaga(action as TilSteg);
		const behandlingsId = "id1234";

		it("select behandlingsId", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: select( selectBrukerBehandlingId )
			});
		});

		it("put push", () => {
			expect(saga.next(behandlingsId)).toEqual({
				done: false,
				value: put( push("/skjema/id1234/1") )
			});
		});
	});

	describe("gaVidereSaga - lagreFaktum", () => {
		const progresjonFaktum: Faktum =  {
			faktumId: 1,
			value: "1",
			soknadId: 1,
			parrentFaktum: null,
			key: "progresjon",
			properties: []
		};
		const oppdatertFaktum: Faktum = {
			faktumId: 1,
			value: "2",
			soknadId: 1,
			parrentFaktum: null,
			key: "progresjon",
			properties: []
		};
		const action = gaVidere(1);
		const saga = gaVidereSaga(action as GaVidere);

		it("call skalHoppeOverNesteStegSaga", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: call(skalHoppeOverNesteStegSaga, 1)
			});
		});

		it("select selectProgresjonFaktum", () => {
			expect(saga.next(false)).toEqual({
				done: false,
				value: select(selectProgresjonFaktum)
			});
		});

		it("call oppdaterFaktumMedVerdier", () => {
			expect(saga.next(progresjonFaktum)).toEqual({
				done: false,
				value: call(oppdaterFaktumMedVerdier, progresjonFaktum, "2")
			});
		});

		it("put setFaktum", () => {
			expect(saga.next(oppdatertFaktum)).toEqual({
				done: false,
				value: put( setFaktum(oppdatertFaktum) )
			});
		});

		it("put lagreFaktum", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put( lagreFaktum(oppdatertFaktum) )
			});
		});

		it("take LAGRET_FAKTUM", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: take([FaktumActionTypeKeys.LAGRET_FAKTUM])
			});
		});

		it("put tilSteg", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(tilSteg(2))
			});
		});

		it("ferdig", () => ferdig(saga));
	});

	describe("gaVidereSaga - hopp over lagreFaktum", () => {
		const progresjonFaktum: Faktum =  {
			faktumId: 1,
			value: "2",
			soknadId: 1,
			parrentFaktum: null,
			key: "progresjon",
			properties: []
		};
		const action = gaVidere(1);
		const saga = gaVidereSaga(action as GaVidere);

		it("call skalHoppeOverNesteStegSaga", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: call(skalHoppeOverNesteStegSaga, 1)
			});
		});

		it("select selectProgresjonFaktum", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: select(selectProgresjonFaktum)
			});
		});

		it("put tilSteg", () => {
			expect(saga.next(progresjonFaktum)).toEqual({
				done: false,
				value: put(tilSteg(2))
			});
		});

		it("ferdig", () => ferdig(saga));
	});

	describe("skalHoppeOverNesteStegSaga - true flyt", () => {
		const saga = skalHoppeOverNesteStegSaga(7);
		const synligefaktaData = {}

		it("put hentSynligFakta", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(hentSynligeFakta())
			});
		});

		it("take utfall av hentSynligFaktaSaga", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: take([
					SynligeFaktaActionTypeKeys.HENT_SYNLIGE_OK,
					SynligeFaktaActionTypeKeys.HENT_SYNLIGE_FEILET
				])
			});
		});

		it("select selectSynligFaktaData", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: select(selectSynligFaktaData)
			});
		});

		it("ferdig", () => {
			expect(saga.next(synligefaktaData)).toEqual({
				done: true,
				value: true
			});
		});
	});

	describe("skalHoppeOverNesteStegSaga - false flyt", () => {
		const saga = skalHoppeOverNesteStegSaga(1);

		it("ferdig", () => {
			expect(saga.next()).toEqual({
				done: true,
				value: false
			});
		});
	});
});

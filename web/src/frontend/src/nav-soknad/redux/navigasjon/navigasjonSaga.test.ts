import "raf/polyfill";
import {
	gaVidereSaga,
	getHistoryLength,
	navigateTo,
	tilbakeEllerForsidenSaga,
	tilBostedEllerStartSoknadSaga,
	tilFinnDittNavKontorSaga,
	tilServerfeilSaga,
	tilStegSaga,
} from "./navigasjonSaga";
import { call, put, select, take } from "redux-saga/effects";
import { GaVidere, NavigasjonActionTypes, Sider, TilSteg } from "./navigasjonTypes";
import { goBack, push } from "react-router-redux";
import { SagaIterator } from "redux-saga";
import { gaVidere, tilSteg } from "./navigasjonActions";
import { lagreFaktum, setFaktum } from "../fakta/faktaActions";
import { Faktum } from "../../types/navSoknadTypes";
import { oppdaterFaktumMedVerdier } from "../../utils/faktumUtils";
import { FaktumActionTypeKeys } from "../fakta/faktaActionTypes";
import { selectBrukerBehandlingId, selectProgresjonFaktum, } from "../selectors";
import { startSoknad } from "../soknad/soknadActions";

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
				value: call(navigateTo, Sider.FINN_DITT_NAV_KONTOR)
			});
		});

		it("ferdig", () => ferdig(saga));
	});

	describe("tilServerfeilSaga", () => {
		const saga = tilServerfeilSaga();
		it("call navigateTo", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(push(Sider.SERVERFEIL))
			});
		});

		it("ferdig", () => ferdig(saga));
	});

	describe("tilbakeEllerForsidenSaga - forsiden ", () => {
		const saga = tilbakeEllerForsidenSaga();
		it("call getHistoryLength", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: call(getHistoryLength)
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
				value: put(goBack())
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
				value: select(selectBrukerBehandlingId)
			});
		});

		it("put push", () => {
			expect(saga.next(behandlingsId)).toEqual({
				done: false,
				value: put(push("/skjema/id1234/1"))
			});
		});
	});

	describe("gaVidereSaga - lagreFaktum", () => {
		const progresjonFaktum: Faktum = {
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
				value: put(setFaktum(oppdatertFaktum))
			});
		});

		it("put lagreFaktum", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(lagreFaktum(oppdatertFaktum))
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
		const progresjonFaktum: Faktum = {
			faktumId: 1,
			value: "2",
			soknadId: 1,
			parrentFaktum: null,
			key: "progresjon",
			properties: []
		};
		const action = gaVidere(1);
		const saga = gaVidereSaga(action as GaVidere);

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

	describe("skalGåTilBostedEllerStarteSoknad - Horten", () => {
		const saga = tilBostedEllerStartSoknadSaga({
			valgtKommune: { id: "123", navn: "Horten" },
			type: NavigasjonActionTypes.TIL_BOSTED_ELLER_START_SOKNAD
		});
		it("starter søknad for horten", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(startSoknad("123"))
			});
		});
		it("ferdig", () => ferdig(saga));
	});

	describe("skalGåTilBostedEllerStarteSoknad - til bosted", () => {
		const saga = tilBostedEllerStartSoknadSaga({
			type: NavigasjonActionTypes.TIL_BOSTED_ELLER_START_SOKNAD
		});
		it("starter søknad for horten", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: put(push(Sider.BOSTED))
			});
		});
		it("ferdig", () => ferdig(saga));
	});
});

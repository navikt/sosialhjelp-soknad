// import { REST_STATUS } from "../../types/restTypes";
// import { Fil, VedleggApiType } from "./vedleggTypes";
// import vedleggReducer from "./vedleggReducer";
// import { Faktum } from "../../types/navSoknadTypes";
// import { hentVedleggsForventningOk, lastOppVedlegg, lastOppVedleggOk } from "./vedleggActions";
//
// describe("vedlegg reducer", () => {
//
// 	const defaultState: VedleggApiType = {
// 		restStatus: REST_STATUS.INITIALISERT,
// 		feilmelding: "",
// 		data: {
// 			vedlegg: {}
// 		}
// 	};
//
// 	const defaultForventning: any = [
// 		{
// 			soknadId: 4,
// 			faktumId: 326,
// 			vedleggId: 9146,
// 			filer: []
// 		}
// 	];
//b
// 	const defaultFakta: Faktum[] = [
// 		{
// 			key: "utgifter.boutgift",
// 			value: null,
// 			type: "BRUKERREGISTRERT",
// 			faktumId: 326,
// 			soknadId: 4,
// 			parrentFaktum: null,
// 			properties: {}
// 		}
// 	];
//
// 	const forventedeVedlegg: any = {
// 		"utgifter.boutgift": {
// 			faktumId: 326,
// 			vedleggId: 9146,
// 			filer: []
// 		}
// 	};
//
// 	const filer: Fil[] = [
// 		{navn: "husleiekontrakt.jpg", status: ""},
// 		{navn: "husleiekvittering.jpg", status: ""}
// 	];
//
// 	it("skal flette fakta og vedleggsforventninger til en felles datastruktur...", () => {
// 		const state = vedleggReducer(defaultState,
// 			hentVedleggsForventningOk(defaultForventning, defaultFakta)
// 		);
// 		expect(state.data.vedlegg).toEqual(forventedeVedlegg);
// 	});
//
// 	it("skal oppdatere liste med filer og sett opplastingsstatus for filer til pending", () => {
// 		const state = vedleggReducer(defaultState,
// 			hentVedleggsForventningOk(defaultForventning, defaultFakta)
// 		);
// 		const faktumKey = defaultFakta[0].key;
// 		const vedleggId = defaultForventning[0].vedleggId;
// 		const newState = vedleggReducer(state,
// 			lastOppVedlegg(faktumKey, vedleggId, new FormData(), filer)
// 		);
// 		expect(newState.data.vedlegg[faktumKey].filer.length).toEqual(2);
// 	});
//
// 	it("skal oppdatere liste med filer når filene er ferdig lastet opp", () => {
// 		const state = vedleggReducer(defaultState,
// 			hentVedleggsForventningOk(defaultForventning, defaultFakta)
// 		);
// 		const faktumKey = defaultFakta[0].key;
// 		const vedleggId = defaultForventning[0].vedleggId;
// 		const state2 = vedleggReducer(state,
// 			lastOppVedlegg(faktumKey, vedleggId, new FormData(), filer)
// 		);
// 		expect(state2.data.vedlegg[faktumKey].filer.length).toEqual(2);
// 		const state3 = vedleggReducer(state2,
// 			lastOppVedleggOk(faktumKey, vedleggId)
// 		);
// 		expect(state3.data.vedlegg[faktumKey].filer[0].status).toEqual(REST_STATUS.OK);
// 	});
//
// });
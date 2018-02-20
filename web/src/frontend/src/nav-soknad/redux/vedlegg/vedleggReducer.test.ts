import vedleggReducer from "./vedleggReducer";
import { Vedlegg, VedleggActionTypeKeys } from "./vedleggTypes";
import { Faktum } from "../../types";

describe('vedlegg reducer', () => {

	const vedlegg: Vedlegg = {
		vedleggId: 1,
		mimetype: 'jpeg/image',
		filnavn: 'filnavn.jpg',
		faktumId: 1,
		innsendingsvalg: 'innsendingsvalg',
		skjemaNummer: '1',
		skjemanummerTillegg: 'skjemanummerTillegg',
		belopFaktumId: 1
	};

	const fakta: Faktum[] = [
		{
			faktumId: 1,
			soknadId: 1,
			parrentFaktum: null,
			key: "bolker",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		}
	];

	it('should add and remove attachments', () => {
		let state = vedleggReducer(undefined, {type: VedleggActionTypeKeys.LAST_OPP_OK});
		expect(state.data.length).toBe(0);

		state = vedleggReducer(state, {
			type: VedleggActionTypeKeys.NYTT_VEDLEGG,
			vedlegg,
			fakta
		});
		expect(state.data.length).toBe(1);

		state = vedleggReducer(state, {
			type: VedleggActionTypeKeys.LAST_OPP_FEILET,
			belopFaktumId: 1,
			feiltype: 'Unsuported media type'
		});
		expect(state.data.length).toBe(1);

		state = vedleggReducer(state, {
			type: VedleggActionTypeKeys.SLETT_VEDLEGG,
			vedleggId: 1
		});

		expect(state.data.length).toBe(0);
	});

});

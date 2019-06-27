import { SoknadState } from "./reduxTypes";
import { FaktumState } from "./fakta/faktaReducer";

function selectBrukerBehandlingId(state: { soknad: SoknadState }) {
	return state.soknad.data.brukerBehandlingId;
}

const selectProgresjonFaktum = (state: { fakta: FaktumState }) => {
	return state.fakta.data.filter(f => f.key === "progresjon")[ 0 ];
};

const selectFaktaData = (state: { fakta: FaktumState }) => state.fakta.data;

export {
	selectBrukerBehandlingId,
	selectFaktaData,
	selectProgresjonFaktum,
};

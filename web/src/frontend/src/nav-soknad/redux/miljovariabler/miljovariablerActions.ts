import {
	MiljovariablerActionTypeKeys,
	MiljovariablerActionTypes
} from "./miljovariablerTypes";

const mottattMiljovariabler = (
	miljovariabler: object
): MiljovariablerActionTypes => {
	return {
		type: MiljovariablerActionTypeKeys.OK,
		data: miljovariabler
	};
};

const hentMiljovariablerFeilet = (
	feilmelding: string
): MiljovariablerActionTypes => {
	return {
		type: MiljovariablerActionTypeKeys.FEILET,
		feilmelding
	};
};

const hentMiljovariabler = (): MiljovariablerActionTypes => {
	return {
		type: MiljovariablerActionTypeKeys.INIT
	};
};

const henterMiljovariabler = (): MiljovariablerActionTypes => {
	return {
		type: MiljovariablerActionTypeKeys.PENDING
	};
};

export {
	mottattMiljovariabler,
	hentMiljovariablerFeilet,
	hentMiljovariabler,
	henterMiljovariabler
};

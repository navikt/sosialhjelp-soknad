import {
	ActionTypeKeys,
	MiljovariablerActionTypes
} from "./miljovariablerTypes";

const mottattMiljovariabler = (
	miljovariabler: object
): MiljovariablerActionTypes => {
	return {
		type: ActionTypeKeys.OK,
		data: miljovariabler
	};
};

const hentMiljovariablerFeilet = (
	feilmelding: string
): MiljovariablerActionTypes => {
	return {
		type: ActionTypeKeys.FEILET,
		feilmelding
	};
};

const hentMiljovariabler = (): MiljovariablerActionTypes => {
	return {
		type: ActionTypeKeys.INIT
	};
};

const henterMiljovariabler = (): MiljovariablerActionTypes => {
	return {
		type: ActionTypeKeys.PENDING
	};
};

export {
	mottattMiljovariabler,
	hentMiljovariablerFeilet,
	hentMiljovariabler,
	henterMiljovariabler
};

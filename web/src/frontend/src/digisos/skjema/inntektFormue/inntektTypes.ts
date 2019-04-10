export interface SkattbarInntekt {
	"samletInntekt": number,
	"samletTrekk": number,
	"lonn": Utbetaling[],
	"pensjonEllerTrygd": Utbetaling[],
	"lottOgPartInnenfiske": Utbetaling[]
}

export interface Utbetaling {
	"fom": string,
	"tom": string,
	"organisasjon": string,
	"orgnr": string,
	"trekkpliktig": number,
	"forskuddstrekk": null | number
}

export const initialSkattbarInntektState: SkattbarInntekt = {
	"samletInntekt": 0.0,
	"samletTrekk": 0.0,
	"lonn": [],
	"pensjonEllerTrygd": [],
	"lottOgPartInnenfiske": []
};

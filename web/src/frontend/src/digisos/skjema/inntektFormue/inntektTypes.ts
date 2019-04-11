export interface SkattbarInntekt {
	"samletInntekt": number,
	"samletTrekk": number,
	"organisasjoner": Organisasjon[]
}

export interface Organisasjon {
	"utbetalinger": Utbetaling[],
	"organisasjonsnavn": string,
	"orgnr": string,
	"fom": null | string,
	"tom": null | string
}

export interface Utbetaling {
	"belop": number,
	"tittel": string
}

export const initialSkattbarInntektState: SkattbarInntekt = {
	"samletInntekt": 0.0,
	"samletTrekk": 0.0,
	"organisasjoner": []
};

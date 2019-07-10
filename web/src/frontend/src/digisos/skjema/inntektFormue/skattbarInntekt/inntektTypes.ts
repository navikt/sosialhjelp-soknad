export interface SkattbarInntekt {
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
	"brutto": number,
	"forskuddstrekk": number,
	"tittel": string
}

export const initialSkattbarInntektState: SkattbarInntekt[] = [];

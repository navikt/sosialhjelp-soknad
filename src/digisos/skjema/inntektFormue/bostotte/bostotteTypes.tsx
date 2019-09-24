export interface Bostotte {
	"bekreftelse": null | boolean;
	"utbetalinger": Utbetaling[];
}

export const initialBostotteState: Bostotte = {
	"bekreftelse": null,
	"utbetalinger": []
}

export interface Utbetaling {
	"kilde": string,
	"type": string,
	"tittel": string,
	"belop": number,
	"utbetalingsdato": string
}

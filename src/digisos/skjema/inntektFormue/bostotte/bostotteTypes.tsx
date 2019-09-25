export interface Bostotte {
	"bekreftelse": null | boolean;
	"utbetalinger": Utbetaling[];
	"saker": Sak[];
}

export const initialBostotteState: Bostotte = {
	"bekreftelse": null,
	"utbetalinger": [],
	"saker": []
}

export interface Utbetaling {
	"kilde": string,
	"type": string,
	"tittel": string,
	"belop": number,
	"utbetalingsdato": string
}

export interface Sak {
	"dato": string,
	"status": string
	"beskrivelse": string
}
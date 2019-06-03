export interface Utbetalinger {
	"bekreftelse" : null | boolean;
	"utbytte" : boolean;
	"salg" : boolean;
	"forsikring" : boolean;
	"annet" : boolean;
	"beskrivelseAvAnnet" : string;
}

export const initialUtbetalingerState: Utbetalinger = {
	"bekreftelse" : null,
	"utbytte" : false,
	"salg" : false,
	"forsikring" : false,
	"annet" : false,
	"beskrivelseAvAnnet" : ""
};

export interface Arbeidsforhold {
	"arbeidsgivernavn": string,
	"fom": string,
	"tom": string,
	"stillingsprosent": number,
	"overstyrtAvBruker": boolean
}

export interface Arbeid {
	arbeidsforhold?: Arbeidsforhold[];
	kommentarTilArbeidsforhold: null | string
}

export const initialArbeidState: Arbeid = {
	arbeidsforhold: [],
	kommentarTilArbeidsforhold: null
};

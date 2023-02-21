export interface Systeminntekter {
    systeminntekter: Systeminntekt[];
    utbetalingerFraNavFeilet: boolean;
}

export interface Systeminntekt {
    inntektType: string;
    utbetalingsdato: string;
    belop: number;
}

export const initialSysteminntekter: Systeminntekter = {
    systeminntekter: [],
    utbetalingerFraNavFeilet: false,
};

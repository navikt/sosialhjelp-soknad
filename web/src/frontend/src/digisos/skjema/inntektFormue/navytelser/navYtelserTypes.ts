export interface Systeminntekter {
    systeminntekter: Systeminntekt[];
}

export interface Systeminntekt {
    inntektType: string;
    utbetalingsdato: string;
    belop: number;
}

export const initialSysteminntekter: Systeminntekter = {
    systeminntekter: []
};

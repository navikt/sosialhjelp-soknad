export const konverterFraISODato = (dato: string): string => {
    if (!dato) {
        return dato;
    }
    const splittetDato: string[] = dato.split("-");
    if (splittetDato && splittetDato.length === 3) {
        return splittetDato[2] + splittetDato[1] + splittetDato[0];
    } else {
        return dato;
    }
};

export const konverterTilISODato = (dato: string): string => {
    if (dato.split("-").length > 1) {
        return dato;
    } else {
        const dag = parseInt(dato.substr(0, 2), 10) + 1;
        const mnd = parseInt(dato.substr(2, 2), 10) - 1;
        const aar = parseInt(dato.substr(4, 4), 10);
        const d = new Date(aar, mnd, dag);
        return d.toISOString().substr(0, 10);
    }
};

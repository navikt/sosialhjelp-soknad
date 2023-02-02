export const konverterFdatoTilDato = (dato: string): Date | null => {
    const dag = parseInt(dato.substr(0, 2), 10);
    const mnd = parseInt(dato.substr(2, 2), 10) - 1;
    const ar = parseInt(dato.substr(4, 4), 10);
    const d = new Date(ar, mnd, dag);
    if (d.getDate() !== dag || d.getMonth() !== mnd || d.getFullYear() !== ar) {
        return null;
    }
    return d;
};

export const fmtCurrency = (language: string, amount: number) =>
    new Intl.NumberFormat(language, {
        style: "currency",
        currency: "NOK",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);

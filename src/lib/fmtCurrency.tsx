export const fmtCurrency = (language: string, amount: number) => {
    const languageToUse = language === "nn" ? "nb" : language;

    return new Intl.NumberFormat(languageToUse, {
        style: "currency",
        currency: "NOK",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

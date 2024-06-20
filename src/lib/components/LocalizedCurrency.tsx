import {useTranslation} from "react-i18next";

export const LocalizedCurrency = ({value}: {value?: number}) => {
    const {i18n} = useTranslation();
    const lang = i18n.language === "nn" ? "nb" : i18n.language;

    if (!value) return null;

    const formattedValue = new Intl.NumberFormat(lang, {
        currency: "NOK",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);

    return `${formattedValue} kr`;
};

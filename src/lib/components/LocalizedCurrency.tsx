import {useTranslation} from "react-i18next";

export const LocalizedCurrency = ({value}: {value?: number}) => {
    const {i18n} = useTranslation();
    const lang = i18n.language === "nn" ? "nb" : i18n.language;

    if (!value) return null;

    return new Intl.NumberFormat(lang, {
        style: "currency",
        currency: "NOK",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

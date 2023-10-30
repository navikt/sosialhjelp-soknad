import {useTranslation} from "react-i18next";
import {fmtCurrency} from "../../../lib/fmtCurrency";

/** not fully sure if I want to standardize on this yet, but if so I'll gut fmtCurrency.tsx and use this instead */
export const LocalizedCurrency = ({value}: {value?: number}) => {
    const {i18n} = useTranslation();
    if (!value) return null;
    return fmtCurrency(i18n.language, value);
};

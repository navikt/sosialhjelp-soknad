import React from "react";
import {useTranslation} from "react-i18next";

const Dato = ({children}: {children: string}) => {
    const {i18n} = useTranslation();
    const language = i18n.language === "nn" ? "nb" : i18n.language;

    return <>{new Intl.DateTimeFormat(language, {dateStyle: "long"}).format(new Date(children))}</>;
};

export default Dato;

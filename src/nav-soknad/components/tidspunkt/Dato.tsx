import React from "react";
import {useTranslation} from "react-i18next";

// Dato("2018-10-12") => "12. oktober 2018"
const Dato = ({children}: {children: string}) => (
    <>{new Intl.DateTimeFormat(useTranslation().i18n.language, {dateStyle: "long"}).format(new Date(children))}</>
);

export default Dato;

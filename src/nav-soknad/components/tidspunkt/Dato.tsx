import React from "react";
import {FormattedDate} from "react-intl";

// Dato("2018-10-12") => "12. oktober 2018"
const Dato = ({children}: {children: string}) => (
    <FormattedDate value={new Date(children)} month="long" day="numeric" year="numeric" />
);

export default Dato;

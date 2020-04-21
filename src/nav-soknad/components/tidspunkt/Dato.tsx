import React from "react";
import {FormattedDate} from "react-intl";

/*
      Dato("2018-10-12")
         => "12. oktober 2018"
 */
const Dato: React.FC<{tidspunkt: string}> = ({tidspunkt}) => {
    return (
        <>
            <span className="dato">
                <FormattedDate value={new Date(tidspunkt)} month="long" day="numeric" year="numeric" />
            </span>
        </>
    );
};

export default Dato;

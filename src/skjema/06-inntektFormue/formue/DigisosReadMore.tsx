// En ReadMore, men med hardkodet tittel
import {ReadMore, ReadMoreProps} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import React from "react";

export const DigisosReadMore = ({children, ...rest}: Omit<ReadMoreProps, "header">) => {
    const {t} = useTranslation("skjema");
    return (
        <ReadMore {...rest} header={t("generelt.merinfo")}>
            {children}
        </ReadMore>
    );
};

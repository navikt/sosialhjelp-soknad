import React from "react";
import {useTranslation} from "react-i18next";
import {LinkButton} from "../../../../lib/components/LinkButton.tsx";

export const ListRemoveButton = (props: {className?: string} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const {t} = useTranslation("skjema");
    return <LinkButton {...props}>{t("opplysninger.fjern")}</LinkButton>;
};

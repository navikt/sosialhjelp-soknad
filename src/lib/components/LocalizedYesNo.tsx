import {useTranslation} from "react-i18next";
import * as React from "react";

export const LocalizedYesNo = ({value}: {value?: boolean}) => {
    const {t} = useTranslation("skjema");
    if (value === undefined) return null;
    return <>{value ? t("avbryt.ja") : t("avbryt.nei")}</>;
};

import * as React from "react";
import {useTranslation} from "react-i18next";
import {BaseBooleanInputProps, BooleanInput} from "./BooleanInput";

export const YesNoInput = (baseprops: BaseBooleanInputProps) => {
    const {t} = useTranslation("skjema");
    return <BooleanInput {...baseprops} radioLabels={[t("avbryt.ja"), t("avbryt.nei")]} />;
};

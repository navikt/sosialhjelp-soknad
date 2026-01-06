import * as React from "react";
import {useTranslation} from "react-i18next";
import {BaseBooleanInputProps, BooleanInput} from "./BooleanInput";

export const YesNoInput = React.forwardRef(
    (baseprops: BaseBooleanInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const {t} = useTranslation("skjema");
        return <BooleanInput ref={ref} {...baseprops} radioLabels={[t("avbryt.ja"), t("avbryt.nei")]} />;
    }
);

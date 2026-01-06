import * as React from "react";
import {useTranslation} from "react-i18next";
import BooleanInput, {BaseBooleanInputProps} from "./BooleanInput";

const YesNoInput = (baseprops: BaseBooleanInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {t} = useTranslation("skjema");
    return <BooleanInput ref={ref} {...baseprops} radioLabels={[t("avbryt.ja"), t("avbryt.nei")]} />;
};

export default React.forwardRef(YesNoInput);

import React, {ForwardedRef, forwardRef} from "react";
import {Textarea, TextareaProps} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

const LocalizedTextarea = (props: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): React.JSX.Element => {
    const {t} = useTranslation("skjema");
    return (
        <Textarea
            ref={ref}
            i18n={{counterLeft: t("textarea.undermaks"), counterTooMuch: t("textarea.overmaks")}}
            {...props}
        />
    );
};

export default forwardRef<HTMLTextAreaElement, TextareaProps>(LocalizedTextarea);

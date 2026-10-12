import * as React from "react";
import cx from "classnames";
import {Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

const HtmlPageTitle = ({title}: {title: string}) => {
    const {t} = useTranslation("skjema");

    return <title>{`${title} - ${t("applikasjon.sidetittel.stringValue")}`}</title>;
};

export const SkjemaStegTitle = ({className, title}: {className?: string; title: string}) => (
    <>
        <HtmlPageTitle title={title} />
        <Heading tabIndex={-1} className={cx("text-center", className)} level={"2"} size={"large"}>
            <span id="skjemasteg-title">{title}</span>
        </Heading>
    </>
);

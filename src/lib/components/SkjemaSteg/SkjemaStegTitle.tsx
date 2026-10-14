import * as React from "react";
import {Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import cx from "classnames";

const HtmlPageTitle = ({title}: {title: string}) => {
    const {t} = useTranslation("skjema");

    return <title>{`${title} - ${t("applikasjon.sidetittel.stringValue")}`}</title>;
};

export const SkjemaStegTitle = ({className, title}: {className?: string; title: string}) => (
    <>
        <HtmlPageTitle title={title} />
        <Heading tabIndex={-1} className={cx(className, "lg:mb-12")} level={"2"} size={"medium"}>
            <span id="skjemasteg-title">{title}</span>
        </Heading>
    </>
);

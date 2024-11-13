import * as React from "react";
import {ReactNode} from "react";
import cx from "classnames";
import {Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

const HtmlPageTitle = ({title}: {title: string}) => {
    const {t} = useTranslation("skjema");

    return <title>{`${title} - ${t("applikasjon.sidetittel.stringValue")}`}</title>;
};

export const SkjemaStegTitle = ({className, title, icon}: {className?: string; title: string; icon: ReactNode}) => (
    <>
        <HtmlPageTitle title={title} />
        <Heading tabIndex={-1} className={cx("text-center mb-12 lg:mb-24", className)} level={"2"} size={"large"}>
            <div className="mx-auto w-fit mb-2" aria-hidden="true">
                {icon}
            </div>
            <span id="skjemasteg-title">{title}</span>
        </Heading>
    </>
);

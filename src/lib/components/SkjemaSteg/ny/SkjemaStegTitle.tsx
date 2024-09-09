import {useTranslation} from "react-i18next";
import * as React from "react";
import {useContext} from "react";
import {logError} from "../../../log/loggerUtils.ts";
import cx from "classnames";
import {Heading} from "@navikt/ds-react";
import {KortSkjemaHeadings, KortSkjemaPage, SkjemaHeadings, SkjemaStegContext} from "./SkjemaSteg.tsx";

export const SkjemaStegTitle = ({className}: {className?: string}) => {
    const {t} = useTranslation("skjema");
    const context = useContext(SkjemaStegContext);

    if (context === null) {
        logError("<SkjemaStegButtons/> must be used inside <SkjemaSteg />");
        return null;
    }

    const {page} = context;

    const skjemaHeading = context.kort ? KortSkjemaHeadings[page as KortSkjemaPage] : SkjemaHeadings[page];
    return (
        <div tabIndex={-1} className={cx("text-center mb-12 lg:mb-24", className)}>
            <div className="mx-auto w-fit mb-2">{skjemaHeading.ikon}</div>
            <Heading level={"2"} size={"large"} data-testid={page === 2 ? "skjemasteg-heading" : null}>
                {t(skjemaHeading.tittel)}
            </Heading>
        </div>
    );
};

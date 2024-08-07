import {BostotteFrontend} from "../../../generated/model";
import {useTranslation} from "react-i18next";
import {HusbankenUtbetalinger} from "./HusbankenUtbetalinger";
import {Heading, Link} from "@navikt/ds-react";
import {HusbankenSaker, MonkeypatchedJsonBostotteSak} from "./HusbankenSaker";
import * as React from "react";

export const BostotteDataVisning = ({bostotte}: {bostotte: BostotteFrontend}) => {
    const {t} = useTranslation("skjema");
    if (bostotte.samtykkeTidspunkt && bostotte.stotteFraHusbankenFeilet) throw new Error("Feil ved nedlasting av data");

    return (
        <div className={"bg-lightblue-50 border-l-[var(--a-surface-info)] p-4 space-y-4 rounded-md"}>
            <Heading size={"small"} level={"4"}>
                {t("inntekt.bostotte.husbanken.utbetalinger")}
            </Heading>
            <HusbankenUtbetalinger utbetalinger={bostotte.utbetalinger} />
            <Heading size={"small"} level={"4"}>
                {t("inntekt.bostotte.husbanken.saker")}
            </Heading>
            <HusbankenSaker saker={bostotte.saker as MonkeypatchedJsonBostotteSak[]} />
            {!bostotte.saker?.length && !bostotte.utbetalinger?.length && (
                <Link href={t("inntekt.bostotte.husbanken.url")} target="_blank" rel="noopener noreferrer">
                    {t("inntekt.bostotte.husbanken.lenkeText")}
                </Link>
            )}
        </div>
    );
};

import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {Accordion} from "@navikt/ds-react";
import React from "react";
import {Steg} from "../../generated/model";
import {useTranslation} from "react-i18next";
import {Link as ReactRouterLink} from "react-router";
import {OppsummeringAvsnitt} from "./question/OppsummeringAvsnitt";
import {DigisosLanguageKey} from "../../lib/i18n/common.ts";

export const OppsummeringSteg = ({steg: {stegNr, tittel, avsnitt}}: {steg: Steg}) => {
    const soknadId = useSoknadId();
    const {t} = useTranslation();

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>{t(tittel as DigisosLanguageKey)}</Accordion.Header>
                <Accordion.Content>
                    <div className={"flex justify-end"}>
                        <ReactRouterLink className="navds-link" to={`/skjema/${soknadId}/${stegNr}`}>
                            {t("oppsummering.gatilbake")}
                        </ReactRouterLink>
                    </div>
                    {avsnitt.map((a, i) => (
                        <OppsummeringAvsnitt key={i} avsnitt={a} />
                    ))}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

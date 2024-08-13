import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {Accordion} from "@navikt/ds-react";
import React from "react";
import {Steg} from "../../generated/client/model";
import {useTranslation} from "react-i18next";
import {Link as ReactRouterLink, useLocation} from "react-router-dom";
import {OppsummeringAvsnitt} from "./question/OppsummeringAvsnitt";
import {DigisosLanguageKey} from "../../lib/i18n";

export const OppsummeringSteg = ({steg: {stegNr, tittel, avsnitt}}: {steg: Steg}) => {
    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation();

    const location = useLocation();
    const isKortSoknad = location.pathname.includes("/kort");

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>{t(tittel as DigisosLanguageKey)}</Accordion.Header>
                <Accordion.Content>
                    <div className={"flex justify-end"}>
                        <ReactRouterLink
                            className="navds-link"
                            to={`/skjema${isKortSoknad ? "/kort" : ""}/${behandlingsId}/${stegNr}`}
                        >
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

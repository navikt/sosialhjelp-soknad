import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {Accordion} from "@navikt/ds-react";
import React from "react";
import {Steg} from "../../generated/model";
import {useTranslation} from "react-i18next";
import {Link as ReactRouterLink} from "react-router-dom";
import {OppsummeringAvsnitt} from "./question/OppsummeringAvsnitt";

export const OppsummeringSteg = ({steg: {stegNr, tittel, avsnitt}}: {steg: Steg}) => {
    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation();

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>{t(tittel)}</Accordion.Header>
                <Accordion.Content>
                    <div className={"flex justify-end"}>
                        <ReactRouterLink className="navds-link" to={`/skjema/${behandlingsId}/${stegNr}`}>
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

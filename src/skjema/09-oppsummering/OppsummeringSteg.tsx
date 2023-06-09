import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {Accordion, Link} from "@navikt/ds-react";
import {Edit} from "@navikt/ds-icons";
import React, {ReactNode} from "react";
import {Steg} from "../../generated/model";
import {useTranslation} from "react-i18next";
import {Link as ReactRouterLink} from "react-router-dom";
import styled from "styled-components";

export const EditAnswerLink = (props: {steg: number; questionId: string}) => {
    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation();

    return (
        <Link href={`/sosialhjelp/soknad/skjema/${behandlingsId}/${props.steg}#${props.questionId}`}>
            <Edit />
            {t("endre")}
        </Link>
    );
};
const EditAnswer = styled.div`
    display: flex;
    justify-content: flex-end;
`;
export const OppsummeringSteg = ({steg: {stegNr, tittel}, children}: {steg: Steg; children: ReactNode}) => {
    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation();

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>{t(tittel)}</Accordion.Header>
                <Accordion.Content>
                    <EditAnswer>
                        <ReactRouterLink className="navds-link" to={`/skjema/${behandlingsId}/${stegNr}`}>
                            {t("oppsummering.gatilbake")}
                        </ReactRouterLink>
                    </EditAnswer>
                    {children}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

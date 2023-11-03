import React from "react";
import styled from "styled-components";
import {Heading} from "@navikt/ds-react";
import {EditAnswerLink} from "../OppsummeringSteg";

const StyledQuestion = styled.div`
    margin-bottom: 2rem;
`;

const HeadingWithEditLink = styled.div`
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
`;

export const OppsummeringSporsmal = (props: {title: string; questionId?: string; children: any}) => {
    return (
        <StyledQuestion>
            <HeadingWithEditLink>
                <Heading level="3" size="small" spacing>
                    {props.title}
                </Heading>
                {props.questionId && <EditAnswerLink steg={1} questionId={props.questionId} />}
            </HeadingWithEditLink>
            {props.children}
        </StyledQuestion>
    );
};

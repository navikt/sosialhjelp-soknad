import {BodyShort, Label} from "@navikt/ds-react";
import React from "react";
import {FormattedDate, FormattedMessage} from "react-intl";
import styled from "styled-components";

const List = styled.ul`
    list-style: none;
    border-left: 2px solid #e7e9e9;

    margin: 0;
    padding: 0.5rem 0 0.5rem 1rem;
`;

const ListItem = styled.li<{multiline?: boolean}>`
    p {
        display: ${(props) => (props.multiline ? "block" : "inline")};
    }
`;

export const SingleLineElement = (props: {value?: string}) => <BodyShort size="small">: {props.value}</BodyShort>;

export const SingleLineDateElement = (props: {value?: string}) => (
    <BodyShort size="small">
        : <FormattedDate value={new Date(props.value ?? "")} month="long" day="numeric" year="numeric" />
    </BodyShort>
);

export const Systeminfo = (props: {systeminfoMap: {key: string; value: React.ReactNode}[]; multiline?: boolean}) => {
    if (props.systeminfoMap.length === 0) {
        return null;
    }
    return (
        <List>
            {props.systeminfoMap.map((elem) => (
                <ListItem key={elem.key} multiline={props.multiline}>
                    <Label size="small">
                        <FormattedMessage id={elem.key} />
                    </Label>
                    {elem.value}
                </ListItem>
            ))}
        </List>
    );
};

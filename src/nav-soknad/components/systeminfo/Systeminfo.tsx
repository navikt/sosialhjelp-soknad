import {BodyShort, Label} from "@navikt/ds-react";
import React, {ReactNode} from "react";
import {FormattedDate} from "react-intl";
import styled from "styled-components";

const List = styled.ul`
    list-style: none;
    border-left: 2px solid #e7e9e9;

    margin: 0;
    padding: 0.5rem 0 0.5rem 1rem;
    &:empty {
        display: none;
    }
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

interface SysteminfoProps {
    systeminfoMap: {key: ReactNode; value: ReactNode}[];
    multiline?: boolean;
}

export const Systeminfo = (props: SysteminfoProps) => (
    <List>
        {props.systeminfoMap.map(({key, value}, index) => (
            <ListItem key={index} multiline={props.multiline}>
                <Label size="small">{key}</Label>
                {value}
            </ListItem>
        ))}
    </List>
);

import {BodyShort, Label} from "@navikt/ds-react";
import React, {ReactNode} from "react";
import {FormattedDate} from "react-intl";
import styled from "styled-components";

const SysteminfoList = styled.ul`
    list-style: none;
    border-left: 2px solid #e7e9e9;

    margin: 0;
    padding-left: 0.66rem;

    &:empty {
        display: none;
    }

    .systeminfo-label {
        padding-right: 0.25em;
        :after {
            content: ":";
        }
    }
`;

const ListItem = styled.li<{multiline?: boolean}>`
    margin: 0.125rem 0;
    p {
        display: ${(props) => (props.multiline ? "block" : "inline")};
    }
`;

export const OldSingleLineElement = (props: {value?: string}) => <BodyShort size="small">: {props.value}</BodyShort>;

export const SingleLineDateElement = (props: {value?: string}) => (
    <BodyShort size="small">
        : <FormattedDate value={new Date(props.value ?? "")} month="long" day="numeric" year="numeric" />
    </BodyShort>
);

interface OldSysteminfoProps {
    systeminfoMap: {key: ReactNode; value: ReactNode}[];
    multiline?: boolean;
}

// DEPRECATED: Denne heter OldSysteminfo fordi vi er i ferd med å migrere til en nyere variant
/**
 * @deprecated Erstattes av Systeminfo
 */
export const OldSysteminfo = ({multiline, systeminfoMap}: OldSysteminfoProps) => (
    <SysteminfoList>
        {systeminfoMap.map(({key, value}, index) => (
            <ListItem key={index} multiline={multiline}>
                <Label size="small">{key}</Label>
                {value}
            </ListItem>
        ))}
    </SysteminfoList>
);

export const SysteminfoItem = ({
    label,
    multiline,
    children,
}: {
    multiline?: boolean;
    label: ReactNode;
    children?: ReactNode;
}) => (
    <ListItem multiline={multiline}>
        <Label className="systeminfo-label" size="small">
            {label}
        </Label>
        <BodyShort size="small">{children}</BodyShort>
    </ListItem>
);

export const Systeminfo = ({children}: {children: React.ReactNode[]}) => <SysteminfoList>{children}</SysteminfoList>;

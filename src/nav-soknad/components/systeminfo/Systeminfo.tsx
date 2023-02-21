import {BodyShort, Detail, Label} from "@navikt/ds-react";
import React, {ReactNode} from "react";
import styled from "styled-components";
import Dato from "../tidspunkt/Dato";
import cx from "classnames";

const SysteminfoList = styled.ul`
    &:empty {
        display: none;
    }
`;

const ListItem = styled.li<{multiline?: boolean}>`
    p {
        display: ${(props) => (props.multiline ? "block" : "inline")};
    }
`;

/**
 * @deprecated Erstattes av Systeminfo
 */
export const OldSingleLineElement = (props: {value?: string}) => <BodyShort size="small">: {props.value}</BodyShort>;

export const SingleLineDateElement = ({value}: {value?: string}) => (
    <BodyShort size="small">
        : <Dato>{value ?? ""}</Dato>
    </BodyShort>
);

/**
 * @deprecated Erstattes av Systeminfo
 */
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
    className,
    comment,
}: {
    multiline?: boolean;
    label: ReactNode;
    comment?: ReactNode;
    children?: ReactNode;
    className?: string;
}) => (
    <div>
        {comment && <Detail className={cx("opacity-90 pb-1")}>{comment}</Detail>}
        <ListItem className={cx("!leading-5 ", className)} multiline={multiline}>
            <Label className="pr-1 after:content-[':']" size="small">
                {label}
            </Label>
            <BodyShort size="small">{children}</BodyShort>
        </ListItem>
    </div>
);

export const Systeminfo = ({children, className}: {children: React.ReactNode; className?: string}) => (
    <ul
        className={cx(
            "flex flex-col items-between gap-1 pl-3 py-3 border-l-4 bg-[var(--a-surface-info-subtle)] border-l-[var(--a-surface-info)] ",
            className
        )}
    >
        {children}
    </ul>
);

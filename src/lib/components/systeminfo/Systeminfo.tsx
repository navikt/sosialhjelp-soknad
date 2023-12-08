import {BodyShort, Detail, Label} from "@navikt/ds-react";
import React, {ReactNode} from "react";
import styled from "styled-components";
import cx from "classnames";

const ListItemContents = styled.div<{multiline?: boolean}>`
    p {
        display: ${(props) => (props.multiline ? "block" : "inline")};
    }
`;

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
    <li>
        {comment && (
            <Detail className={cx("opacity-90 pb-1")} data-testid="personalia-infotekst">
                {comment}
            </Detail>
        )}
        <ListItemContents className={cx("!leading-5 ", className)} multiline={multiline}>
            <Label className="pr-1 after:content-[':']" size="small">
                {label}
            </Label>
            <BodyShort size="small">{children}</BodyShort>
        </ListItemContents>
    </li>
);

export const Systeminfo = ({children, className}: {children: React.ReactNode; className?: string}) => (
    <ul
        className={cx(
            "flex flex-col items-between gap-1 pl-3 py-3 border-l-4 bg-lightblue-50 border-l-surface-info",
            className
        )}
    >
        {children}
    </ul>
);

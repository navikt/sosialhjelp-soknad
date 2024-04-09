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
    commentAbove,
    commentBelow,
}: {
    multiline?: boolean;
    label?: ReactNode;
    children?: ReactNode;
    className?: string;
    commentAbove?: ReactNode;
    commentBelow?: ReactNode;
}) => (
    <li>
        {commentAbove && (
            <Detail className={cx("opacity-90 pb-1")} data-testid="personalia-infotekst">
                {commentAbove}
            </Detail>
        )}
        {label && (
            <ListItemContents className={cx("!leading-5 ", className)} multiline={multiline}>
                <Label className="pr-1 after:content-[':']" size="small">
                    {label}
                </Label>
                <BodyShort size="small">{children}</BodyShort>
            </ListItemContents>
        )}

        {!label && (
            <ListItemContents className={cx("!leading-5", className)} multiline={multiline}>
                <BodyShort weight={"semibold"}>{children}</BodyShort>
            </ListItemContents>
        )}
        {commentBelow && (
            <Detail className={cx("opacity-90 pb-2 pt-4")} data-testid="personalia-infotekst">
                {commentBelow}
            </Detail>
        )}
    </li>
);

export const Systeminfo = ({children, className}: {children: React.ReactNode; className?: string}) => (
    <ul
        className={cx(
            "flex flex-col items-between gap-1 pl-3 py-3 bg-lightblue-50 border-l-surface-info rounded",
            className
        )}
    >
        {children}
    </ul>
);

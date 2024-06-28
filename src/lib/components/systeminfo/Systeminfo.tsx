import {BodyShort, Label} from "@navikt/ds-react";
import React, {ElementType, ReactNode} from "react";
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
    as: Cmp = "li",
}: {
    multiline?: boolean;
    label?: ReactNode;
    children?: ReactNode;
    className?: string;
    as?: ElementType;
}) => (
    <Cmp>
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
    </Cmp>
);

export const Systeminfo = ({children, className}: {children: React.ReactNode; className?: string}) => (
    <ul
        className={cx(
            "flex flex-col items-between gap-1 pl-3 py-3 bg-lightblue-50 border-l-surface-info rounded-md",
            className
        )}
    >
        {children}
    </ul>
);

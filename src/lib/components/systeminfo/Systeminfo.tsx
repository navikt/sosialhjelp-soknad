import {BodyShort, Detail, Label} from "@navikt/ds-react";
import React, {ReactNode} from "react";
import cx from "classnames";

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
        <div className={cx("!leading-5 ", className)}>
            <Label className={cx("pr-1 after:content-[':']", {inline: !multiline})} size="small">
                {label}
            </Label>
            <BodyShort className={cx({inline: !multiline})} size="small">
                {children}
            </BodyShort>
        </div>
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

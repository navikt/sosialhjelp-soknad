import {BodyShort, Label} from "@navikt/ds-react";
import React, {ElementType, ReactNode} from "react";
import cx from "classnames";

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
    <Cmp className={cx("leading-5! ", className)} aria-label={label}>
        {label && <Label className="pr-1.5 after:content-[':']">{label}</Label>}
        <BodyShort className={cx({inline: !multiline, "font-bold!": !label})}>{children}</BodyShort>
    </Cmp>
);

export const Systeminfo = ({children, className}: {children: React.ReactNode; className?: string}) => (
    <div
        className={cx(
            "flex flex-col items-between gap-1 p-3 bg-lightblue-50 border-l-surface-info rounded-md",
            className
        )}
        role={"none"}
    >
        {children}
    </div>
);

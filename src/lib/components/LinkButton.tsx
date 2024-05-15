import * as React from "react";
import classNames from "classnames";
import {BodyShort} from "@navikt/ds-react";

export const LinkButton = ({
    children,
    className,
    ...rest
}: {className?: string; children: React.ReactNode} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button className={classNames("navds-link", className)} {...rest}>
        <BodyShort>{children}</BodyShort>
    </button>
);

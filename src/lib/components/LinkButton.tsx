import * as React from "react";
import {Link} from "@navikt/ds-react";

export const LinkButton = ({
    children,
    className,
    ...rest
}: {className?: string; children: React.ReactNode} & Omit<
    React.ButtonHTMLAttributes<HTMLAnchorElement>,
    "color" | "data-color"
>) => (
    <Link as="button" className={className} {...rest}>
        {children}
    </Link>
);

import React, {ReactNode} from "react";
import {LinkButton} from "../../../../lib/components/LinkButton.tsx";

export const ListAddButton = ({
    children,
    ...rest
}: {
    children: ReactNode;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <li className={`pt-3 pb-4`}>
        <LinkButton {...rest}>
            <span aria-hidden={true}>+ </span>
            {children}
        </LinkButton>
    </li>
);

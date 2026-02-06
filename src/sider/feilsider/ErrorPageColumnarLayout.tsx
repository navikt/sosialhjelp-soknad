import * as React from "react";
import {ReactNode} from "react";
import cx from "classnames";

/**
 * Layout for error pages.
 *
 * The margins are only visible past the md breakpoint.
 * The leftMargin is right-aligned
 *
 */
export const ErrorPageColumnarLayout = ({
    leftMargin,
    rightMargin,
    children,
    className,
}: {
    leftMargin?: ReactNode;
    rightMargin?: ReactNode;
    children: ReactNode;
    className?: string;
}) => (
    <div className={cx("grid grid-cols-12", className)}>
        <div className="hidden ax-md:col-span-2 ax-md:block p-4">
            <div className={"flex flex-col p-4 items-end"}>{leftMargin}</div>
        </div>

        <div className="col-span-12 ax-md:col-span-8 max-w-[768px] w-full p-4">
            {leftMargin && <div className={"block ax-md:hidden pb-8"}>{leftMargin}</div>}
            {children}
        </div>

        <div className="hidden ax-md:col-span-2 ax-md:block p-4">{rightMargin}</div>
    </div>
);

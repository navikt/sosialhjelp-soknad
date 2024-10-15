import * as React from "react";
import {ReactNode} from "react";
import cx from "classnames";
import {Page} from "@navikt/ds-react";

export const SkjemaContent = React.forwardRef<
    HTMLDivElement,
    {
        children: ReactNode;
        className?: string;
    }
>(({children, className}, ref) => (
    <Page.Block width={"md"}>
        <section
            ref={ref}
            className={cx(
                "bg-white mx-auto rounded-2xl px-4 md:px-12 lg:px-24 pt-8 pb-8 mb-16 space-y-12 lg:space-y-24",
                className
            )}
        >
            {children}
        </section>
    </Page.Block>
));

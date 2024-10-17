import * as React from "react";
import {ReactNode} from "react";
import cx from "classnames";

export const SkjemaStegBlock = ({children, className}: {children: ReactNode; className?: string}) => (
    <section
        className={cx(
            "bg-white rounded-2xl px-4 md:px-12 lg:px-24 pt-8 pb-8 mb-16 space-y-12 lg:space-y-24",
            className
        )}
    >
        {children}
    </section>
);

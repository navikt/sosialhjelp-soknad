import * as React from "react";
import {ReactNode} from "react";
import cx from "classnames";
import {Heading} from "@navikt/ds-react";

export const SkjemaStegTitle = ({className, title, icon}: {className?: string; title: string; icon: ReactNode}) => (
    <div tabIndex={-1} className={cx("text-center mb-12 lg:mb-24", className)}>
        <div className="mx-auto w-fit mb-2">{icon}</div>
        <Heading level={"2"} size={"large"}>
            {title}
        </Heading>
    </div>
);

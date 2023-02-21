import * as React from "react";
import Ella from "./svg/Ella";
import Brevkonvolutt from "./svg/Brevkonvolutt";
import Hensyn from "./svg/Hensyn";
import {ReactNode} from "react";
import cx from "classnames";

interface InformasjonspanelProps {
    farge: "suksess" | "viktig" | "action";
    children?: any;
    ikon: "ella" | "konvolutt" | "hensyn";
    className?: string;
}

const ikonElement: Record<InformasjonspanelProps["ikon"], ReactNode> = {
    ella: <Ella />,
    konvolutt: <Brevkonvolutt />,
    hensyn: <Hensyn />,
};

const Informasjonspanel = ({children, className, ikon, farge}: InformasjonspanelProps) => (
    <div
        className={cx(
            "relative rounded-md p-4 md:py-8 md:pr-6 md:pl-14 skjema-informasjonspanel border-2",
            {
                "border-[var(--a-surface-action)]": farge === "action",
                "border-[var(--a-surface-success)]": farge === "suksess",
                "border-[var(--a-surface-warning)]": farge === "viktig",
            },
            className
        )}
    >
        <div
            className={cx(
                "w-[64px] lg:w-[80px] absolute left-0 top-[50%] -translate-y-1/2 -translate-x-1/2 max-md:hidden rounded-full",
                {
                    "bg-[var(--a-surface-action)]": farge === "action",
                    "bg-[var(--a-surface-success)]": farge === "suksess",
                    "bg-[var(--a-surface-warning)]": farge === "viktig",
                }
            )}
        >
            {ikonElement[ikon]}
        </div>
        <div className={"space-y-2"}>{children}</div>
    </div>
);

export default Informasjonspanel;

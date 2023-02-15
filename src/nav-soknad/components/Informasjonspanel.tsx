import * as React from "react";
import Ella from "./svg/Ella";
import Brevkonvolutt from "./svg/Brevkonvolutt";
import Hensyn from "./svg/Hensyn";
import {ReactNode} from "react";
import cx from "classnames";

interface InformasjonspanelProps {
    farge: "suksess" | "viktig";
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
    <div className={className}>
        <div
            className={cx("relative rounded-md p-4 md:py-8 md:pr-6 md:pl-14 skjema-informasjonspanel border-2", {
                "border-green-200": farge === "suksess",
                "border-orange-300": farge === "viktig",
            })}
        >
            <div
                className={cx(
                    "w-[64px] lg:w-[80px] absolute left-0 top-[50%] -translate-y-1/2 -translate-x-1/2 max-md:hidden rounded-full",
                    {
                        "bg-green-200": farge === "suksess",
                        "bg-orange-300": farge === "viktig",
                    }
                )}
            >
                {ikonElement[ikon]}
            </div>
            <div className={"space-y-2"}>{children}</div>
        </div>
    </div>
);

export default Informasjonspanel;

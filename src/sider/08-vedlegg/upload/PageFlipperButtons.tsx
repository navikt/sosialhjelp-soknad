import React from "react";
import cx from "classnames";
import {ChevronLeftIcon, ChevronRightIcon} from "@navikt/aksel-icons";
import {useTranslations} from "next-intl";

export const PageFlipperButtons = ({
    numPages,
    pageNumber,
    setPageNumber,
}: {
    numPages: number | undefined;
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const t = useTranslations("PageFlipperButtons");
    if (numPages === undefined) return null;
    const ICON_STYLE = "bg-blue-800/10 hover:bg-blue-100 text-5xl rounded-full";

    const navigate = (direction: "next" | "prev") => {
        if (direction === "next") {
            if (pageNumber < numPages) setPageNumber((prev) => prev + 1);
        } else {
            if (pageNumber > 1) setPageNumber((prev) => prev - 1);
        }
    };

    return (
        <div className={"bg-transparent h-full z-10 flex items-center absolute inset-0"}>
            <div className={"mx-4 flex bg-transparent justify-between w-full"}>
                <button
                    disabled={pageNumber === 1}
                    className={cx(ICON_STYLE, {"opacity-20": pageNumber === 1})}
                    onClick={() => navigate("prev")}
                >
                    <span className="sr-only">{t("forrige")}</span>
                    <ChevronLeftIcon aria-hidden />
                </button>
                <button
                    disabled={pageNumber === numPages}
                    className={cx(ICON_STYLE, {"opacity-20": pageNumber === numPages})}
                    onClick={() => navigate("next")}
                >
                    <span className="sr-only">{t("neste")}</span>
                    <ChevronRightIcon aria-hidden />
                </button>
            </div>
        </div>
    );
};

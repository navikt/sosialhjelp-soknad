import React, {useRef, useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@navikt/aksel-icons";
import {Thumbnail} from "react-pdf";
import cx from "classnames";

export const FilePreviewThumbs = ({
    currentPage,
    numPages,
    setPageNumber,
}: {
    numPages?: number;
    currentPage: number;
    setPageNumber: (pageNumber: number) => void;
}) => {
    const pageListRef = useRef<HTMLDivElement>(null);
    const [, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    if (!numPages) return null;
    const pages = Array.from({length: numPages}, (_, i) => i + 1);
    return (
        <div className={"w-full flex items-center justify-between"}>
            <div>
                <ChevronLeftIcon
                    className={"text-4xl cursor-pointer"}
                    onMouseDown={(_e) => {
                        setIntervalId((intervalId) => {
                            if (intervalId) clearInterval(intervalId);
                            return setInterval(() => {
                                pageListRef.current?.scrollBy({left: -40});
                            }, 100);
                        });
                    }}
                    onMouseUp={() => {
                        setIntervalId((intervalId) => {
                            if (intervalId) clearInterval(intervalId);
                            return null;
                        });
                    }}
                />
            </div>
            <div
                ref={pageListRef}
                className={"snap-x snap-mandatory overflow-x-scroll flex flex-row p-2 select-none min-w-max "}
            >
                {pages.map((pageNumber) => (
                    <div
                        key={pageNumber}
                        className={cx("snap-start p-2", {"font-bold bg-gray-200": currentPage === pageNumber})}
                        onClick={() => setPageNumber(pageNumber)}
                    >
                        <div className={"border-2 border-blue-200 bg-red-300 h-[100px]"} key={pageNumber}>
                            <Thumbnail pageNumber={1} height={96} onItemClick={() => {}} />
                        </div>
                        <div className={"text-center"}>{pageNumber}</div>
                    </div>
                ))}
            </div>
            <div>
                <ChevronRightIcon
                    className={"text-4xl cursor-pointer"}
                    onMouseDown={(_e) => {
                        setIntervalId((intervalId) => {
                            if (intervalId) clearInterval(intervalId);
                            return setInterval(() => {
                                pageListRef.current?.scrollBy({left: 40});
                            }, 100);
                        });
                    }}
                    onMouseUp={() => {
                        setIntervalId((intervalId) => {
                            if (intervalId) clearInterval(intervalId);
                            return null;
                        });
                    }}
                />
            </div>
        </div>
    );
};

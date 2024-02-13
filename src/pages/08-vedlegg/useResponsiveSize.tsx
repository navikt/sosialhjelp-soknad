import React, {useEffect, useState} from "react";

/**
 * Automatically resize the `Page` component to fit the container.
 * This is a bit of a hack.
 *
 * Basically, pdfjs renders to a canvas of a given size. This size is set in the `Page` component.
 * However, we want the size of the `Page` component to be responsive to the size of the container.
 *
 * @param paddingOffset - Pixel offset to subtract from the height of the container. This is to account for padding and margins.
 * @warning You *must* set paddingOffset to at least the number of vertical padding pixels!
 *          Otherwise, the `Page` component will grow indefinitely as each resize grows the parent, triggering a new resize.
 */
export const useResponsiveSize = (paddingOffset: number) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>(20);
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver(() => {
            if (containerRef.current) setHeight(containerRef.current.clientHeight - paddingOffset);
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [containerRef.current]);

    return {containerRef, height};
};

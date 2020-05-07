import * as React from "react";

/**
 * Endringer inne i denne komponenten vil
 * bli lest opp av skjermleser automatisk
 * når endringene inntreffer
 */

export interface AriaLiveProps extends React.Props<any> {
    /** Default true. Sets if changes is to be read by screenreader or not */
    active?: boolean;
}

const AriaLive: React.StatelessComponent<AriaLiveProps> = ({active, children}) => {
    if (active) {
        return (
            <span className="aria-live" role="status" aria-atomic="true" aria-live="polite" aria-relevant="text">
                {children}
            </span>
        );
    }
    return <span>{children}</span>;
};

export default AriaLive;

import * as React from "react";
import AriaText from "./AriaText";

export interface AriaAlternativeTextProps {
    /** Alternative text for screen-readers */
    ariaText?: string | React.ReactNode;
    /** Text visible on screen */
    visibleText: string | React.ReactNode;
}

const AriaAlternativeText: React.StatelessComponent<AriaAlternativeTextProps> = ({ariaText, visibleText}) => {
    if (!ariaText) {
        return <span>{visibleText}</span>;
    }
    return (
        <span>
            <AriaText>{ariaText}</AriaText>
            <span aria-hidden={true} role="presentation">
                {visibleText}
            </span>
        </span>
    );
};

export default AriaAlternativeText;

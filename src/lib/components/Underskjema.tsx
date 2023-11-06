import * as React from "react";
import classNames from "classnames";
import {UnmountClosed} from "react-collapse";
interface UnderskjemaProps {
    visible?: boolean;
    // Show an arrow in the top-left corner, indicating relevance to element above.
    arrow?: boolean;
    stil?: "default" | "system";
    collapsable?: boolean;
    // Temporary kludge to add grey background.
    // Given the somewhat terrible name jaNeiSporsmal because I don't know what other side effects the CSS class has.
    jaNeiSporsmal?: boolean;
    children: React.ReactNode;
}

export const Underskjema = ({
    visible,
    arrow = true,
    stil = "default",
    collapsable = true,
    children,
    jaNeiSporsmal,
}: UnderskjemaProps) => {
    const cls = classNames(
        "underskjema",
        `underskjema--${stil}`,
        {
            "underskjema--arrow": arrow,
            "underskjema--noPadding": !collapsable,
            "skjema-sporsmal--jaNeiSporsmal": jaNeiSporsmal,
        },
        stil
    );
    const renderContent = () => (
        <div className={cls}>
            <div className={"underskjema__boks " + (visible ? "underskjema__boks__synlig" : "")}>
                <div className="underskjema__innhold ">{children}</div>
            </div>
        </div>
    );

    if (collapsable) {
        return (
            <UnmountClosed isOpened={visible ? visible : false} className="underskjema__wrapper">
                {renderContent()}
            </UnmountClosed>
        );
    }
    return <div className="underskjema__wrapper">{renderContent()}</div>;
};

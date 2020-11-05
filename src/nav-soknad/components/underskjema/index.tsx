import * as React from "react";
import * as classNames from "classnames";
import {UnmountClosed} from "react-collapse";
import {loggAdvarsel} from "../../../digisos/redux/navlogger/navloggerActions";

interface UnderskjemaProps extends React.Props<any> {
    visible?: boolean;
    arrow?: boolean;
    stil?: "default" | "system";
    collapsable?: boolean;
    children: React.ReactNode;
}

const Underskjema: React.StatelessComponent<UnderskjemaProps> = ({
    visible,
    arrow = true,
    stil = "default",
    collapsable = true,
    children,
}) => {
    // @ts-ignore
    const cls = classNames(
        "underskjema",
        `underskjema--${stil}`,
        {
            "underskjema--arrow": arrow,
            "underskjema--noPadding": !collapsable,
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

    let content = <span />;
    try {
        content = renderContent();
    } catch (e) {
        loggAdvarsel("Feil ved rendering av underskjema: " + e.toString());
    }
    if (collapsable) {
        return (
            <UnmountClosed
                isOpened={visible ? visible : false}
                className="underskjema__wrapper"
                hasNestedCollapse={true}
            >
                {content}
            </UnmountClosed>
        );
    }
    return <div className="underskjema__wrapper">{renderContent()}</div>;
};

export default Underskjema;

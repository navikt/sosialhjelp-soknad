import * as React from "react";
import {UnmountClosed} from "react-collapse";
import {logWarning} from "../../utils/loggerUtils";

type Sizes = "small" | "large";

interface Props {
    tittel?: string;
    visible: boolean;
    children: React.ReactNode;
    size?: Sizes;
}

interface State {
    expanded: boolean;
    animate: boolean;
}
class NivaTreSkjema extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            expanded: this.props.visible,
            animate: false,
        };
    }

    componentDidUpdate(prevProps: Props, prevState: State, snapshot: any) {
        if (!prevProps.visible && this.props.visible) {
            this.setState({expanded: true});
            this.setState({animate: !prevState.expanded});
        }
        if (prevProps.visible && !this.props.visible) {
            this.setState({expanded: false});
            this.setState({animate: prevState.expanded});
        }
    }

    render() {
        const {size, visible, children} = this.props;
        const className = size && size === "small" ? " nivaTreSkjema__small" : "";
        const renderContent = () => (
            <div className={"nivaTreSkjema " + className}>
                <div className="nivaTreSkjema__boks">
                    <div className={"nivaTreSkjema__innhold" + (visible ? " nivaTreSkjema__innhold__ekspandert" : "")}>
                        {children}
                    </div>
                </div>
            </div>
        );
        let content = <span />;
        try {
            content = renderContent();
        } catch (e) {
            logWarning("Feil ved rendering av nivå tre skjema: " + e.toString());
        }
        if (this.state.animate) {
            return (
                <UnmountClosed isOpened={visible} className="underskjemaWrapper">
                    {content}
                </UnmountClosed>
            );
        }
        if (!visible) {
            return null;
        }
        return <div className="underskjemaWrapper">{content}</div>;
    }
}

export default NivaTreSkjema;

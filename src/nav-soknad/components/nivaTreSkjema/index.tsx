import * as React from "react";
import {loggFeil} from "../../../digisos/redux/navlogger/navloggerActions";
import {UnmountClosed} from "react-collapse";

type Sizes = "small" | "large";

interface Props extends React.Props<any> {
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
        if (prevProps.visible === false && this.props.visible === true) {
            this.setState({expanded: true});
            if (prevState.expanded === false) {
                this.setState({animate: true});
            } else {
                this.setState({animate: false});
            }
        }
        if (prevProps.visible === true && this.props.visible === false) {
            this.setState({expanded: false});
            if (prevState.expanded === true) {
                this.setState({animate: true});
            } else {
                this.setState({animate: false});
            }
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
            loggFeil("Feil ved rendering av nivå tre skjema: " + e.toString());
        }
        if (this.state.animate === true) {
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

import * as React from "react";
import {createPortal} from "react-dom";

class DOMPortal extends React.Component<React.Props<any>, {}> {
    render() {
        return createPortal(this.props.children, document.body);
    }
}

export default DOMPortal;

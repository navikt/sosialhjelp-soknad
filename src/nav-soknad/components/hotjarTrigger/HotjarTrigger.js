import React, {Component} from "react";
import {node, string} from "prop-types";
import {erMockMiljoEllerDev} from "../../utils";

export default class HotjarTrigger extends Component {
    componentDidMount() {
        const {hotjarTrigger} = this.props;
        if (typeof window.hj === "function" && !erMockMiljoEllerDev()) {
            window.hj("trigger", hotjarTrigger);
        }
    }

    render() {
        const {children} = this.props;
        return children;
    }
}

HotjarTrigger.propTypes = {
    hotjarTrigger: string.isRequired,
    children: node.isRequired,
};

export const SoknadEttersendelseFeilerHotjarTrigger = ({children}) => (
    <HotjarTrigger hotjarTrigger="digisos_ettersende_gammel_soknad_feiler">{children}</HotjarTrigger>
);

export const DigisosGammelEttersendelseHotjarTrigger = ({children}) => (
    <HotjarTrigger hotjarTrigger="digisos_ettersende_gammel_soknad">{children}</HotjarTrigger>
);

SoknadEttersendelseFeilerHotjarTrigger.propTypes = {
    children: node,
};

DigisosGammelEttersendelseHotjarTrigger.propTypes = {
    children: node,
};

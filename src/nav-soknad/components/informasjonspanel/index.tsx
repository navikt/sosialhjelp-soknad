import * as React from "react";
import Ella from "../svg/Ella";
import Brevkonvolutt from "../svg/Brevkonvolutt";
import {DigisosFarge} from "../svg/DigisosFarger";
import Hensyn from "../svg/Hensyn";
import {erMobilVisning} from "../../utils/domUtils";
import EllaKompakt from "../svg/EllaKompakt";

interface OwnProps {
    farge: DigisosFarge;
    children?: any;
    synlig?: boolean;
    ikon: InformasjonspanelIkon;
    className?: string;
    wrapperClassName?: string;
}

interface State {
    vises: boolean;
}

export enum InformasjonspanelIkon {
    ELLA = "ella",
    BREVKONVOLUTT = "brevkonvolutt",
    HENSYN = "hensyn",
}

class Informasjonspanel extends React.Component<OwnProps, State> {
    panelIsMounted: boolean = false;

    constructor(props: OwnProps) {
        super(props);
        this.state = {
            vises: false,
        };
    }

    componentDidMount() {
        this.panelIsMounted = true;
        setTimeout(() => {
            if (this.panelIsMounted) {
                this.setState({vises: true});
            }
        }, 200);
    }

    componentWillUnmount(): void {
        this.panelIsMounted = false;
    }

    renderIkon() {
        const iconSize = erMobilVisning() ? 64 : 80;
        switch (this.props.ikon) {
            case InformasjonspanelIkon.ELLA: {
                return (
                    <div>
                        <div className="ikke_mobilvennlig_ikon">
                            <Ella size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge} />
                        </div>

                        <div className="mobilvennlig_ikon">
                            <EllaKompakt bakgrundsFarge={this.props.farge} />
                        </div>
                    </div>
                );
            }
            case InformasjonspanelIkon.BREVKONVOLUTT: {
                return (
                    <div>
                        <Brevkonvolutt size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge} />
                    </div>
                );
            }
            case InformasjonspanelIkon.HENSYN: {
                return (
                    <div>
                        <Hensyn size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge} />
                    </div>
                );
            }
            default: {
                return (
                    <div>
                        <Ella size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge} />
                    </div>
                );
            }
        }
    }

    renderContent(fadeIn: boolean) {
        const styleClassName = "skjema-informasjonspanel--" + this.props.farge;

        return (
            <div className={"skjema-informasjonspanel-wrapper " + this.props.className}>
                <div
                    className={
                        "skjema-informasjonspanel " +
                        styleClassName +
                        (this.props.synlig || fadeIn === false ? " skjema-informasjonspanel__synlig" : "")
                    }
                >
                    <div>{this.renderIkon()}</div>
                    <span>{this.props.children}</span>
                </div>
            </div>
        );
    }

    render() {
        if (!this.props.synlig) {
            return null;
        } else if (typeof this.state.vises === "undefined") {
            return this.renderContent(false);
        } else {
            return <div className={"react-collapse-wrapper"}>{this.renderContent(true)}</div>;
        }
    }
}

export default Informasjonspanel;

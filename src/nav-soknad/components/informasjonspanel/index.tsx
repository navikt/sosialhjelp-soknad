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
    ikon: InformasjonspanelIkon;
    className?: string;
    wrapperClassName?: string;
}

export enum InformasjonspanelIkon {
    ELLA = "ella",
    BREVKONVOLUTT = "brevkonvolutt",
    HENSYN = "hensyn",
}

const Informasjonspanel = (props: OwnProps) => {
    const renderIkon = () => {
        const iconSize = erMobilVisning() ? 64 : 80;
        switch (props.ikon) {
            case InformasjonspanelIkon.ELLA: {
                return (
                    <div>
                        <div className="ikke_mobilvennlig_ikon">
                            <Ella size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={props.farge} />
                        </div>

                        <div className="mobilvennlig_ikon">
                            <EllaKompakt bakgrundsFarge={props.farge} />
                        </div>
                    </div>
                );
            }
            case InformasjonspanelIkon.BREVKONVOLUTT: {
                return (
                    <div>
                        <Brevkonvolutt size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={props.farge} />
                    </div>
                );
            }
            case InformasjonspanelIkon.HENSYN: {
                return (
                    <div>
                        <Hensyn size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={props.farge} />
                    </div>
                );
            }
            default: {
                return (
                    <div>
                        <Ella size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={props.farge} />
                    </div>
                );
            }
        }
    };

    const styleClassName = "skjema-informasjonspanel--" + props.farge;

    return (
        <div className={"react-collapse-wrapper"}>
            <div className={"skjema-informasjonspanel-wrapper " + props.className}>
                <div className={"skjema-informasjonspanel " + styleClassName}>
                    <div>{renderIkon()}</div>
                    <span>{props.children}</span>
                </div>
            </div>
        </div>
    );
};

export default Informasjonspanel;

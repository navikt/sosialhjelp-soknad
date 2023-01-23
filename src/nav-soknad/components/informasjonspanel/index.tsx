import * as React from "react";
import Ella from "../svg/Ella";
import Brevkonvolutt from "../svg/Brevkonvolutt";
import {DigisosFarge} from "../svg/DigisosFarger";
import Hensyn from "../svg/Hensyn";
import {erMobilVisning} from "../../utils/domUtils";
import {ReactNode} from "react";

interface InformasjonspanelProps {
    farge: DigisosFarge;
    children?: any;
    ikon: "ella" | "konvolutt" | "hensyn";
    className?: string;
}

// TODO: Fjern erMobilVisning
const Informasjonspanel = ({children, className, ikon, farge}: InformasjonspanelProps) => {
    const iconSize = erMobilVisning() ? 64 : 80;

    const ikonElement: Record<typeof ikon, ReactNode> = {
        ella: <Ella size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={farge} />,
        konvolutt: <Brevkonvolutt size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={farge} />,
        hensyn: <Hensyn size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={farge} />,
    };

    const styleClassName = "skjema-informasjonspanel--" + farge;

    return (
        <div className={"react-collapse-wrapper"}>
            <div className={"skjema-informasjonspanel-wrapper " + className}>
                <div className={"skjema-informasjonspanel " + styleClassName}>
                    <div>{ikonElement[ikon]}</div>
                    <span>{children}</span>
                </div>
            </div>
        </div>
    );
};

export default Informasjonspanel;

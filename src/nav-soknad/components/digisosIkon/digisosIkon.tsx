import * as React from "react";
import SVG from "react-inlinesvg";
import SearchAddress from "./SearchAddress";
import {getContextPathForStaticContent} from "../../../configuration";

export type ikoner =
    | "lastOpp"
    | "printer"
    | "konvolutt"
    | "advarselSirkel"
    | "snakkebobler"
    | "dokumenter"
    | "searchAddresse"
    | "checkCircle"
    | "reportProblemCircle";

interface Props {
    className?: string;
    navn: ikoner;
    style?: any;
    ariaHidden?: boolean;
}

const DigisosIkon: React.FC<Props> = ({className, navn, style, ariaHidden}) => {
    if (navn === "searchAddresse") {
        return <SearchAddress />;
    } else {
        return (
            <SVG
                aria-hidden={!!ariaHidden}
                style={style}
                className={className || ""}
                src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_${navn}.svg`}
            />
        );
    }
};

export default DigisosIkon;

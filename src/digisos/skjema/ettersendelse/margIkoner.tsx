import * as React from "react";
import Icon from "nav-frontend-ikoner-assets";
import DigisosIkon from "../../../nav-soknad/components/digisosIkon/digisosIkon";
import NavFrontendChevron from "nav-frontend-chevron";
import DigisosIkonKonvolutt from "../../../nav-soknad/components/digisosIkon/digisosKonvolutt";
import PaperclipIcon from "../../../nav-soknad/components/digisosIkon/paperclipIcon";

enum MargIkoner {
    OK = "OK",
    ADVARSEL = "ADVARSLE",
    DOKUMENTER = "DOKUMENTER",
    PRINTER = "PRINTER",
    CHEVRON_OPP = "CHEVRON_OPP",
    CHEVRON_NED = "CHEVRON_NED",
    SNAKKEBOBLER = "SNAKKEBOBLER",
    KONVOLUTT = "KONVOLUTT",
    SØPPELBØTTE = "SØPPELBØTTE",
    LAST_OPP = "LAST_OPP",
    BINDERS = "BINDERS",
}

const MargIkon: React.FC<{ikon: MargIkoner}> = ({ikon}) => {
    switch (ikon) {
        case MargIkoner.ADVARSEL:
            return <Icon aria-label="advarsel ikon" kind="advarsel-sirkel-fyll" className="ettersendelse__ikon" />;
        case MargIkoner.OK:
            return <Icon aria-label="suksess ikon" kind="ok-sirkel-fyll" className="ettersendelse__ikon" />;
        case MargIkoner.PRINTER:
            return (
                <DigisosIkon
                    navn="printer"
                    style={{paddingTop: "6px", paddingRight: "0"}}
                    className="ettersendelse__ikon"
                />
            );
        case MargIkoner.CHEVRON_OPP:
            return <NavFrontendChevron className="ettersendelse__chevron" type="opp" />;
        case MargIkoner.CHEVRON_NED:
            return <NavFrontendChevron className="ettersendelse__chevron" type="ned" />;
        case MargIkoner.SNAKKEBOBLER:
            return <DigisosIkon navn="snakkebobler" className="ettersendelse__ikon" ariaHidden={true} />;
        case MargIkoner.KONVOLUTT:
            return <DigisosIkonKonvolutt size={"23"} />;
        case MargIkoner.SØPPELBØTTE:
            return (
                <DigisosIkon
                    ariaHidden={true}
                    navn="trashcan"
                    style={{paddingTop: "6px"}}
                    className="ettersendelse__ikon trashcan"
                />
            );
        case MargIkoner.LAST_OPP:
            return (
                <DigisosIkon
                    navn="lastOpp"
                    style={{paddingTop: "6px", paddingLeft: "2px"}}
                    className="ettersendelse__ikon"
                />
            );
        case MargIkoner.DOKUMENTER:
            return <DigisosIkon ariaHidden={true} navn="dokumenter" className="ettersendelse__ikon" />;
        case MargIkoner.BINDERS:
            return <PaperclipIcon />;
        default:
            return <DigisosIkon navn="advarselSirkel" className="ettersendelse__ikon" />;
    }
};

export {MargIkon, MargIkoner};

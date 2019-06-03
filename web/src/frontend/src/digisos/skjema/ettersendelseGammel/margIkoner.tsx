import * as React from "react";
import Icon from "nav-frontend-ikoner-assets";
import DigisosIkon from "../../../nav-soknad/components/digisosIkon/digisosIkon";
import NavFrontendChevron from "nav-frontend-chevron";
import NavFrontendSpinner from "nav-frontend-spinner";

enum MargIkoner {
	OK = "OK",
	ADVARSEL = "ADVARSLE",
	DOKUMENTER = "DOKUMENTER",
	PRINTER = "PRINTER",
	CHEVRON_OPP = "CHEVRON_OPP",
	CHEVRON_NED = "CHEVRON_NED",
	SNAKKEBOBLER = "SNAKKEBOBLER",
	KONVOLUTT = "KONVOLUTT",
	SPINNER = "SPINNER",
	SØPPELBØTTE = "SØPPELBØTTE",
	LAST_OPP = "LAST_OPP"
}

const MargIkon: React.StatelessComponent<{ ikon: MargIkoner }> = ({ ikon }) => {
	switch (ikon) {
		case MargIkoner.ADVARSEL:
			return <DigisosIkon navn="advarselSirkel" className="ettersendelse__ikon"/>;
		case MargIkoner.OK:
			return <Icon kind="stegindikator__hake" className="ettersendelse__ikon"/>;
		case MargIkoner.PRINTER:
			return (<DigisosIkon
				navn="printer"
				style={{paddingTop: "6px", paddingRight: "6px"}}
				className="ettersendelse__ikon"/>);
		case MargIkoner.CHEVRON_OPP:
			return <NavFrontendChevron className="ettersendelse__chevron" type="opp"/>;
		case MargIkoner.CHEVRON_NED:
			return <NavFrontendChevron className="ettersendelse__chevron" type="ned"/>;
		case MargIkoner.SNAKKEBOBLER:
			return <DigisosIkon navn="snakkebobler" className="ettersendelse__ikon"/>;
		case MargIkoner.SPINNER:
			return <NavFrontendSpinner type="XS" />;
		case MargIkoner.KONVOLUTT:
			return <DigisosIkon navn="konvolutt" className="ettersendelse__ikon"/>;
		case MargIkoner.SØPPELBØTTE:
			return (<DigisosIkon
					navn="trashcan"
					style={{paddingTop: "6px"}}
					className="ettersendelse__ikon trashcan"/>);
		case MargIkoner.LAST_OPP:
			return (<DigisosIkon
				navn="lastOpp"
				style={{paddingTop: "6px"}}
				className="ettersendelse__ikon"/>);
		case MargIkoner.DOKUMENTER:
			return <DigisosIkon navn="dokumenter" className="ettersendelse__ikon"/>;
		default:
			return <DigisosIkon navn="advarselSirkel" className="ettersendelse__ikon"/>;
	}
};

export {
	MargIkon,
	MargIkoner
};

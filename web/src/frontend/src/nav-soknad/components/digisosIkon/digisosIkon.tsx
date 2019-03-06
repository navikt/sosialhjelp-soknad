import * as React from "react";
import SVG from "react-inlinesvg";
import SearchAddress from "./SearchAddress";

export type ikoner =
	| "lastOpp"
	| "printer"
	| "konvolutt"
	| "advarselSirkel"
	| "trashcan"
	| "snakkebobler"
	| "dokumenter"
	| "searchAddresse"
	| "checkCircle"
	| "reportProblemCircle";

interface Props {
	className?: string;
	navn: ikoner;
	style?: any;
}

const DigisosIkon: React.StatelessComponent<Props & {}> = ({className, navn, style}) => {
	if (navn === "searchAddresse") {
		return <SearchAddress/>;
	} else {
		return (
			<SVG style={style}
			     className={className || ""}
			     src={"/sosialhjelp/soknad/statisk/bilder/ikon_" + navn + ".svg"}
			/>
		);
	}
};

export default DigisosIkon;

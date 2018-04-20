import * as React from "react";
import SVG from "react-inlinesvg";

export type ikoner =
	| "lastOpp"
	| "printer"
	| "konvolutt"
	| "advarselSirkel"
	| "trashcan"
	| "snakkebobler"
	| "dokumenter";

const DigisosIkon: React.StatelessComponent<{className?: string, navn: ikoner} & {}> = ({className, navn}) => {
	return (
		<SVG
			className={className || ""}
			src={"/soknadsosialhjelp/statisk/bilder/ikon_" + navn + ".svg"}
		/>
	);
};

export default DigisosIkon;

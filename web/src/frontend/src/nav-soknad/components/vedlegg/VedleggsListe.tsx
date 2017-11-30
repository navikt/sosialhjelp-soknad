import * as React from "react";
import Lenkeknapp from "../lenkeknapp/Lenkeknapp";
import SlettIkon from "./SlettIkon";
import { Fil } from "../../redux/vedlegg/vedleggTypes";

interface Props extends React.Props<any> {
	filer: Fil[];
	faktumKey: string;
}

function lastNedVedlegg(vedleggId: string, faktumKey: string) {
	window.alert("Last ned vedlegg ikke implementert");
}

const VedleggsListe: React.StatelessComponent<Props> = ({ filer, faktumKey }) => {
	return (
		<div>
			{filer && filer.map((fil: Fil, index: number) => {
				return (
					<p key={index}>
						<Lenkeknapp
							onClick={() => lastNedVedlegg(fil.navn, faktumKey)}
						>
							{fil.navn}
						</Lenkeknapp>
						<span className="slettIkon"><SlettIkon/></span>
					</p>

				);
			})
			}
		</div>
	);
};

export default VedleggsListe;

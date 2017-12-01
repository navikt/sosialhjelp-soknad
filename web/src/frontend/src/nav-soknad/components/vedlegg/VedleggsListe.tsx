import * as React from "react";
import Lenkeknapp from "../lenkeknapp/Lenkeknapp";
import SlettIkon from "./SlettIkon";
import { Fil } from "../../redux/vedlegg/vedleggTypes";

interface Props extends React.Props<any> {
	filer: Fil[];
	faktumKey: string;
	slettFil(faktumKey: string, filNavn: string): void;
}

function lastNedVedlegg(vedleggId: string, faktumKey: string) {
	window.alert("Last ned vedlegg ikke implementert");
}

const VedleggsListe: React.StatelessComponent<Props> = ({ filer, faktumKey, slettFil }) => {
	return (
		<div className="vedleggsliste">
			{filer && filer.map((fil: Fil, index: number) => {
				return (
					<div key={index} className="vedlegg">
						<span className="filnavn">
							<Lenkeknapp
								onClick={() => lastNedVedlegg(faktumKey, fil.navn)}
							>
								{fil.navn}
							</Lenkeknapp>
						</span>
						<span
							className="slettIkon"
							onClick={() => slettFil(faktumKey, fil.navn)}
						>
							<SlettIkon/>
						</span>
					</div>

				);
			})
			}
		</div>
	);
};

export default VedleggsListe;

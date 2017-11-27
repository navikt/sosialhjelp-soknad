import * as React from "react";
import Lenkeknapp from "../lenkeknapp/Lenkeknapp";
import SlettIkon from "./SlettIkon";

interface Vedlegg {
	name: string;
	vedleggId: string;
}

interface Props extends React.Props<any> {
	vedlegg: Vedlegg[];
}

function lastNedVedlegg(vedleggId: string) {
	window.alert("Last ned vedlegg ikke implementert");
}

const VedleggsListe: React.StatelessComponent<Props> = ({ vedlegg }) => {
	return (
		<div>
			{vedlegg && vedlegg.map((vedlagtFil: Vedlegg, index: number) => {
				return (
					<p key={index}>
						<Lenkeknapp
							onClick={() => lastNedVedlegg(vedlagtFil.vedleggId)}
							label={vedlagtFil.name}
						/>
						<span className="slettIkon"><SlettIkon/></span>
					</p>

				);
			})
			}
		</div>
	);
};

export default VedleggsListe;

import * as React from "react";
import Skjemapanel from "../skjemapanel";

interface Props {
	progresjon?: number;
	tittel: string;
	beskrivelse?: string;
	content: React.ReactNode[];
}

const eiendelerSomIkkeTrengerVedleggsOpplasting = [
	"opplysninger.inntekt.eierandeler.bolig",
	"opplysninger.inntekt.eierandeler.kjoretoy",
	"opplysninger.inntekt.eierandeler.campingvogn",
	"opplysninger.inntekt.eierandeler.fritidseiendom",
	"opplysninger.inntekt.eierandeler.annet"
];

const progresjonsbolker: string[] = [
	""
];

class Progresjonsblokk extends React.Component<Props> {

	render() {

		const { tittel, beskrivelse, content} = this.props;
		const KEY = "key";


		const redusertContent:any = content.map((child, idx) => {
			if (eiendelerSomIkkeTrengerVedleggsOpplasting.indexOf(child[KEY]) < 0 ) {
				return (
					<div className="skjema-progresjonsblokk__sporsmal" key={idx}>
						{child}
					</div>
				)
			} else {
				return null;
			}
		});

		return (
			<Skjemapanel className="skjema-progresjonsblokk">
				<div className="skjema-progresjonsblokk__head">
					<h3>{tittel}</h3>
					{beskrivelse && <p>{beskrivelse}</p>}
				</div>
				{ redusertContent }
				{ progresjonsbolker }
			</Skjemapanel>
		);
	}
}

export default Progresjonsblokk;

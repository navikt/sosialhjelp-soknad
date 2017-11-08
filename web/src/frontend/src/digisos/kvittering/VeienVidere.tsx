import * as React from "react";
import { Panel } from "nav-frontend-paneler";
import { Innholdstittel, Undertittel } from "nav-frontend-typografi";
import SVG from "../../nav-soknad/components/svg/SVGImage";
const illustration = require("../svg/kvittering-illustrasjon.svg");

interface Props {
	prop?: any;
}

interface AvsnittProps {
	icon: string;
	tittel: string;
	children: React.ReactNode;
}

const Avsnitt: React.StatelessComponent<AvsnittProps> = (
	props: AvsnittProps
) => (
	<div className="infoSeksjon">
		<div className="infoSeksjon__ikon">
			<SVG src={props.icon} width={35} height={35} />
		</div>
		<Undertittel className="infoSeksjon__tittel tittel-strek">
			{props.tittel}
		</Undertittel>
		<div className="infoSeksjon__innhold">{props.children}</div>
	</div>
);

const VeienVidere: React.StatelessComponent<Props> = (props: Props) => (
	<div>
		<Innholdstittel className="blokk-s">Hva skjer videre nå?</Innholdstittel>
		<Panel className="panel--noPadding">
			<div className="panelIllustrasjon">
				<img src={illustration} width="100%" alt="" />
			</div>
			<div className="panel-padding">
				<div className="blokk-xl">
					<Avsnitt
						icon={require("../svg/snakkebobler.svg")}
						tittel="Samtale med NAV-kontoret"
					>
						Hvis det er første gang du søker om økonomisk sosialhjelp, blir du
						vanligvis innkalt til et møte.
					</Avsnitt>
				</div>

				<div className="blokk-xl">
					<Avsnitt
						icon={require("../svg/kalender.svg")}
						tittel="Saksbehandlingstid"
					>
						Saksbehandlingstiden varierer fra kommune til kommune. Når vi har
						behandlet søknaden din, får du et vedtak. Hvos det går mer enn én
						måned, skal du få et foreløpig svar. Hvis vi mangler opplysninger
						eller du ikke har levert all nødvendig dokumentasjon, kan det ta
						lengre tid før du får svar på søknaden din.
					</Avsnitt>
				</div>

				<div className="blokk-xl">
					<Avsnitt
						icon={require("../svg/person.svg")}
						tittel="Hvis situasjonen din endrer seg"
					>
						Du må gi beskjed hvis den økonimiske situasjonen din endrer seg
						etter at du har sendt søknaden.
					</Avsnitt>
				</div>
			</div>
		</Panel>
	</div>
);

export default VeienVidere;

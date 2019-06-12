import * as React from "react";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl";
import { Panel } from "nav-frontend-paneler";
import { Innholdstittel, Undertittel } from "nav-frontend-typografi";
import SVG from "../../nav-soknad/components/svg/SVGImage";
import {getAbsoluteBasename} from "../../index";

interface Props {
	prop?: any;
}

interface AvsnittProps {
	icon: string;
	tittelId: string;
	tekstId: string;
}

const Avsnitt: React.StatelessComponent<AvsnittProps> = (
	props: AvsnittProps
) => (
	<div className="infoSeksjon">
		<div className="infoSeksjon__ikon">
			<SVG src={props.icon} width={35} height={35} />
		</div>
		<Undertittel className="infoSeksjon__tittel tittel-strek">
			<FormattedMessage id={props.tittelId} />
		</Undertittel>
		<div className="infoSeksjon__innhold">
			<FormattedHTMLMessage id={props.tekstId} />
		</div>
	</div>
);

const VeienVidere: React.StatelessComponent<Props> = (props: Props) => (
	<div>
		<Innholdstittel className="blokk-s">
			<FormattedMessage id="kvittering.veienvidere.tittel" />
		</Innholdstittel>
		<Panel className="panel--noPadding">
			<div className="panelIllustrasjon">
				<img
					src={`/${getAbsoluteBasename()}/statisk/bilder/kvittering-illustrasjon.svg`}
					alt=""
					className="kvittering-illustration"
				/>
			</div>
			<div className="panel-padding">
				<div className="blokk-xl">
					<Avsnitt
						icon={`/${getAbsoluteBasename()}/statisk/bilder/snakkebobler.svg`}
						tittelId="kvittering.samtale.tittel"
						tekstId="kvittering.samtale.tekst"
					/>
				</div>

				<div className="blokk-xl">
					<Avsnitt
						icon={`/${getAbsoluteBasename()}/statisk/bilder/kalender.svg`}
						tittelId="kvittering.saksbehandling.tittel"
						tekstId="kvittering.saksbehandling.tekst"
					/>
				</div>

				<div className="blokk-xl">
					<Avsnitt
						icon={`/${getAbsoluteBasename()}/statisk/bilder/person.svg`}
						tittelId="kvittering.situasjon.tittel"
						tekstId="kvittering.situasjon.tekst"
					/>
				</div>
			</div>
		</Panel>
	</div>
);

export default VeienVidere;

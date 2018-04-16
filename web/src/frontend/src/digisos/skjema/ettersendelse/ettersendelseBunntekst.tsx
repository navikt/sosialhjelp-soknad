import DigisosIkon from "../../../nav-soknad/components/digisosIkon/digisosIkon";
import SVG from "react-inlinesvg";
import * as React from "react";
import { FormattedHTMLMessage } from "react-intl";

const EttersendelseBunntekst: React.StatelessComponent = () => {
	return (
		<span>
			<div className="avsnitt_med_marger" style={{ "marginTop": "1rem" }}>
				<div className="venstremarg">
					<DigisosIkon navn="snakkebobler" className="ettersendelse__ikon"/>
				</div>
				<div className="avsnitt">
					<h3>Du blir innkalt til en samtale</h3>
					<p>
						Hvis du søker om økonomisk sosialhjelp, blir du vanligvis innkalt til en
						samtale med en veileder. Du kan også kontakte NAV-kontoret ditt og avtale et møte.
						Les mer om hvordan et møte foregår.
					</p>
				</div>
				<div className="hoyremarg"/>
			</div>

			<div className="avsnitt_med_marger">
				<div className="venstremarg">
					<SVG
						className="ettersendelse__ikon"
						src={"/soknadsosialhjelp/statisk/bilder/ikon_konvolutt.svg"}
					/>
				</div>
				<div className="avsnitt">
					<h3><FormattedHTMLMessage id="ettersendelse.vedtak.info" />Du får beskjed om vedtak</h3>
					<p>
						<FormattedHTMLMessage id="ettersendelse.vedtak.info" />
					Saksbehandlingstiden varierer fra kommune til kommune.
					Når vi har behandlet søknaden din, får du et vedtak. Hvis det går mer enn én måned,
					skal du få et foreløpig svar. Hvis vi mangler opplysninger eller du ikke har levert
					all nødvendig dokumentasjon, kan det ta lengre tid før du får svar på søknaden din.
				</p>
			</div>
				<div className="hoyremarg"/>
			</div>
		</span>
	);
};

export default EttersendelseBunntekst;

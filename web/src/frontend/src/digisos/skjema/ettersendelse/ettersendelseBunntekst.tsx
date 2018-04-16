import DigisosIkon from "../../../nav-soknad/components/digisosIkon/digisosIkon";
import SVG from "react-inlinesvg";
import * as React from "react";
import { FormattedHTMLMessage } from "react-intl";

const EttersendelseBunntekst: React.StatelessComponent = () => {
	return (
		<div className="ettersendelse_bunntekst">
			<div className="avsnitt_med_marger" >
				<div className="venstremarg">
					<DigisosIkon navn="snakkebobler" className="ettersendelse__ikon"/>
				</div>
				<div className="avsnitt">
					<h3><FormattedHTMLMessage id="ettersendelse.samtale.tittel" /></h3>
					<p>
						<FormattedHTMLMessage id="ettersendelse.samtale.info" />
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
					<h3><FormattedHTMLMessage id="ettersendelse.vedtak.tittel" /></h3>
					<p>
						<FormattedHTMLMessage id="ettersendelse.vedtak.info" />
					</p>
			</div>
				<div className="hoyremarg"/>
			</div>
		</div>
	);
};

export default EttersendelseBunntekst;

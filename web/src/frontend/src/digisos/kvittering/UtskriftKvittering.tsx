import * as React from "react";
import { FormattedMessage } from "react-intl";
import OppsummeringForUtskrift from "../skjema/oppsummering/OppsummeringForUtskrift";
import { Oppsummering } from "../../nav-soknad/redux/oppsummering/oppsummeringTypes";
import Vedleggsliste from "../../nav-soknad/components/vedlegg/Veleggsliste";
import { Kvittering } from "../../nav-soknad/types";
import { Undertittel } from "nav-frontend-typografi";
import VeienVidere from "./VeienVidere";
import { Side } from "../../nav-soknad/components/utskrift/Utskrift";

interface Props {
	kvittering: Kvittering;
	visVedlegg: boolean;
	oppsummering: Oppsummering;
}

const UtskriftKVittering: React.StatelessComponent<Props> = ({
	kvittering,
	oppsummering,
	visVedlegg
}) => (
	<div className="kvitteringsutskrift">
		<Side tittel="Søknad om økonomisk sosialhjelp">
			<p className="blokk-l">
				{kvittering.dato}, {kvittering.klokkeslett}. Behandlingsnummer:{" "}
				{kvittering.behandlingsId}.
			</p>
			<p className="blokk-l">
				<FormattedMessage id="kvittering.tekst.pre" />
				<strong> {kvittering.navenhet}</strong>
				<FormattedMessage id="kvittering.tekst.post" />
			</p>
			{visVedlegg && (
				<div>
					<Undertittel className="blokk-s">
						<FormattedMessage id="kvittering.vedlegg.tittel" />
					</Undertittel>
					<Vedleggsliste vedlegg={kvittering.ikkeInnsendteVedlegg} />
				</div>
			)}
		</Side>
		<Side>
			<VeienVidere />
		</Side>
		<Side tittel="Informasjon i søknaden">
			<OppsummeringForUtskrift oppsummering={oppsummering} />
		</Side>
	</div>
);

export default UtskriftKVittering;

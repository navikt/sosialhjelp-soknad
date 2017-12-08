import * as React from "react";
import { getFaktumPropertyVerdi } from "../../../nav-soknad/utils";
import Detaljeliste, { DetaljelisteElement } from "../../../nav-soknad/components/detaljeliste";
import { FormattedMessage } from "react-intl";
import { Faktum } from "../../../nav-soknad/types";

const ArbeidsforholdDetaljer: React.StatelessComponent<{arbeidsforhold: Faktum}> = ({ arbeidsforhold }) => {

	return (
		<li className="arbeidsgiverliste__arbeidsgiver">
			<Detaljeliste>
				<DetaljelisteElement
					tittel={
						<FormattedMessage id="opplysninger.arbeidsituasjon.arbeidsforhold.navn"/>
					}
					verdi={getFaktumPropertyVerdi(arbeidsforhold, "navn")}
				/>
				<DetaljelisteElement
					tittel={
						<FormattedMessage id="opplysninger.arbeidsituasjon.arbeidsforhold.startet"/>
					}
					verdi={getFaktumPropertyVerdi(arbeidsforhold, "startet")}
				/>
				<DetaljelisteElement
					tittel={
						<FormattedMessage id="opplysninger.arbeidsituasjon.arbeidsforhold.sluttet"/>
					}
					verdi={getFaktumPropertyVerdi(arbeidsforhold, "sluttet")}
				/>
				<DetaljelisteElement
					tittel={
						<FormattedMessage
							id="opplysninger.arbeidsituasjon.arbeidsforhold.stillingsprosent"/>
					}
					verdi={getFaktumPropertyVerdi(arbeidsforhold, "stillingsprosent")}
				/>
			</Detaljeliste>
		</li>
	);
};

export default ArbeidsforholdDetaljer;

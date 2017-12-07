import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import SysteminfoMedSkjema from "../../../nav-soknad/components/systeminfoMedSkjema";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import { finnFakta, getFaktumPropertyVerdi } from "../../../nav-soknad/utils";
import { State } from "../../redux/reducers";
import { connect } from "react-redux";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { Faktum } from "../../../nav-soknad/types";
import Detaljeliste, { DetaljelisteElement } from "../../../nav-soknad/components/detaljeliste";
import { FormattedMessage } from "react-intl";

const Arbeidsforhold: React.StatelessComponent<FaktumComponentProps> = ({fakta}) => {

	const alleArbeidsforhold: Faktum[] = finnFakta("opplysninger.arbeidsituasjon", fakta);

	return <SporsmalFaktum faktumKey="opplysninger.arbeidsituasjon">
		<SysteminfoMedSkjema>
			<fieldset className="skjema-fieldset">
				<legend id="tittel">
					<FormattedMessage id="opplysninger.arbeidsituasjon.arbeidsforhold.infotekst"/>
				</legend>
			</fieldset>

			<ul className={"arbeidsgiverliste"}>
				{alleArbeidsforhold && alleArbeidsforhold.length === 0 && (
					<FormattedMessage id="opplysninger.arbeidsituasjon.arbeidsforhold.ingen"/>
				)}
				{alleArbeidsforhold.map((arbeidsforhold: Faktum) =>
					(
						<li key={arbeidsforhold.faktumId} className="arbeidsgiverliste__arbeidsgiver">
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
										<FormattedMessage id="opplysninger.arbeidsituasjon.arbeidsforhold.stillingsprosent"/>
									}
									verdi={getFaktumPropertyVerdi(arbeidsforhold, "stillingsprosent")}
								/>
							</Detaljeliste>
						</li>
					)
				)}
			</ul>
			<TextareaFaktum faktumKey="opplysninger.arbeidsituasjon.kommentarer"/>
		</SysteminfoMedSkjema>
	</SporsmalFaktum>;
};

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data
	};
})(Arbeidsforhold);

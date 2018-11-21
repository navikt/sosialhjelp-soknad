import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import SysteminfoMedSkjema from "../../../nav-soknad/components/systeminfoMedSkjema";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import { finnFakta } from "../../../nav-soknad/utils";
import { State } from "../../redux/reducers";
import { connect } from "react-redux";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { Faktum } from "../../../nav-soknad/types";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import ArbeidsforholdDetaljer from "./ArbeidsforholdDetaljer";
import { getMaksLengdeFunc } from "../../../nav-soknad/validering/valideringer";

type Props = FaktumComponentProps & InjectedIntlProps;

const MAX_CHARS = 500;

const Arbeidsforhold: React.StatelessComponent<Props> = ({ fakta, intl }) => {
	const removeSecurityAddedArbeidsforhold = (af: any) => {
		return Object.getOwnPropertyNames(af.properties).length > 0;
	};
	const alleArbeidsforhold: Faktum[] = finnFakta("arbeidsforhold", fakta).filter(removeSecurityAddedArbeidsforhold);

	return <SporsmalFaktum faktumKey="arbeidsforhold" style="system">
		<SysteminfoMedSkjema>
			<div className="skjema-sporsmal__tittel">
				<FormattedMessage id="arbeidsforhold.infotekst"/>
			</div>
			{(alleArbeidsforhold == null || alleArbeidsforhold.length === 0) && (
				<p>
					<FormattedMessage id="arbeidsforhold.ingen"/>
				</p>
			)}
			{alleArbeidsforhold && alleArbeidsforhold.length > 0 && (
				<ul className={"arbeidsgiverliste"}>
					{alleArbeidsforhold.map((arbeidsforhold: Faktum) =>
						<li key={arbeidsforhold.faktumId} className="arbeidsgiverliste__arbeidsgiver">
							<ArbeidsforholdDetaljer
								arbeidsforhold={arbeidsforhold}
							/>
						</li>
					)}
				</ul>
			)}
			<TextareaFaktum
				id="opplysninger_arbeidsituasjon_kommentarer"
				faktumKey="opplysninger.arbeidsituasjon.kommentarer"
				placeholder={intl.formatMessage({
					id: "arbeidsforhold.kommentar.placeholder"
				})}
				maxLength={MAX_CHARS}
				validerFunc={[getMaksLengdeFunc(MAX_CHARS)]}
			/>
		</SysteminfoMedSkjema>
	</SporsmalFaktum>;
};

export default connect((state: State, {}) => {
	return {
		fakta: state.fakta.data
	};
})(injectIntl(Arbeidsforhold));

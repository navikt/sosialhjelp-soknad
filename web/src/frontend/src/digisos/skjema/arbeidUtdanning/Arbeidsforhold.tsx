import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import SysteminfoMedSkjema from "../../../nav-soknad/components/systeminfoMedSkjema";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import { finnFakta } from "../../../nav-soknad/utils";
import { State } from "../../redux/reducers";
import { connect } from "react-redux";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { Faktum } from "../../../nav-soknad/types";
import { FormattedMessage } from "react-intl";
import ArbeidsforholdDetaljer from "./ArbeidsforholdDetaljer";
import { FeatureToggles } from "../../../featureToggles";

interface StateProps {
	visArbeidsforhold: boolean;
}

const Arbeidsforhold: React.StatelessComponent<FaktumComponentProps & StateProps> = ({ fakta, visArbeidsforhold }) => {

	if (!visArbeidsforhold) {
		return <div />;
	}

	const alleArbeidsforhold: Faktum[] = finnFakta("arbeidsforhold", fakta);

	return <SporsmalFaktum faktumKey="opplysninger.arbeidsituasjon" style="system">
		<SysteminfoMedSkjema>
			<h4 className="skjema-sporsmal__infotekst__tittel">
				<FormattedMessage id="arbeidsforhold.infotekst"/>
			</h4>
			{alleArbeidsforhold && alleArbeidsforhold.length === 0 && (
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
			<TextareaFaktum faktumKey="opplysninger.arbeidsituasjon.kommentarer"/>
		</SysteminfoMedSkjema>
	</SporsmalFaktum>;
};

export default connect((state: State, {}) => {
	return {
		fakta: state.fakta.data,
		visArbeidsforhold:
		state.featuretoggles.data[FeatureToggles.arbeidsforhold] === "true",
	};
})(Arbeidsforhold);

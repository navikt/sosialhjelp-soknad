import * as React from "react";
import "./sporsmal.css";
import Skjemapanel from "../skjemapanel";
<<<<<<< HEAD:web/src/frontend/src/nav-skjema/components/sporsmal/index.tsx
import HjelpetekstFaktum from "../../faktum/HjelpetekstFaktum";
=======
import FaktumHjelpetekst from "../../faktum/FaktumHjelpetekst";
>>>>>>> master:web/src/frontend/src/skjema/components/sporsmal/index.tsx
import { getIntlInfoTekst } from "../../utils";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";

interface Props extends React.Props<any> {
	sporsmalId: string;
	beskrivelseId?: string;
	hjelpetekstId?: string;
}

const Sporsmal: React.StatelessComponent<Props & InjectedIntlProps> = ({
	children,
	sporsmalId,
	beskrivelseId,
	hjelpetekstId,
	intl
}) => {
	const beskrivelse = getIntlInfoTekst(intl, beskrivelseId);
	const hjelpetekst = getIntlInfoTekst(intl, hjelpetekstId);
	return (
		<div className="skjema-sporsmal">
			<Skjemapanel>
				<fieldset className="skjema-fieldset">
					<legend>
						<FormattedMessage id={sporsmalId} />
					</legend>
					{hjelpetekst ? (
						<div className="skjema-sporsmal__hjelpetekst">
							<HjelpetekstFaktum hjelpetekstId={hjelpetekstId} />
						</div>
					) : null}
					<div className="skjema-sporsmal__innhold">
						{beskrivelse ? (
							<p className="skjema-sporsmal__beskrivelse">
								{intl.formatHTMLMessage({ id: beskrivelseId })}
							</p>
						) : null}
						{children}
					</div>
				</fieldset>
			</Skjemapanel>
		</div>
	);
};

export default injectIntl(Sporsmal);

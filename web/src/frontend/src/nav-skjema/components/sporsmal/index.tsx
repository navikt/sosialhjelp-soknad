import * as React from "react";
import "./sporsmal.css";
import { HjelpetekstAuto } from "nav-frontend-hjelpetekst";
import Skjemapanel from "../skjemapanel";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";

interface Props extends React.Props<any> {
	sporsmalId: string;
	beskrivelseId?: string;
	hjelpetekst?: string;
}

const Sporsmal: React.StatelessComponent<Props & InjectedIntlProps> = ({
	children,
	sporsmalId,
	beskrivelseId,
	hjelpetekst,
	intl
}) => {
	return (
		<div className="skjema-sporsmal">
			<Skjemapanel>
				<fieldset className="skjema-fieldset">
					<legend>
						<FormattedMessage id={sporsmalId} />
					</legend>
					{hjelpetekst ? (
						<div className="skjema-sporsmal__hjelpetekst">
							<HjelpetekstAuto>{hjelpetekst}</HjelpetekstAuto>
						</div>
					) : null}
					<div className="skjema-sporsmal__innhold">
						{beskrivelseId ? (
							<p className="skjema-sporsmal__beskrivelse">
								{intl.formatMessage({ id: beskrivelseId })}
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

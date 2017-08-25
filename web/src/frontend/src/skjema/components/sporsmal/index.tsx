import * as React from "react";
import "./sporsmal.css";
import { HjelpetekstAuto } from "nav-frontend-hjelpetekst";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";

interface Props extends React.Props<any> {
	sporsmalId: string;
	hjelpetekst?: string;
}

const Sporsmal: React.StatelessComponent<Props & InjectedIntlProps> = ({
	children,
	sporsmalId,
	hjelpetekst,
	intl
}) => {
	return (
		<div className="skjema-sporsmal">
			<fieldset>
				<legend>
					<FormattedMessage id={sporsmalId} />
				</legend>
				{hjelpetekst
					? <div className="skjema-sporsmal__hjelpetekst">
							<HjelpetekstAuto>
								{hjelpetekst}
							</HjelpetekstAuto>
						</div>
					: null}
				<div className="skjema-sporsmal__innhold">
					{children}
				</div>
			</fieldset>
		</div>
	);
};

export default injectIntl(Sporsmal);

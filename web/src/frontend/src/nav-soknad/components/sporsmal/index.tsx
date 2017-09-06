import * as React from "react";
import "./sporsmal.css";
import Skjemapanel from "../skjemapanel";
import { Infotekst } from "../../redux/types";
import { HjelpetekstAuto } from "nav-frontend-hjelpetekst";
import { Undertittel } from "nav-frontend-typografi";

interface Props extends React.Props<any> {
	sporsmal: string;
	info?: Infotekst;
	hjelpetekst?: Infotekst;
	feil?: string;
}

const SporsmalBeskrivelse: React.StatelessComponent<{ info: Infotekst }> = ({
	info
}) => {
	if (!info) {
		return null;
	}
	return (
		<div className="nav-soknad-sporsmal__beskrivelse">
			{info.tittel ? <Undertittel>{info.tittel}</Undertittel> : null}
			<p className="skjema-sporsmal__beskrivelse">{info.tekst}</p>
		</div>
	);
};

const Sporsmal: React.StatelessComponent<Props> = ({
	children,
	sporsmal,
	info,
	hjelpetekst
}) => {
	return (
		<div className="skjema-sporsmal">
			<Skjemapanel>
				<fieldset className="skjema-fieldset">
					<legend>{sporsmal}</legend>
					{hjelpetekst ? (
						<div className="skjema-sporsmal__hjelpetekst">
							<HjelpetekstAuto tittel={hjelpetekst.tittel}>
								{hjelpetekst.tekst}
							</HjelpetekstAuto>
						</div>
					) : null}
					<div className="skjema-sporsmal__innhold">
						<SporsmalBeskrivelse info={info} />
						{children}
					</div>
				</fieldset>
			</Skjemapanel>
		</div>
	);
};

export default Sporsmal;

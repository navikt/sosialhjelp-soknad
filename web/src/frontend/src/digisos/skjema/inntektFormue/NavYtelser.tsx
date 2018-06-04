import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import SysteminfoMedSkjema from "../../../nav-soknad/components/systeminfoMedSkjema/index";
import { finnFakta, getFaktumPropertyVerdi } from "../../../nav-soknad/utils/faktumUtils";
import { Faktum } from "../../../nav-soknad/types/navSoknadTypes";

class NavYtelser extends React.Component<FaktumComponentProps, {}> {

	renderUtbetalinger(utbetalinger: Faktum[]) {
		if (utbetalinger == null || utbetalinger.length === 0) {
			return <FormattedMessage id="utbetalinger.ingen.true"/>;
		}

		const utbetaltMelding = <span> / <FormattedMessage id="utbetalinger.utbetaling.erutbetalt.label"/></span>;

		return utbetalinger.map(utbetaling => {
			const id = getFaktumPropertyVerdi(utbetaling, "id");
			const type = getFaktumPropertyVerdi(utbetaling, "type");
			const dato = getFaktumPropertyVerdi(utbetaling, "utbetalingsDato");
			const utbetalt = getFaktumPropertyVerdi(utbetaling, "netto");
			const erUtbetalt = getFaktumPropertyVerdi(utbetaling, "erUtbetalt");
			return (
				<div key={id} className="utbetaling blokk-s">
					<div>{type}</div>
					<div>{dato}{erUtbetalt === "true" && utbetaltMelding}</div>
					<div className="verdi detaljeliste__verdi">{utbetalt}</div>
				</div>
			);
		});
	}

	render() {
		const {fakta} = this.props;
		const utbetalinger = finnFakta("utbetalinger.utbetaling", fakta);
		return (
			<SporsmalFaktum faktumKey="navytelser" style="system">
				<SysteminfoMedSkjema>
					<h4 className="skjema-sporsmal__infotekst__tittel">
						<FormattedMessage id="utbetalinger.sporsmal"/>
					</h4>
					<div className="utbetalinger">
						{this.renderUtbetalinger(utbetalinger)}
						<FormattedHTMLMessage id="utbetalinger.infotekst.tekst"/>
					</div>
				</SysteminfoMedSkjema>
			</SporsmalFaktum>
		);
	}
}

export default NavYtelser;

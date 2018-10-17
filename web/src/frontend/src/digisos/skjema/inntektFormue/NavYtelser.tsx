import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import SysteminfoMedSkjema from "../../../nav-soknad/components/systeminfoMedSkjema/index";
import { finnFakta, getFaktumPropertyVerdi } from "../../../nav-soknad/utils/faktumUtils";
import { Faktum } from "../../../nav-soknad/types/navSoknadTypes";
import {finnFaktum} from "../../../nav-soknad/utils";

class NavYtelser extends React.Component<FaktumComponentProps, {}> {

	renderUtbetalinger(utbetalinger: Faktum[]) {
		if (utbetalinger == null || utbetalinger.length === 0) {
			return <FormattedMessage id="utbetalinger.ingen.true"/>;
		}

		const utbetaltMelding = <span><FormattedMessage id="utbetalinger.utbetaling.erutbetalt.label"/></span>;

		return utbetalinger.map(utbetaling => {
			const id = getFaktumPropertyVerdi(utbetaling, "id");
			const type = getFaktumPropertyVerdi(utbetaling, "type");
			const dato = getFaktumPropertyVerdi(utbetaling, "utbetalingsDato");

			const aar = dato.slice(0, 4);
			const maaned = dato.slice(5, 7);
			const dag = dato.slice(8);

			const belop = getFaktumPropertyVerdi(utbetaling, "netto");

			return (
				<div key={id} className="utbetaling blokk-s">
					<div>{type}<span className="verdi detaljeliste__verdi">{belop}</span></div>
					<div>{utbetaltMelding} {dag}.{maaned}.{aar}</div>
				</div>
			);
		});
	}

	render() {
		const {fakta} = this.props;
		const utbetalinger = finnFakta("utbetalinger.utbetaling", fakta);
		const harUtbetalinger: boolean = utbetalinger && utbetalinger.length > 0;

		const utbetalingerFeilet: Faktum = finnFaktum("utbetalinger.feilet", fakta);
		const VALUE = "value";

		if (utbetalingerFeilet && utbetalingerFeilet[VALUE] !== "true") {
			return (

				<SporsmalFaktum faktumKey="navytelser" style="system" className="luftUnderFemRem">
					<SysteminfoMedSkjema>
						<h4 className="skjema-sporsmal__infotekst__tittel">
							<FormattedMessage id="utbetalinger.sporsmal"/>
						</h4>
						<div className="utbetalinger">
							{this.renderUtbetalinger(utbetalinger)}

							{ harUtbetalinger && (
								<FormattedHTMLMessage id="utbetalinger.infotekst.tekst"/>
							)}

						</div>
					</SysteminfoMedSkjema>
				</SporsmalFaktum>

			);
		} else {
			return null;
		}
	}
}

export default NavYtelser;

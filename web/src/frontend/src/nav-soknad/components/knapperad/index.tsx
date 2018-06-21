import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getIntlTextOrKey } from "../../utils/intlUtils";
import { Knapp } from "nav-frontend-knapper";

interface Props {
	gaViderePending?: boolean;
	gaVidereLabel?: string;
	gaVidere?: () => void;
	gaTilbake?: () => void;
	avbryt?: () => void;
}

class SkjemaKnapperad extends React.Component<Props & InjectedIntlProps, {}> {
	render() {
		const { gaVidere, gaTilbake, avbryt, gaVidereLabel, intl } = this.props;
		return (
			<div className="skjema-knapperad ikke-juridisk-tekst">
				<Knapp
					id="gaa_videre_button"
					type="hoved"
					htmlType="button"
					onClick={gaVidere}
					spinner={this.props.gaViderePending}
				>
					{gaVidereLabel
						? gaVidereLabel
						: getIntlTextOrKey(intl, "skjema.knapper.gaavidere")}
				</Knapp>
				<Knapp
					id="gaa_tilbake_button"
					type="standard"
					htmlType="button"
					onClick={gaTilbake}
					disabled={this.props.gaViderePending || !this.props.gaTilbake}
				>
					{getIntlTextOrKey(intl, "skjema.knapper.tilbake")}
				</Knapp>
				<a
					id="avbryt_link"
					href="#"
					className="lenke"
					onClick={this.props.gaViderePending ? null : avbryt}
				>
					{getIntlTextOrKey(intl, "skjema.knapper.avbryt")}
				</a>
			</div>
		);
	}
}

export default injectIntl(SkjemaKnapperad);

import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getIntlTextOrKey } from "../../utils/intlUtils";
import {Flatknapp, Hovedknapp, Knapp} from "nav-frontend-knapper";

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
				<Hovedknapp
					id="gaa_videre_button"
					htmlType="button"
					onClick={gaVidere}
					spinner={this.props.gaViderePending}
					disabled={this.props.gaViderePending}
				>
					{gaVidereLabel
						? gaVidereLabel
						: getIntlTextOrKey(intl, "skjema.knapper.gaavidere")}
				</Hovedknapp>
				<Knapp
					id="gaa_tilbake_button"
					htmlType="button"
					onClick={gaTilbake}
					disabled={this.props.gaViderePending || !this.props.gaTilbake}
				>
					{getIntlTextOrKey(intl, "skjema.knapper.tilbake")}
				</Knapp>
				{/*<span id="avbryt_link">*/}
					<Flatknapp
						className="lenke"
						onClick={this.props.gaViderePending ? undefined : avbryt}
					>
						{getIntlTextOrKey(intl, "skjema.knapper.avbryt")}
					</Flatknapp>
				{/*</span>*/}
			</div>
		);
	}
}

export default injectIntl(SkjemaKnapperad);

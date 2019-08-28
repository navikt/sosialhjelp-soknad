import * as React from "react";
import { getIntlTextOrKey } from "../../utils/intlUtils";
import {Flatknapp, Hovedknapp, Knapp} from "nav-frontend-knapper";
import {useIntl} from "react-intl";

interface Props {
	gaViderePending?: boolean;
	gaVidereLabel?: string;
	gaVidere?: () => void;
	gaTilbake?: () => void;
	avbryt?: () => void;
}

class SkjemaKnapperad extends React.Component<Props, {}> {
	render() {
		const { gaVidere, gaTilbake, avbryt, gaVidereLabel } = this.props;
		const intl = useIntl();
		return (
			<div className="skjema-knapperad ikke-juridisk-tekst">
				<Hovedknapp
					id="gaa_videre_button"
					htmlType="button"
					onClick={gaVidere}
					spinner={this.props.gaViderePending}
					disabled={this.props.gaViderePending}
					type="hoved"
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
					type="hoved"
				>
					{getIntlTextOrKey(intl, "skjema.knapper.tilbake")}
				</Knapp>
				<Flatknapp
					onClick={this.props.gaViderePending ? undefined : avbryt}
					type="flat"
				>
					{getIntlTextOrKey(intl, "skjema.knapper.avbryt")}
				</Flatknapp>
			</div>
		);
	}
}

export default SkjemaKnapperad;

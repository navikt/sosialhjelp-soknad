import * as React from "react";
import SysteminfoMedSkjema from "../components/systeminfoMedSkjema";
import { injectIntl, InjectedIntlProps } from "react-intl";
import {
	faktumComponent,
	InjectedFaktumComponentProps
} from "./FaktumComponent";

/** Navn på property som setter om bruker ønsker å endre verdien
 * fra system for denne søknaden eller ikke. Settes til strengen "true"
 * dersom bruker ønsker å overstyre. Tom tekststreng dersom ikke.
 */

const VALGT_VERDI = "true";
const IKKE_VALGT_VERDI = "";

interface OwnProps {
	/** Skjema som viser når bruker ønsker å endre verdier */
	skjema?: React.ReactNode;
	/** Informasjonen som er hentet opp fra system */
	children?: React.ReactNode;
	/** Label - endre knapp */
	endreLabel?: string;
	/** Label - avbryt endring knapp */
	avbrytLabel?: string;
}

type Props = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

class SysteminfoFaktum extends React.Component<Props, {}> {
	render() {
		const { endreLabel, avbrytLabel, intl } = this.props;
		const skjemaErSynlig = this.props.getFaktumVerdi() === VALGT_VERDI;
		return (
			<SysteminfoMedSkjema
				{...this.props}
				skjemaErSynlig={skjemaErSynlig}
				onVisSkjema={() => this.props.setFaktumVerdiOgLagre(VALGT_VERDI)}
				onSkjulSkjema={() => this.props.setFaktumVerdiOgLagre(IKKE_VALGT_VERDI)}
				endreLabel={
					endreLabel ||
					intl.formatMessage({
						id: "systeminfo.avbrytendringknapp.label"
					})
				}
				avbrytLabel={
					avbrytLabel ||
					intl.formatMessage({
						id: "systeminfo.avbrytendringknapp.label"
					})
				}
			/>
		);
	}
}

export default injectIntl(faktumComponent()(SysteminfoFaktum));

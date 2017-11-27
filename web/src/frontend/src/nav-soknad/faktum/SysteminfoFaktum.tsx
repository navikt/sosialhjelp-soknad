import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import Lenkeknapp from "../components/lenkeknapp/Lenkeknapp";
import Underskjema from "../components/underskjema";
import {
	faktumComponent,
	InjectedFaktumComponentProps
} from "./FaktumComponent";

/** Navn på property som setter om bruker ønsker å endre verdien
 * fra system for denne søknaden eller ikke. Settes til strengen "true"
 * dersom bruker ønsker å overstyre. Tom tekststreng dersom ikke.
 */

const FAKTUMPROPERTY = "brukerendret";
const PROPERTY_VALGT_VERDI = "true";
const PROPERTY_IKKE_VALGT_VERDI = "";

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

class SysteminfoFaktum extends React.Component<
	OwnProps & InjectedFaktumComponentProps & InjectedIntlProps,
	{}
> {
	render() {
		const { intl, children, endreLabel, avbrytLabel, skjema } = this.props;
		const skjemaErSynlig =
			this.props.getPropertyVerdi() === PROPERTY_VALGT_VERDI;
		return (
			<Underskjema
				arrow={false}
				visible={true}
				collapsable={false}
				style="system"
			>
				<div className="blokk-xxs">{children}</div>

				{skjema && (
					<div className="blokk-xxs">
						{!skjemaErSynlig && (
							<Lenkeknapp
								label={
									endreLabel ||
									intl.formatMessage({ id: "systeminfo.endreknapp.label" })
								}
								onClick={() =>
									this.props.setFaktumVerdi(
										PROPERTY_VALGT_VERDI,
										this.props.property
									)
								}
							/>
						)}
						{skjemaErSynlig && (
							<div>
								<div className="systeminfo_endreSkjema">{skjema}</div>
								<div className="blokk-xxs">
									<Lenkeknapp
										label={
											avbrytLabel ||
											intl.formatMessage({
												id: "systeminfo.avbrytendringknapp.label"
											})
										}
										onClick={() =>
											this.props.setFaktumVerdi(
												PROPERTY_IKKE_VALGT_VERDI,
												this.props.property
											)
										}
									/>
								</div>
							</div>
						)}
					</div>
				)}
			</Underskjema>
		);
	}
}

export default injectIntl(
	faktumComponent({ property: FAKTUMPROPERTY })(SysteminfoFaktum)
);

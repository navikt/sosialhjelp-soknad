import * as React from "react";
import { findDOMNode } from "react-dom";
import { injectIntl, InjectedIntlProps } from "react-intl";
import Lenkeknapp from "../components/lenkeknapp/Lenkeknapp";
import Underskjema from "../components/underskjema";
import {
	faktumComponent,
	InjectedFaktumComponentProps
} from "./FaktumComponent";
import { focusOnFirstElement } from "../utils/domUtils";

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

type Props = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

class SysteminfoFaktum extends React.Component<Props, {}> {
	skjema: HTMLElement;
	visSkjemaKnapp: Lenkeknapp;
	constructor(props: Props) {
		super(props);
		this.visSkjema = this.visSkjema.bind(this);
		this.skjulSkjema = this.skjulSkjema.bind(this);
	}

	visSkjema() {
		this.props.setFaktumVerdiOgLagre(PROPERTY_VALGT_VERDI, this.props.property);
		/** Setter fokus på første element i skjemaet etter at bruker har valgt å endre */
		setTimeout(() => {
			focusOnFirstElement(this.skjema);
		}, 0);
	}

	skjulSkjema() {
		this.props.setFaktumVerdi(PROPERTY_IKKE_VALGT_VERDI, this.props.property);
		/** Setter fokus tilbake på endre-knapp etter at bruker har avbrutt endring */
		setTimeout(() => {
			(findDOMNode(this.visSkjemaKnapp) as HTMLElement).focus();
		}, 0);
	}

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
								ref={c => (this.visSkjemaKnapp = c)}
								label={
									endreLabel ||
									intl.formatMessage({ id: "systeminfo.endreknapp.label" })
								}
								onClick={() => this.visSkjema()}
							/>
						)}
						{skjemaErSynlig && (
							<div>
								<div
									className="systeminfo_endreSkjema"
									ref={c => (this.skjema = c)}
								>
									{skjema}
								</div>
								<div className="blokk-xxs">
									<Lenkeknapp
										label={
											avbrytLabel ||
											intl.formatMessage({
												id: "systeminfo.avbrytendringknapp.label"
											})
										}
										onClick={() => this.skjulSkjema()}
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

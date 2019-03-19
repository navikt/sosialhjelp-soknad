import * as React from "react";
import { Select } from "nav-frontend-skjema";
import { getIntlTextOrKey } from "../../../../nav-soknad/utils";
import { InjectedIntlProps, injectIntl } from "react-intl";
import Underskjema from "../../../../nav-soknad/components/underskjema";
import { NavEnhet } from "./AdresseTypes";

interface OwnProps {
	navEnheter: NavEnhet[];
	label?: string;
	visible: boolean;
	ikkeVisPanel?: boolean;
	onVelgSoknadsmottaker: (soknadsmottaker: NavEnhet) => void;
}

type Props = OwnProps & InjectedIntlProps;

class SoknadsmottakerVelger extends React.Component<Props,{}> {

	velgNavKontor(event: any) {
		this.props.navEnheter.map((soknadsmottaker: NavEnhet) => {
			if (event.target.value === soknadsmottaker.orgnr) {
				this.props.onVelgSoknadsmottaker(soknadsmottaker)
			}
		});
	}

	render() {
		const {navEnheter, ikkeVisPanel} = this.props;
		let orgnr = "velg";
		if (navEnheter) {
			navEnheter.map((soknadsmottaker: NavEnhet) => {
				if (soknadsmottaker.valgt) {
					orgnr = soknadsmottaker.orgnr;
				}
			});
		}

		const renderedSelect = (
			<Select
				className="velgNavKontorDropDown"
				label={this.props.label || ""}
				onChange={(event: any) => this.velgNavKontor(event)}
				value={orgnr}
			>
				<option value="velg" key="velg" disabled={true}>
					{getIntlTextOrKey(this.props.intl, "kontakt.system.oppholdsadresse.velgMottaker")}
				</option>
				{navEnheter.map((soknadsmottaker: NavEnhet, index: number) => {
					return (
						<option value={soknadsmottaker.orgnr} key={index}>
							{soknadsmottaker.enhetsnavn}
						</option>
					);
				})}
			</Select>);
		if (ikkeVisPanel === true) {
			return renderedSelect;
		} else {
			return (
				<div className="skjema-sporsmal--jaNeiSporsmal">
					<Underskjema
						visible={this.props.visible}
						collapsable={true}
					>
						<div className="utvidetAddresseSok">
							{renderedSelect}
						</div>
					</Underskjema>
				</div>
			);
		}
	}
}

export default injectIntl(SoknadsmottakerVelger);

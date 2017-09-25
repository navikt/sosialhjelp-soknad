import * as React from "react";
import { RouterProps, withRouter } from "react-router";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Location } from "history";
import { connect } from "react-redux";
import NavFrontendSpinner from "nav-frontend-spinner";

import StegIndikator from "../components/stegIndikator";
import Knapperad from "../components/knapperad";
import { SkjemaConfig, SkjemaStegType } from "../soknadTypes";
import { DispatchProps, Faktum } from "../redux/faktaTypes";
import { SoknadAppState } from "../redux/faktaReducer";
import {
	clearFaktaValideringsfeil,
	setFaktaValideringsfeil
} from "../redux/valideringActions";
import { FaktumValideringsregler } from "../validering/types";
import { validerAlleFaktum } from "../validering/utils";
import { gaTilbake, gaVidere, avbryt } from "../utils";

const stopEvent = (evt: React.FormEvent<any>) => {
	evt.stopPropagation();
	evt.preventDefault();
};

interface OwnProps {
	fakta: Faktum[];
	valideringer: FaktumValideringsregler[];
	skjemaConfig: SkjemaConfig;
	aktivtSteg: number;
	brukerBehandlingId: string;
	pending: boolean;
	match: any;
	location: Location;
}
type Props = OwnProps & RouterProps & InjectedIntlProps & DispatchProps;

class StegMedNavigasjon extends React.Component<
	OwnProps & RouterProps & InjectedIntlProps & DispatchProps,
	{}
> {
	constructor(props: Props) {
		super(props);
		this.handleGaVidere = this.handleGaVidere.bind(this);
	}

	handleGaVidere(aktivtSteg: number, brukerBehandlingId: string) {
		if (aktivtSteg === 9) {
			this.props.history.push("/kvittering");
			return;
		}

		const valideringsfeil = validerAlleFaktum(
			this.props.fakta,
			this.props.valideringer
		);
		if (valideringsfeil.length === 0) {
			this.props.dispatch(clearFaktaValideringsfeil());
			gaVidere(
				aktivtSteg,
				brukerBehandlingId,
				this.props.history,
				this.props.skjemaConfig
			);
		} else {
			this.props.dispatch(setFaktaValideringsfeil(valideringsfeil));
		}
	}

	handleGaTilbake(aktivtSteg: number, brukerBehandlingId: string) {
		this.props.dispatch(clearFaktaValideringsfeil());
		gaTilbake(
			aktivtSteg,
			brukerBehandlingId,
			this.props.history,
			this.props.skjemaConfig
		);
	}

	render() {
		const {
			aktivtSteg,
			brukerBehandlingId,
			skjemaConfig,
			pending,
			intl,
			children
		} = this.props;
		if (pending) {
			return (
				<div className="application-spinner">
					<NavFrontendSpinner storrelse="xxl" />
				</div>
			);
		} else {
			const aktivtStegInfo = skjemaConfig.steg.find(
				s => s.stegnummer === this.props.aktivtSteg
			);
			const erOppsummering =
				aktivtStegInfo.type === SkjemaStegType.oppsummering;
			return (
				<form id="soknadsskjema" onSubmit={stopEvent}>
					{!erOppsummering ? (
						<div className="skjema__stegindikator">
							<StegIndikator
								aktivtSteg={aktivtSteg}
								steg={skjemaConfig.steg.map(steg => ({
									tittel: intl.formatMessage({ id: steg.cmskey })
								}))}
							/>
						</div>
					) : null}
					{children}
					<Knapperad
						gaVidereLabel={erOppsummering ? "Send søknad" : undefined}
						gaVidere={() => this.handleGaVidere(aktivtSteg, brukerBehandlingId)}
						gaTilbake={() =>
							this.handleGaTilbake(aktivtSteg, brukerBehandlingId)}
						avbryt={() => avbryt(skjemaConfig)}
					/>
				</form>
			);
		}
	}
}

export default connect((state: SoknadAppState, props: any) => {
	return {
		fakta: state.fakta.data,
		valideringer: state.validering.valideringsregler
	};
})(injectIntl(withRouter(StegMedNavigasjon)));

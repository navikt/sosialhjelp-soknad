import * as React from "react";
import { connect } from "react-redux";
import * as classNames from "classnames";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { SkjemaGruppe, Feil } from "nav-frontend-skjema";
import { HjelpetekstAuto } from "nav-frontend-hjelpetekst";
import { getFaktumSporsmalTekst } from "../utils";
import { DispatchProps } from "../redux/faktaTypes";
import { SoknadAppState } from "../redux/faktaReducer";
import {
	withFaktumValidering,
	FaktumValideringProps
} from "./FaktumValideringComponent";

export interface OwnProps extends FaktumValideringProps {
	children: React.ReactNode;
	visible?: boolean;
	renderValideringsfeil?: boolean;
}

interface StateProps {
	feil?: Feil;
}

type Props = OwnProps & StateProps & InjectedIntlProps & DispatchProps;

class SporsmalFaktum extends React.Component<Props, {}> {
	static defaultProps: any = {
		renderValideringsfeil: true
	};

	render() {
		const { visible, faktumKey, feil, intl, children } = this.props;
		if (visible === false) {
			return null;
		}
		const tekster = getFaktumSporsmalTekst(intl, faktumKey);
		const cls = classNames("skjema-fieldset", {
			"skjema-fieldset--harFeil": feil !== null && feil !== undefined
		});
		return (
			<div className="skjema-sporsmal">
				<SkjemaGruppe feil={feil}>
					<fieldset className={cls}>
						<legend>{tekster.sporsmal}</legend>
						{tekster.hjelpetekst ? (
							<div className="skjema-sporsmal__hjelpetekst">
								<HjelpetekstAuto tittel={tekster.hjelpetekst.tittel}>
									{tekster.hjelpetekst.tekst}
								</HjelpetekstAuto>
							</div>
						) : null}
						<div className="skjema-sporsmal__innhold">{children}</div>
					</fieldset>
				</SkjemaGruppe>
			</div>
		);
	}
}

export default connect<
	StateProps,
	{},
	OwnProps
>((state: SoknadAppState, props: OwnProps): StateProps => {
	const feil = state.validering.feil.find(f => f.faktumKey === props.faktumKey);
	return {
		feil: props.renderValideringsfeil && feil ? feil.feil : null
	};
})(injectIntl(withFaktumValidering()(SporsmalFaktum)));

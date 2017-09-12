import * as React from "react";
import { connect } from "react-redux";
import * as classNames from "classnames";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { SkjemaGruppe, Feil } from "nav-frontend-skjema";
import { HjelpetekstAuto } from "nav-frontend-hjelpetekst";
import { getFaktumSporsmalTekst } from "../utils";
import {
	registerFaktumValidering,
	unregisterFaktumValidering
} from "../redux/valideringActions";
import { DispatchProps } from "../redux/faktaTypes";
import { FaktumValidering } from "../validering/types";
import { SoknadAppState } from "../redux/faktaReducer";

export interface OwnProps {
	faktumKey: string;
	children: React.ReactNode;
	visible?: boolean;
	valideringer?: FaktumValidering[];
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

	componentWillMount() {
		if (this.props.valideringer) {
			this.props.dispatch(
				registerFaktumValidering({
					faktumKey: this.props.faktumKey,
					valideringer: this.props.valideringer
				})
			);
		}
	}

	componentWillUnmount() {
		this.props.dispatch(unregisterFaktumValidering(this.props.faktumKey));
	}

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
})(injectIntl(SporsmalFaktum));

import * as React from "react";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { DispatchProps } from "../../../../nav-soknad/redux/reduxTypes";
import { lesBankinfoAction, oppdaterBankinfoAction } from "./bankinfoReducer";
import { connect } from "react-redux";
import { State } from "../../../redux/reducers";
import { Input } from "nav-frontend-skjema";

interface OwnProps {
	kontonummer?: string | null;
}

interface BankinformasjonState {
	verdi: string;
}

type Props = OwnProps & DispatchProps;

class Bankinformasjon extends React.Component<Props, BankinformasjonState> {

	constructor(props: Props) {
		super(props);
		this.state = {
			verdi: this.props.kontonummer ? this.props.kontonummer : ""
		}
	}

	componentDidMount(): void {
		this.props.dispatch(lesBankinfoAction());
	}

	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<BankinformasjonState>, snapshot?: any): void {
		if (prevProps.kontonummer !== this.props.kontonummer && this.props.kontonummer !== null) {
			this.setState({verdi: this.props.kontonummer})
		}
	}

	onChange(verdi: string) {
		this.setState({verdi})
	}

	// Work-in-progress: Trenger en valideringsfunksjon for å sjekke at kontonummer er gyldig
	// checkDigit11(n: string, x: number): number {
	// 	let l = n.length, i = 0, j = (l%8), v = 0;
	// 	for(i = 0, l = l-1; i < l; i++) {
	// 		v += parseInt(n[i], 10) * j;
	// 		j = (j === 2) ? 9 : --j;
	// 	}
	// 	return v = (v%11 < 2) ? (x || 0) : (11 - (v%11));
	// };

	lagreDersomGyldig() {
		console.warn("Debug: Lagre dersom gyldig: ");
		// TODO Valider
		this.props.dispatch(oppdaterBankinfoAction(this.state.verdi));
	}

	render() {
		let {kontonummer} = this.props;
		if (!kontonummer) {
			kontonummer = "";
		}
		return (
			<Sporsmal tekster={{sporsmal: "Kontonummer"}}>
				<p>
					<b> Test av ny bankinfo komponent utenfor faktumtreet. {this.props.kontonummer}</b>
				</p>
				<div>
					<Input
						id="bankinfo_konto"
						className={"input--xxl faktumInput " }
						// type={type}
						autoComplete="off"
						name={name}
						// disabled={disabled}
						value={this.state.verdi}
						onChange={(evt: any) => this.onChange(evt.target.value) }
						onBlur={() => this.lagreDersomGyldig()}
						label={"Kontonummer (11 siffer)"}
						// feil={this.props.getFeil(intl)}
						maxLength={13}
						bredde={"S"}
						// pattern={pattern}
						// required={required}
						// step={step}
						noValidate={
							true /* Unngå at nettleser validerer og evt. fjerner verdien */
						}
					/>
				</div>
			</Sporsmal>
		);
	}

}

const mapStateToProps = (state: State) => ({
	kontonummer: state.bankinfo.verdi
});

export default connect<{}, {}, OwnProps>(
	mapStateToProps
)(Bankinformasjon);

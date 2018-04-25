import * as React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import Knapp from "nav-frontend-knapper";
import { Select } from "nav-frontend-skjema";
import Arrow from "../../nav-soknad/components/svg/Arrow";
import { getNavEnhet, finnBydeler, NavEnhet, alleKommuner } from "../data/kommuner";
import { getIntlTextOrKey } from "../../nav-soknad/utils/intlUtils";
import { REST_STATUS } from "../../nav-soknad/types";

interface StateProps {
	kommuneId: string;
	bydelId: string;
}

interface OwnProps {
	onStartSoknad: (kommuneId: string, bydelId: string) => void;
	startSoknadPending: boolean;
	kommuner: NavEnhet[];
	kommunerRestStatus: REST_STATUS;
}

type Props = OwnProps & InjectedIntlProps;

const getDefaultState = () => ({
	kommuneId: "",
	bydelId: ""
});

class Bosted extends React.Component<Props, StateProps> {
	constructor(props: any) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = getDefaultState();
	}

	componentWillUnmount() {
		this.state = getDefaultState();
	}

	onSubmit(evt: React.FormEvent<HTMLFormElement>) {
		evt.preventDefault();
		this.props.onStartSoknad(this.state.kommuneId, this.state.bydelId);
	}

	render() {
		const { startSoknadPending } = this.props;
		const { valgtKommune, valgtBydel, ferdig } = this.hentSkjemaVerdier();
		let bydeler: NavEnhet[] = null;
		if (valgtKommune) {
			bydeler = finnBydeler(valgtKommune.id, this.props.kommuner);
			if (bydeler.length === 0) {
				bydeler = null;
			}
		}

		return (
			<form onSubmit={e => this.onSubmit(e)}>
				<div>
					<div className="blokk-m">
						<Select
							id="kommune_dropdown"
							bredde="m"
							defaultValue=""
							onChange={(evt: any) =>
								this.setState({
									kommuneId: evt.target.value,
									bydelId: undefined
								})
							}
							label={
								<div className="bosted__selectLabel bosted__tekst--extraPadding">
									<FormattedMessage id="personalia.kommune.label"/>
								</div>
							}
						>
							{!this.state.kommuneId && (
								<option value="" disabled={true}>
									{getIntlTextOrKey(
										this.props.intl,
										"personalia.kommune.default"
									)}
								</option>
							)}
							{alleKommuner(this.props.kommuner).map((enhet: any) => (
								<option value={enhet.id} key={enhet.id}>
									{enhet.navn}
								</option>
							))}
						</Select>
					</div>

					{valgtKommune && bydeler ? (
						<div className="blokk-m">
							<div className="bosted__bydelArrow">
								<Arrow/>
							</div>
							<Select
								id="bydel_dropdown"
								bredde="m"
								defaultValue=""
								onChange={(evt: any) =>
									this.setState({ bydelId: evt.target.value })
								}
								label={
									<div className="bosted__selectLabel bosted__tekst--extraPadding">
										<FormattedMessage id="personalia.bydel.label"/>
									</div>
								}
							>
								{!this.state.bydelId && (
									<option value="" disabled={true}>
										{getIntlTextOrKey(
											this.props.intl,
											"personalia.bydel.default"
										)}
									</option>
								)}
								{bydeler.map(bydel => (
									<option value={bydel.id} key={bydel.id}>
										{bydel.navn}
									</option>
								))}
							</Select>
						</div>
					) : null}
					{ferdig ? (
						<div>
							<p className="bosted__tekst--extraPadding">
								{getIntlTextOrKey(
									this.props.intl,
									"personalia.bosted.oppsummering"
								)}{" "}
								<strong>
									{getNavEnhet(
										valgtKommune.id,
										this.props.kommuner,
										valgtBydel ? valgtBydel.id : null,
										this.props.intl
									)}
								</strong>
							</p>
							<Knapp
								id="gaa_videre_knapp"
								type="hoved"
								htmlType="submit"
								spinner={startSoknadPending}
								disabled={startSoknadPending}
							>
								{getIntlTextOrKey(this.props.intl, "skjema.knapper.gaavidere") +
								" "}
							</Knapp>
						</div>
					) : null}
				</div>
			</form>
		);
	}

	private hentSkjemaVerdier() {
		const { kommuneId, bydelId } = this.state;
		const valgtKommune: NavEnhet | undefined = kommuneId
			? this.props.kommuner.find(k => k.id === kommuneId)
			: undefined;
		const valgtBydel: NavEnhet | undefined =
			valgtKommune && finnBydeler(valgtKommune.id, this.props.kommuner)
				? finnBydeler(valgtKommune.id, this.props.kommuner).find(b => b.id === bydelId)
				: undefined;
		const ferdig =
			(valgtKommune && (finnBydeler(valgtKommune.id, this.props.kommuner)) &&
				finnBydeler(valgtKommune.id, this.props.kommuner).length === 0)
			|| (valgtKommune && valgtBydel);
		return { valgtKommune, valgtBydel, ferdig };
	}
}

export default injectIntl(Bosted);

import * as React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import Knapp from "nav-frontend-knapper";
import { Select } from "nav-frontend-skjema";

import Arrow from "../../nav-soknad/components/svg/Arrow";
import { Kommune, Bydel } from "../../nav-soknad/types";
import { Kommuner, getBosted } from "../data/kommuner";
import { getIntlTextOrKey } from "../../nav-soknad/utils/intlUtils";

interface StateProps {
	kommuneId: string;
	bydelId: string;
}

interface OwnProps {
	onStartSoknad: (kommuneId: string, bydelId: string) => void;
	startSoknadPending: boolean;
}

const getDefaultState = () => ({
	kommuneId: "",
	bydelId: ""
});

class Bosted extends React.Component<OwnProps & InjectedIntlProps, StateProps> {
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
		return (
			<form onSubmit={e => this.onSubmit(e)}>
				<div>
					<div className="blokk-m">
						<Select
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
									<FormattedMessage id="personalia.kommune.label" />
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
							{Kommuner.map(kommune => (
								<option value={kommune.id} key={kommune.id}>
									{kommune.navn}
								</option>
							))}
						</Select>
					</div>

					{valgtKommune && valgtKommune.bydeler ? (
						<div className="blokk-m">
							<div className="bosted__bydelArrow">
								<Arrow />
							</div>
							<Select
								bredde="m"
								defaultValue=""
								onChange={(evt: any) =>
									this.setState({ bydelId: evt.target.value })
								}
								label={
									<div className="bosted__selectLabel bosted__tekst--extraPadding">
										<FormattedMessage id="personalia.bydel.label" />
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
								{valgtKommune.bydeler.map(bydel => (
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
									{getBosted(
										valgtKommune.id,
										valgtBydel ? valgtBydel.id : null
									)}
								</strong>
							</p>
							<Knapp
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
		const valgtKommune: Kommune | undefined = kommuneId
			? Kommuner.find(k => k.id === kommuneId)
			: undefined;
		const valgtBydel: Bydel | undefined =
			valgtKommune && valgtKommune.bydeler
				? valgtKommune.bydeler.find(b => b.id === bydelId)
				: undefined;
		const ferdig =
			(valgtKommune && !valgtKommune.bydeler) || (valgtKommune && valgtBydel);
		return { valgtKommune, valgtBydel, ferdig };
	}
}

export default injectIntl(Bosted);

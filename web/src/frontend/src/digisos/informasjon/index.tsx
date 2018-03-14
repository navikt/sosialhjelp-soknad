import * as React from "react";
import { connect } from "react-redux";
import { RouterProps } from "react-router";
import {
	FormattedHTMLMessage,
	InjectedIntlProps,
	injectIntl
} from "react-intl";
import DocumentTitle from "react-document-title";
import { State } from "../redux/reducers";
import { Undertittel } from "nav-frontend-typografi";
import Knapp from "nav-frontend-knapper";
import { getIntlTextOrKey } from "../../nav-soknad/utils/intlUtils";
import AppTittel from "../../nav-soknad/components/apptittel/AppTittel";
import Infoblokk from "../../nav-soknad/components/infoblokk";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import { tilBostedEllerStartSoknad } from "../../nav-soknad/redux/navigasjon/navigasjonActions";
import { FeatureToggles } from "../../featureToggles";
import { Horten } from "../data/kommuner";
import IkkeTilgang from "./IkkeTilgang";
import { TilgangSperrekode } from "../../nav-soknad/redux/tilgang/tilgangTypes";
import {
	bekreftSamtykke,
	setVisSamtykkeInfo, visSamtykkeMangler
} from "../../nav-soknad/redux/init/initActions";
import SamtykkeInfoForsidenModal from "./samtykkeInfoForsidenModal";
import { Checkbox } from "nav-frontend-skjema";

interface StateProps {
	harTilgang: boolean;
	sperrekode: TilgangSperrekode;
	soknadErLive: string;
	startSoknadPending: boolean;
	visVelgBosted: boolean;
	bekreftet: boolean;
	visSamtykkeMangler: boolean;
}

type Props = StateProps & InjectedIntlProps & RouterProps & DispatchProps;

class Informasjon extends React.Component<Props, {}> {

	startSoknad() {
		if (this.props.bekreftet === true) {
			this.props.dispatch(
				tilBostedEllerStartSoknad(this.props.visVelgBosted ? null : Horten)
			);
		} else {
			this.props.dispatch(visSamtykkeMangler(true));
		}
	}

	render() {
		const {
			intl,
			harTilgang,
			startSoknadPending,
			soknadErLive,
			sperrekode
		} = this.props;
		const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");

		const bekreftOpplysningTekst: string = intl.formatMessage({
			id: "soknadsosialhjelp.forstesiden.bekreftOpplysninger"
		});
		const bekreftOpplysninger = this.bekreftOpplysninger(bekreftOpplysningTekst);

		let classNames = "ekspanderbartPanel skjema-oppsummering__bekreft";
		if (this.props.visSamtykkeMangler) {
			classNames += " skjema-oppsummering__bekreft___feil";
		}

		return (
			<div>
				<DocumentTitle title={title} />
				<AppTittel />
				{soknadErLive === "true" && harTilgang ? (
					<div>
						<div className="skjema-content">
							<Infoblokk
								className="blokk-s"
								tittel={getIntlTextOrKey(intl, "informasjon.start.tittel")}
							>
								<p className="blokk-s">
									<FormattedHTMLMessage id="informasjon.start.tekst" />
								</p>

								<Undertittel key="informasjon.nodsituasjon.undertittel">
									{getIntlTextOrKey(
										intl,
										"informasjon.nodsituasjon.undertittel"
									)}
								</Undertittel>
								<p className="blokk-s">
									<FormattedHTMLMessage id="informasjon.nodsituasjon.tekst" />
								</p>
							</Infoblokk>

							<div className="blokk-xs bolk">
								<div className={classNames} >
									<Checkbox
										id="samtykke_sjekkboks"
										label={bekreftOpplysninger}
										checked={this.props.bekreftet}
										feil={
											this.props.visSamtykkeMangler
												? {
													feilmelding: intl.formatHTMLMessage({
														id: "oppsummering.feilmelding.bekreftmangler"
													})
												}
												: null
										}
										onChange={() => this.props.dispatch(bekreftSamtykke())}
									/>
								</div>
							</div>
							<SamtykkeInfoForsidenModal/>

						</div>

						<Knapp
							id="start_soknad_knapp"
							type="hoved"
							spinner={startSoknadPending}
							disabled={startSoknadPending}
							onClick={() => this.startSoknad()}
						>
							{getIntlTextOrKey(intl, "skjema.knapper.start")}
						</Knapp>
					</div>
				) : (
					<div className="skjema-content">
						<IkkeTilgang sperrekode={sperrekode} />
					</div>
				)}
			</div>
		);
	}

	/* Legg på lenke i tekst fra stash som ser slik ut "Tekst [lenketekst] mer tekst" */
	private bekreftOpplysninger(bekreftOpplysningTekst: string) {
		const bekreftOpplysningTekster = bekreftOpplysningTekst.split(/[\[\]]/);
		let bekreftOpplysninger = <span/>;
		if (bekreftOpplysningTekster.length > 2) {
			bekreftOpplysninger = (
				<span>
					{bekreftOpplysningTekster[ 0 ]}
					<a
						className="lenke"
						onClick={(event: React.MouseEvent<HTMLElement>) => {
							this.props.dispatch(setVisSamtykkeInfo(true));
							event.preventDefault();
						}}
					>
					{bekreftOpplysningTekster[ 1 ]}
					</a>
					{bekreftOpplysningTekster.slice(2, bekreftOpplysningTekster.length).join("|")}
				</span>);
		}
		return bekreftOpplysninger;
	}
}

export default connect((state: State) => ({
	harTilgang: state.tilgang.harTilgang,
	sperrekode: state.tilgang.sperrekode,
	soknadErLive: state.featuretoggles.data[FeatureToggles.soknadErLive],
	visVelgBosted:
		state.featuretoggles.data[FeatureToggles.visVelgBosted] === "true",
	startSoknadPending: state.soknad.startSoknadPending,
	bekreftet: state.init.bekreftSamtykkeInfo,
	visSamtykkeMangler: state.init.visSamtykkeMangler
}))(injectIntl(Informasjon));

import * as React from "react";
import { REST_STATUS } from "../../../nav-soknad/types/restTypes";
import AvsnittMedMarger from "./avsnittMedMarger";
import EttersendelseVedlegg from "./ettersendelseVedlegg";
import Knapp from "nav-frontend-knapper";
import { FormattedHTMLMessage, FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { connect } from "react-redux";
import { FeatureToggles } from "../../../featureToggles";
import { State as ReduxState } from "../../redux/reducers";
import {
	// lagEttersendelse, lesEttersendelser,
	sendEttersendelse
} from "../../../nav-soknad/redux/ettersendelse/ettersendelseActions";

interface OwnProps {
	onEttersendelse?: () => void;
}

interface StateProps {
	restStatus: REST_STATUS;
	opplastingStatus: REST_STATUS;
	manglendeVedlegg: any[];
	visEttersendelse: boolean;
	brukerbehandlingskjedeId: string;
	brukerbehandlingId: string;
	ettersendStatus: REST_STATUS;
}

type Props = OwnProps & StateProps & DispatchProps & InjectedIntlProps;

interface OwnState {
	vedleggEkspandert: boolean;
	advarselManglerVedlegg: boolean;
}

class EttersendelseVedleggListe extends React.Component<Props, OwnState> {

	constructor(props: Props) {
		super(props);
		this.state = {
			vedleggEkspandert: false,
			advarselManglerVedlegg: false
		};
	}

	sendEttersendelse() {
		const antallOpplastedeFiler = this.antallOpplastedeFiler();
		this.setState({ advarselManglerVedlegg: (antallOpplastedeFiler === 0) });
		if (antallOpplastedeFiler > 0) {
			const brukerbehandlingId = this.props.brukerbehandlingId;
			this.props.dispatch(sendEttersendelse(brukerbehandlingId));
			// this.props.dispatch()
		}
	}

	antallOpplastedeFiler() {
		return this.props.manglendeVedlegg
			.map((vedlegg: any) => vedlegg.filer.length)
			.reduce((a: number, b: number) => a + b);
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.ettersendStatus === REST_STATUS.PENDING && this.props.ettersendStatus === REST_STATUS.OK) {
			// console.warn("2. filer er ettersend / ettersendStatus: ok");

			this.props.onEttersendelse();
		}
		if (
			prevProps.opplastingStatus === REST_STATUS.PENDING &&
			this.props.opplastingStatus === REST_STATUS.OK
		) {
			// console.warn("1. liste opplastede filer lest/opplastingStatus ok");
		}

		if (this.state.advarselManglerVedlegg &&
			this.props.manglendeVedlegg &&
			this.antallOpplastedeFiler() > 0) {
				this.setState({advarselManglerVedlegg: false});
		}
	}

	render() {
		return (
			<div
				className={"ettersendelse__vedlegg__innhold " +
				(this.state.advarselManglerVedlegg ? "ettersendelse__vedlegg__feil " : "")}
			>
				{this.props.manglendeVedlegg && this.props.manglendeVedlegg.map((vedlegg) => {
					const tittelKey = `vedlegg.${vedlegg.skjemaNummer}.${vedlegg.skjemanummerTillegg}.tittel`;
					const infoKey = `vedlegg.${vedlegg.skjemaNummer}.${vedlegg.skjemanummerTillegg}.info`;
					let info;
					if (!!this.props.intl.messages[ infoKey ]) {
						info = this.props.intl.formatMessage({ id: infoKey });
					}
					return (
						<EttersendelseVedlegg
							dispatch={this.props.dispatch}
							vedlegg={vedlegg}
							key={vedlegg.vedleggId}
							restStatus={this.props.opplastingStatus}
						>
							<h3><FormattedMessage id={tittelKey}/></h3>
							{info && (<p>{info}</p>)}
						</EttersendelseVedlegg>);
				})}

				{this.state.advarselManglerVedlegg && (
					<AvsnittMedMarger>
						<div className="skjema__feilmelding">
							<FormattedHTMLMessage id="ettersendelse.feilmelding.ingen_vedlegg"/>
						</div>
					</AvsnittMedMarger>
				)}

				<AvsnittMedMarger>
					<Knapp
						spinner={this.props.ettersendStatus === REST_STATUS.PENDING}
						disabled={this.props.ettersendStatus === REST_STATUS.PENDING}
						type="hoved"
						htmlType="submit"
						onClick={() => this.sendEttersendelse()}
					>
						<FormattedMessage id="ettersendelse.knapp.tittel"/>
					</Knapp>
				</AvsnittMedMarger>

			</div>
		);
	}
}

export default connect<{}, {}, OwnProps>((state: ReduxState, {}) => {
	return {
		brukerbehandlingskjedeId: state.soknad.data.brukerBehandlingId,
		visEttersendelse: state.featuretoggles.data[ FeatureToggles.ettersendvedlegg ] === "true",
		manglendeVedlegg: state.ettersendelse.data,
		brukerbehandlingId: state.ettersendelse.brukerbehandlingId,
		opplastingStatus: state.ettersendelse.opplastingStatus,
		ettersendStatus: state.ettersendelse.ettersendStatus,
		restStatus: state.ettersendelse.restStatus
	};
})(injectIntl(EttersendelseVedleggListe));

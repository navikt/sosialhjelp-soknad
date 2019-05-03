import * as React from "react";
import {
	lastOppEttersendelseVedlegg,
	slettEttersendtVedlegg
} from "../../../nav-soknad/redux/ettersendelse/ettersendelseActions";
import {DispatchProps, SoknadAppState} from "../../../nav-soknad/redux/reduxTypes";
import { connect } from "react-redux";
import { downloadAttachedFile } from "../../../nav-soknad/utils/rest-utils";
import { REST_STATUS } from "../../../nav-soknad/types";
import { MargIkoner } from "./margIkoner";
import AvsnittMedMarger from "./avsnittMedMarger";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { REST_FEIL } from "../../../nav-soknad/types/restFeilTypes";
import {
    EttersendelseState,
    EttersendelseVedleggBackend
} from "../../../nav-soknad/redux/ettersendelse/ettersendelseTypes";
import {Fil, OpplysningType} from "../../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerTypes";

interface OwnProps {
	ettersendelseAktivert: boolean;
	children: React.ReactNode;
	vedlegg: EttersendelseVedleggBackend;
	restStatus?: string;
	feilKode?: string;
	dispatch?: any;
}

interface StoreToProps {
    ettersendelse: EttersendelseState;
}

interface OwnState {
	filnavn: string;
}

export type Props = OwnProps & DispatchProps & InjectedIntlProps & StoreToProps;

class EttersendelseVedlegg extends React.Component<Props, OwnState> {

	leggTilVedleggKnapp: HTMLInputElement;

	constructor(props: Props) {
		super(props);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.state = {
			filnavn: null
		};
	}

	removeFile(filId: string, opplysningType: OpplysningType) {
		const { brukerbehandlingId } = this.props.ettersendelse;
		this.props.dispatch(slettEttersendtVedlegg(brukerbehandlingId, filId, opplysningType));
	}

	handleFileUpload(files: FileList) {
        const {ettersendelse, vedlegg} = this.props;
        // this.props.dispatch(lastOppFilFeilet(opplysning.type, null));

		const { brukerbehandlingId } = ettersendelse;

		if (files.length !== 1) {
			return;
		}
		const formData = new FormData();
		formData.append("file", files[ 0 ], files[ 0 ].name);
		this.setState({filnavn: files[ 0 ].name});
		this.props.dispatch(lastOppEttersendelseVedlegg(brukerbehandlingId, vedlegg.type, formData));
		this.leggTilVedleggKnapp.value = "";
	}

	render() {

		const { ettersendelse, vedlegg} = this.props;

		const { feiletVedleggId } = ettersendelse;

		const opplastingsFeil: boolean = this.props.restStatus === REST_STATUS.FEILET && feiletVedleggId === vedlegg.type;

		const visFilForStorFeilmelding: boolean = opplastingsFeil &&
			this.props.feilKode === REST_FEIL.FOR_STOR_FIL;

		const visFeilFiltypeFeilmelding: boolean = opplastingsFeil &&
			this.props.feilKode === REST_FEIL.FEIL_FILTPYE;

		return (
			<span className={opplastingsFeil ? "ettersendelse__vedlegg__feil" : ""}>
				<AvsnittMedMarger
					hoyreIkon={this.props.ettersendelseAktivert && MargIkoner.LAST_OPP}
					onClickHoyreIkon={() => this.props.ettersendelseAktivert && this.leggTilVedleggKnapp.click()}
				>
					{this.props.children}
					<input
						ref={c => this.leggTilVedleggKnapp = c}
						onChange={(e) => this.handleFileUpload(e.target.files)}
						type="file"
						className="visuallyhidden"
						tabIndex={-1}
						accept="image/jpeg,image/png,application/pdf"
					/>
				</AvsnittMedMarger>

				{this.props.vedlegg && this.props.vedlegg.filer.map((fil: Fil) => {
						// TODO: ER DENNE RIKTIG?
						const lastNedUrl = `sosialhjelpvedlegg/${fil.uuid}/fil`;
						return (
							<AvsnittMedMarger
								hoyreIkon={MargIkoner.SØPPELBØTTE}
								key={fil.uuid}
								onClickHoyreIkon={() => this.removeFile(fil.uuid, this.props.vedlegg.type)}
							>
								<a
									className="lenke"
									title="Last ned vedlegg"
									href="#"
									onClick={() => downloadAttachedFile(lastNedUrl)}
								>
									{fil.filNavn}
								</a>
							</AvsnittMedMarger>
						);
					}
				)}

				{this.state.filnavn && this.props.restStatus === REST_STATUS.PENDING && (
					<AvsnittMedMarger hoyreIkon={MargIkoner.SPINNER} key={this.state.filnavn}>
						{this.state.filnavn}
					</AvsnittMedMarger>
				)}

				{opplastingsFeil && (
					<AvsnittMedMarger key={this.state.filnavn}>
						<span className="skjema__feilmelding">
							"{this.state.filnavn}" &nbsp;
							{visFilForStorFeilmelding && (
								<FormattedMessage id="fil.for.stor"/>
							)}
							{visFeilFiltypeFeilmelding && (
								<FormattedMessage id="fil.feil.format"/>
							)}
							{!visFilForStorFeilmelding && !visFeilFiltypeFeilmelding && (
								<FormattedMessage id="opplysninger.vedlegg.ugyldig"/>
							)}
						</span>
					</AvsnittMedMarger>
				)}
			</span>
		);
	}
}

export default connect<StoreToProps, {}, OwnProps>(
    (state: SoknadAppState) => {
        return {
            feil: state.validering.feil,
			ettersendelse: state.ettersendelse
        };
    }
)((injectIntl(EttersendelseVedlegg)));

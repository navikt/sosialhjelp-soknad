import * as React from "react";
import {
	lastOppEttersendelseVedlegg,
	slettEttersendtVedlegg
} from "../../redux/ettersendelse/ettersendelseActions";
import {DispatchProps} from "../../redux/reduxTypes";
import { connect } from "react-redux";
import { downloadAttachedFile } from "../../../nav-soknad/utils/rest-utils";
import { MargIkoner } from "./margIkoner";
import AvsnittMedMarger from "./avsnittMedMarger";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import {
    EttersendelseState,
    EttersendelseVedleggBackend
} from "../../redux/ettersendelse/ettersendelseTypes";
import {Fil, OpplysningType} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {State} from "../../redux/reducers";
import {REST_FEIL, REST_STATUS} from "../../redux/soknad/soknadTypes";

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
	filnavn: string | null;
}

export type Props = OwnProps & DispatchProps & InjectedIntlProps & StoreToProps;

class EttersendelseVedlegg extends React.Component<Props, OwnState> {

	leggTilVedleggKnapp!: HTMLInputElement | null;

	constructor(props: Props) {
		super(props);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.state = {
			filnavn: null
		};
	}

	removeFile(filId: string, opplysningType: OpplysningType) {
		const { brukerbehandlingId } = this.props.ettersendelse;
		if (brukerbehandlingId) {
			this.props.dispatch(slettEttersendtVedlegg(brukerbehandlingId, filId, opplysningType));
		}
	}

	handleFileUpload(files: FileList | null) {
        const {ettersendelse, vedlegg} = this.props;
        // this.props.dispatch(lastOppFilFeilet(opplysning.type, null));

		const { brukerbehandlingId } = ettersendelse;

		if (!files){
			return;
		}
		if (files.length !== 1) {
			return;
		}
		const formData = new FormData();

		formData.append("file", files[ 0 ], files[ 0 ].name);
		this.setState({filnavn: files[ 0 ].name});
		if (brukerbehandlingId){
			this.props.dispatch(lastOppEttersendelseVedlegg(brukerbehandlingId, vedlegg.type, formData));
		}
		if (this.leggTilVedleggKnapp){
			this.leggTilVedleggKnapp.value = "";
		}
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
					hoyreIkon={this.props.ettersendelseAktivert ? MargIkoner.LAST_OPP : undefined}
					onClickHoyreIkon={() =>
						this.props.ettersendelseAktivert &&
						this.leggTilVedleggKnapp &&
						this.leggTilVedleggKnapp.click()}
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
						const lastNedUrl = `opplastetVedlegg/${fil.uuid}/fil`;
						return (
							<AvsnittMedMarger
								hoyreIkon={MargIkoner.SØPPELBØTTE}
								key={fil.uuid}
								onClickHoyreIkon={() => this.removeFile(fil.uuid, this.props.vedlegg.type)}
							>
								<button
									className="linkbutton linkbutton--normal"
									title="Last ned vedlegg"
									onClick={() => downloadAttachedFile(lastNedUrl)}
								>
									{fil.filNavn}
								</button>
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
					<AvsnittMedMarger key={this.state.filnavn ? this.state.filnavn : undefined}>
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

export default connect(
    (state: State) => {
        return {
            feil: state.validering.feil,
			ettersendelse: state.ettersendelse
        };
    }
)((injectIntl(EttersendelseVedlegg)));

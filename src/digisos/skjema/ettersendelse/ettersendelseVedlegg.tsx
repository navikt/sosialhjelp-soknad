import * as React from "react";
import {
	lastOppEttersendelseVedlegg,
	slettEttersendtVedlegg
} from "../../../nav-soknad/redux/ettersendelse/ettersendelseActions";
import {DispatchProps} from "../../../nav-soknad/redux/reduxTypes";
import { connect } from "react-redux";
import { downloadAttachedFile } from "../../../nav-soknad/utils/rest-utils";
import { REST_STATUS } from "../../../nav-soknad/types";
import {MargIkon, MargIkoner} from "./margIkoner";
import AvsnittMedMarger from "./avsnittMedMarger";
import { FormattedMessage } from "react-intl";
import { REST_FEIL } from "../../../nav-soknad/types/restFeilTypes";
import {
    EttersendelseState,
    EttersendelseVedleggBackend
} from "../../../nav-soknad/redux/ettersendelse/ettersendelseTypes";
import {Fil, OpplysningType} from "../../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerTypes";
import {State} from "../../redux/reducers";
import Knapp from "nav-frontend-knapper";
import PaperclipIcon from "../../../nav-soknad/components/digisosIkon/paperclipIcon";

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

export type Props = OwnProps & DispatchProps & StoreToProps;

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
		const opplastingsFeil: boolean = this.props.restStatus === REST_STATUS.FEILET &&
			feiletVedleggId === vedlegg.type;
		const visFilForStorFeilmelding: boolean = opplastingsFeil &&
			this.props.feilKode === REST_FEIL.FOR_STOR_FIL;
		const visFeilFiltypeFeilmelding: boolean = opplastingsFeil &&
			this.props.feilKode === REST_FEIL.FEIL_FILTPYE;

		return (
			<span className={"ettersendelse__vedlegg__wrapper " + (opplastingsFeil ? "ettersendelse__vedlegg__feil" : "")}>
				<AvsnittMedMarger className="vedleggsliste__detalj">
					{this.props.children}
					<input
						ref={c => this.leggTilVedleggKnapp = c}
						onChange={(e) => this.handleFileUpload(e.target.files)}
						type="file"
						className="visuallyhidden"
						tabIndex={-1}
						accept="image/jpeg,image/png,application/pdf"
					/>
					{this.props.vedlegg && this.props.vedlegg.filer.map((fil: Fil) => {
						const lastNedUrl = `opplastetVedlegg/${fil.uuid}/fil`;
						return (
							<div
								key={fil.uuid}
								className="vedleggsliste__filnavn_wrapper"
							>
								<button
									className="linkbutton linkbutton--normal vedleggsliste__filnavn"
									title="Last ned vedlegg"
									onClick={() => downloadAttachedFile(lastNedUrl)}
								>
									<PaperclipIcon/>
									{fil.filNavn}
								</button>
								<button
									className="linkbutton linkbutton--normal vedleggsliste__fil_slett"
									title="Slett vedlegg"
									onClick={() => this.removeFile(fil.uuid, this.props.vedlegg.type)}
								>
									Fjern
									<MargIkon ikon={MargIkoner.SØPPELBØTTE}/>
								</button>
							</div>
						);
					})}

					{opplastingsFeil && (
						<>
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
							<br/>
						</>
					)}

					<Knapp
						type="standard"
						spinner={typeof this.state.filnavn != "undefined" && this.props.restStatus === REST_STATUS.PENDING }
						autoDisableVedSpinner={true}
						onClick={() =>
							this.props.ettersendelseAktivert &&
							this.leggTilVedleggKnapp &&
							this.leggTilVedleggKnapp.click()
						}
					>
						Velg vedlegg
					</Knapp>
				</AvsnittMedMarger>

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
)((EttersendelseVedlegg));

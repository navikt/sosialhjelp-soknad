import * as React from "react";
import {
	lastOppEttersendelseVedlegg,
	slettEttersendtVedlegg
} from "../../../nav-soknad/redux/ettersendelse/ettersendelseActions";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { connect } from "react-redux";
import { State } from "../../redux/reducers";
import Lenkeknapp from "../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
import { downloadAttachedFile } from "../../../nav-soknad/utils/rest-utils";
import { REST_STATUS } from "../../../nav-soknad/types";
import { MargIkoner } from "./margIkoner";
import AvsnittMedMarger from "./avsnittMedMarger";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { REST_FEIL } from "../../../nav-soknad/types/restFeilTypes";

interface OwnProps {
	ettersendelseAktivert: boolean;
	children: React.ReactNode;
	vedlegg?: any;
	restStatus?: string;
	feilKode?: string;
	dispatch?: any;
	feiletVedleggId?: string;
}

interface OwnState {
	filnavn: string;
}

export type Props = OwnProps & DispatchProps & InjectedIntlProps;

class EttersendelseVedlegg extends React.Component<Props, OwnState> {

	leggTilVedleggKnapp: HTMLInputElement;

	constructor(props: Props) {
		super(props);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.state = {
			filnavn: null
		};
	}

	removeFile(filId: string, vedleggId: string) {
		this.props.dispatch(slettEttersendtVedlegg(vedleggId, filId));
	}

	handleFileUpload(files: FileList) {
		if (files.length !== 1) {
			return;
		}
		const formData = new FormData();
		formData.append("file", files[ 0 ], files[ 0 ].name);
		this.setState({filnavn: files[ 0 ].name});
		const vedleggId = this.props.vedlegg.vedleggId;
		this.props.dispatch(lastOppEttersendelseVedlegg(vedleggId, formData));
		this.leggTilVedleggKnapp.value = "";
	}

	render() {
		const vedleggId = this.props.vedlegg.vedleggId;
		const opplastingsFeil: boolean = this.props.restStatus === REST_STATUS.FEILET &&
			this.props.feiletVedleggId === vedleggId.toString();

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

				{this.props.vedlegg && this.props.vedlegg.filer.map((fil: any) => {
						const lastNedUrl = `sosialhjelpvedlegg/${fil.filId}/fil`;
						return (
							<AvsnittMedMarger
								hoyreIkon={MargIkoner.SØPPELBØTTE}
								key={fil.filId}
								onClickHoyreIkon={() => this.removeFile(fil.filId, vedleggId)}
							>
								<Lenkeknapp onClick={() => downloadAttachedFile(lastNedUrl)}>
									{fil.filnavn}
								</Lenkeknapp>
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

export default connect<{}, {}, OwnProps>((state: State) => ({}))(injectIntl(EttersendelseVedlegg));

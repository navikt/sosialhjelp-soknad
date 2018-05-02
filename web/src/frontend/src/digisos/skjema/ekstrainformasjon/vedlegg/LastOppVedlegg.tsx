import * as React from "react";
import { connect } from "react-redux";
import { DispatchProps, SoknadAppState } from "../../../../nav-soknad/redux/reduxTypes";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { Knapp } from "nav-frontend-knapper";
import { lastOppVedlegg } from "../../../../nav-soknad/redux/vedlegg/vedleggActions";
import { REST_STATUS } from "../../../../nav-soknad/types";
import { REST_FEIL } from "../../../../nav-soknad/types/restFeilTypes";

interface Props {
	belopFaktumId: number;
	opplastingStatus?: string;
	sistEndredeFaktumId?: number;
	disabled?: boolean;
	id?: string;
	feilKode?: string;
}

type AllProps = Props &
	DispatchProps &
	InjectedIntlProps;

interface State {
	sisteBrukteFilnavn: string;
}

class LastOppVedlegg extends React.Component<AllProps, State> {
	leggTilVedleggKnapp: HTMLInputElement;

	constructor(props: AllProps) {
		super(props);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.state = {
			sisteBrukteFilnavn: ""
		};
	}

	handleFileUpload(files: FileList) {
		if (files.length !== 1) {
			return;
		}
		const formData = new FormData();
		formData.append("file", files[0], files[0].name);
		this.setState({sisteBrukteFilnavn: files[0].name});
		this.props.dispatch(lastOppVedlegg( this.props.belopFaktumId, formData));
		this.leggTilVedleggKnapp.value = null;
	}

	render() {
		const gjeldende = this.props.belopFaktumId === this.props.sistEndredeFaktumId;
		const visSpinner = gjeldende && this.props.opplastingStatus === REST_STATUS.PENDING;
		const id = this.props.id ? this.props.id : this.props.belopFaktumId.toString();
		const forStorFilFeil: boolean = this.props.feilKode && this.props.feilKode === REST_FEIL.FOR_STOR_FIL;
		const feilFiltype: boolean = this.props.feilKode && this.props.feilKode === REST_FEIL.FEIL_FILTPYE;

		return (
			<div>
				<Knapp
					id={id.replace(/\./g, "_") + "_lastopp_knapp"}
					type="standard"
					htmlType="button"
					disabled={this.props.disabled}
					spinner={visSpinner}
					onClick={() => {
						this.leggTilVedleggKnapp.click();
					}}
				>
					+ <FormattedMessage id="opplysninger.vedlegg.knapp.tekst"/>
				</Knapp>
				<input
					id={id.replace(/\./g, "_") + "_skjult_upload_input"}
					ref={c => this.leggTilVedleggKnapp = c}
					onChange={(e) => this.handleFileUpload(e.target.files)}
					type="file"
					className="visuallyhidden"
					tabIndex={-1}
					accept="image/jpeg,image/png,application/pdf"
				/>

				<div role="alert" aria-live="assertive">
					{this.props.opplastingStatus === REST_STATUS.FEILET && gjeldende && (
						<div className="skjemaelement__feilmelding">
							{forStorFilFeil && (
								<FormattedMessage id="fil.for.stor"/>
							)}
							{feilFiltype && (
								<FormattedMessage id="fil.feil.format"/>
							)}
							{!forStorFilFeil && !feilFiltype && (
								<FormattedMessage id="opplysninger.vedlegg.ugyldig"/>
							)}
							&nbsp;"{this.state.sisteBrukteFilnavn}"
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default connect<{}, {}, Props>((state: SoknadAppState) => {
	return {
		feilKode: state.vedlegg.feilKode
	};
})(injectIntl(LastOppVedlegg));

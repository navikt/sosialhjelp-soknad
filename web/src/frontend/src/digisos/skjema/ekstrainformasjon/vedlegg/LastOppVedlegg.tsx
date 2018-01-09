import * as React from "react";
import { connect } from "react-redux";
import { DispatchProps, SoknadAppState } from "../../../../nav-soknad/redux/reduxTypes";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { Knapp } from "nav-frontend-knapper";
import { lastOppVedlegg } from "../../../../nav-soknad/redux/vedlegg/vedleggActions";
import { REST_STATUS } from "../../../../nav-soknad/types";

interface Props {
	belopFaktumId: number;
	opplastingStatus?: string;
	sistBrukteFaktumId?: number;
}

type AllProps = Props &
	DispatchProps &
	InjectedIntlProps;

class LastOppVedlegg extends React.Component<AllProps, {}> {
	leggTilVedleggKnapp: HTMLInputElement;

	constructor(props: AllProps) {
		super(props);
		this.handleFileUpload = this.handleFileUpload.bind(this);
	}

	handleFileUpload(files: FileList) {
		if (files.length !== 1) {
			return;
		}

		const formData = new FormData();
		formData.append("file", files[0], files[0].name);
		console.warn("filename: " + files[0].name);

		this.props.dispatch(lastOppVedlegg( this.props.belopFaktumId, formData));
		this.leggTilVedleggKnapp.value = null;
	}

	render() {
		const visSpinner = this.props.opplastingStatus === REST_STATUS.PENDING &&
			(this.props.belopFaktumId === this.props.sistBrukteFaktumId);
		return (
			<div>
				<Knapp
					type="standard"
					htmlType="submit"
					disabled={false}
					spinner={visSpinner}
					onClick={() => {
						this.leggTilVedleggKnapp.click();
					}}
				>
					+ <FormattedMessage id="opplysninger.vedlegg.knapp.tekst"/>
				</Knapp>
				<input
					ref={c => this.leggTilVedleggKnapp = c}
					onChange={(e) => this.handleFileUpload(e.target.files)}
					type="file"
					className="visuallyhidden"
					accept="image/jpeg,image/png,application/pdf"
				/>
			</div>
		);
	}
}

export default connect<{}, {}, Props>((state: SoknadAppState) => ({

}))(injectIntl(LastOppVedlegg));

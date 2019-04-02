import * as React from "react";
import { Knapp } from "nav-frontend-knapper";
import { FormattedHTMLMessage } from "react-intl";
import {Opplysning} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";


export interface OwnProps {
	okonomiskOpplysning: Opplysning;
	isDisabled: boolean;
	visSpinner: boolean;
}


class LastOppFil extends React.Component<OwnProps, {}> {
	leggTilVedleggKnapp: HTMLInputElement;

	constructor(props: OwnProps) {
		super(props);
		this.state = {
			sisteBrukteFilnavn: ""
		};
	}

    handleFileUpload(files: any){
		console.warn("bruker den skulft input tingen");
	}


	render() {

		const { isDisabled, visSpinner } = this.props;

		return (
			<div>
				<Knapp
					id={"1"}
					type="standard"
					htmlType="button"
					disabled={isDisabled}
					spinner={visSpinner}
					onClick={() => {
						console.warn("LAST OPP VEDLEGG.... åpne fil browser etc...");;
					}}
					className="last-opp-vedlegg-knapp"
				>
					<FormattedHTMLMessage id="opplysninger.vedlegg.knapp.tekst"/>
				</Knapp>
				<input
					id={"skult_input_1"}
					ref={c => this.leggTilVedleggKnapp = c}
					onChange={(e) => this.handleFileUpload(e.target.files)}
					type="file"
					className="visuallyhidden"
					tabIndex={-1}
					accept="image/jpeg,image/png,application/pdf"
				/>

				<div role="alert" aria-live="assertive">
					<div className="skjemaelement__feilmelding">
						<FormattedHTMLMessage id={"feil.opplasting.av.vedleggsfil"}/>
					</div>
				</div>
			</div>
		);
	}
}

export default LastOppFil;

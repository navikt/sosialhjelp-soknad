import * as React from "react";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage} from "react-intl";
import {
    OkonomiskeOpplysningerModel,
    Opplysning
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";
import {connect} from "react-redux";
import {DispatchProps, SoknadAppState} from "../../../nav-soknad/redux/reduxTypes";
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import {lastOppFil} from "../../../nav-soknad/redux/fil/filActions";
import {FilState} from "../../../nav-soknad/redux/fil/filTypes";
import {Valideringsfeil} from "../../../nav-soknad/validering/types";

export interface StoreToProps {
    okonomiskeOpplysninger: OkonomiskeOpplysningerModel;
    behandlingsId: string;
    feil: Valideringsfeil[];
    filopplasting: FilState
}

interface OwnProps {
    opplysning: Opplysning;
    gruppeIndex: number;
    isDisabled: boolean;
    visSpinner: boolean;
}

type Props = OwnProps & StoreToProps & DispatchProps & InjectedIntlProps;



class LastOppFil extends React.Component<Props, {}> {
	leggTilVedleggKnapp: HTMLInputElement;

	constructor(props: Props) {
		super(props);
		this.state = {
			sisteBrukteFilnavn: ""
		};
	}

    handleFileUpload(files: FileList) {
	    const { opplysning } = this.props;
        if (files.length !== 1) {
            return;
        }
        const formData = new FormData();
        formData.append("file", files[0], files[0].name);
        this.setState({sisteBrukteFilnavn: files[0].name});
        this.props.dispatch(lastOppFil(opplysning, formData, this.props.behandlingsId, this.props.opplysning.type));
        this.leggTilVedleggKnapp.value = null;
    }

    // renderFeilmelding() {
    //     const forStorFilFeil: boolean = this.props.filopplasting.feilKode && this.props.feilKode === REST_FEIL.FOR_STOR_FIL;
    //     const feilFiltype: boolean = this.props.feilKode && this.props.feilKode === REST_FEIL.FEIL_FILTPYE;
    //     const kryptertFilFeil: boolean = this.props.feilKode && this.props.feilKode === REST_FEIL.KRYPTERT_FIL;
    //     const signertFilFeil: boolean = this.props.feilKode && this.props.feilKode === REST_FEIL.SIGNERT_FIL;
    //     const annenFeil = !forStorFilFeil && !feilFiltype && !kryptertFilFeil && !signertFilFeil;
    //
    //     return (
    //         <div className="skjemaelement__feilmelding">
    //             {forStorFilFeil && (
    //                 <FormattedMessage id="fil.for.stor"/>
    //             )}
    //             {feilFiltype && (
    //                 <FormattedMessage id="fil.feil.format"/>
    //             )}
    //             {kryptertFilFeil && (
    //                 <FormattedMessage id="fil.feil.kryptert"/>
    //             )}
    //             {signertFilFeil && (
    //                 <FormattedMessage id="fil.feil.signert"/>
    //             )}
    //             {annenFeil && (
    //                 <FormattedMessage id="opplysninger.vedlegg.ugyldig"/>
    //             )}
    //             &nbsp; sett inn filnavn
    //         </div>
    //     );
    // }

	render() {

		const { isDisabled, visSpinner, opplysning } = this.props;

		const gjeldende = true;

		return (
			<div>
                <Knapp
                    id={opplysning.type.replace(/\./g, "_") + "_lastopp_knapp"}
                    type="standard"
                    htmlType="button"
                    disabled={isDisabled}
                    spinner={visSpinner}
                    onClick={() => {
                        this.leggTilVedleggKnapp.click();
                    }}
                    className="last-opp-vedlegg-knapp"
                >
                    + <FormattedMessage id="opplysninger.vedlegg.knapp.tekst"/>
                </Knapp>
                <input
                    id={opplysning.type.replace(/\./g, "_") + "_skjult_upload_input"}
                    ref={c => this.leggTilVedleggKnapp = c}
                    onChange={(e) => this.handleFileUpload(e.target.files)}
                    type="file"
                    className="visuallyhidden"
                    tabIndex={-1}
                    accept="image/jpeg,image/png,application/pdf"
                />

                <div role="alert" aria-live="assertive">
                    { gjeldende && (
                        <div className="skjemaelement__feilmelding">
                            {/*{this.renderFeilmelding()}*/}
                            { this.props.filopplasting.feilKode }
                        </div>
                    )}
                </div>
			</div>
		);
	}
}


export default connect<StoreToProps, {}, OwnProps>(
    (state: SoknadAppState) => {
        return {
            okonomiskeOpplysninger: state.okonomiskeOpplysninger,
            behandlingsId: state.soknad.data.brukerBehandlingId,
            feil: state.validering.feil,
            filopplasting: state.filopplasting
        };
    }
)(LastOppFil);

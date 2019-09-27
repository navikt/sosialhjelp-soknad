import * as React from "react";
import {Knapp} from "nav-frontend-knapper";
import {FormattedMessage, InjectedIntlProps} from "react-intl";
import {Opplysning} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {connect} from "react-redux";
import {DispatchProps} from "../../redux/reduxTypes";
import {lastOppFil} from "../../redux/fil/filActions";
import {FilState} from "../../redux/fil/filTypes";
import {State} from "../../redux/reducers";
import {injectIntl} from "react-intl";

interface StoreToProps {
    behandlingsId: string | undefined;
    filopplasting: FilState
}

interface OwnProps {
    opplysning: Opplysning;
    isDisabled: boolean;
    visSpinner: boolean;
}

type Props = OwnProps & StoreToProps & DispatchProps & InjectedIntlProps;


class LastOppFil extends React.Component<Props, {}> {
    leggTilVedleggKnapp!: HTMLInputElement;

    handleFileUpload(files: FileList) {
        const {behandlingsId, opplysning} = this.props;
        if (behandlingsId){
            if (files.length !== 1) {
                return;
            }
            const formData = new FormData();
            formData.append("file", files[0], files[0].name);
            this.props.dispatch(lastOppFil(opplysning, formData, behandlingsId));
            this.leggTilVedleggKnapp.value = "";
        }
    }

    render() {

        const {isDisabled, visSpinner, opplysning, filopplasting} = this.props;

        return (
            <div>
                <Knapp
                    id={opplysning.type.replace(/\./g, "_") + "_lastopp_knapp"}
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
                    ref={c => {
                        if (c) {
                            this.leggTilVedleggKnapp = c
                        }
                    }}
                    onChange={(e) => {
                        if (e.target.files) {
                            this.handleFileUpload(e.target.files)
                        }
                    }}
                    type="file"
                    className="visuallyhidden"
                    tabIndex={-1}
                    accept="image/jpeg,image/png,application/pdf"
                />

                <div role="alert" aria-live="assertive">
                    <div className="skjemaelement__feilmelding">
                        {filopplasting.feilKode && filopplasting.opplysningtype === opplysning.type &&
                        <FormattedMessage id={filopplasting.feilKode}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(
    (state: State) => {
        return {
            behandlingsId: state.soknad.behandlingsId,
            filopplasting: state.filopplasting
        };
    }
)(injectIntl(LastOppFil));

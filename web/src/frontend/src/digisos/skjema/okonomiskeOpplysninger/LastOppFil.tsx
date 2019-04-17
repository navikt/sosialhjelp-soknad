import * as React from "react";
import {Knapp} from "nav-frontend-knapper";
import {FormattedMessage} from "react-intl";
import {
    Opplysning
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";
import {connect} from "react-redux";
import {DispatchProps, SoknadAppState} from "../../../nav-soknad/redux/reduxTypes";
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import {lastOppFil, lastOppFilFeilet} from "../../../nav-soknad/redux/fil/filActions";
import {FilState} from "../../../nav-soknad/redux/fil/filTypes";

interface StoreToProps {
    behandlingsId: string;
    filopplasting: FilState
}

interface OwnProps {
    opplysning: Opplysning;
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
        const {behandlingsId, opplysning} = this.props;
        this.props.dispatch(lastOppFilFeilet(opplysning.type, null));
        if (files.length !== 1) {
            return;
        }
        const formData = new FormData();
        formData.append("file", files[0], files[0].name);
        this.setState({sisteBrukteFilnavn: files[0].name});
        this.props.dispatch(lastOppFil(opplysning, formData, behandlingsId));
        this.leggTilVedleggKnapp.value = null;
    }

    render() {

        const {isDisabled, visSpinner, opplysning, filopplasting} = this.props;

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
                    <div className="skjemaelement__feilmelding">
                        {filopplasting.feilKode &&
                        <FormattedMessage id={filopplasting.feilKode}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}


export default connect<StoreToProps, {}, OwnProps>(
    (state: SoknadAppState) => {
        return {
            behandlingsId: state.soknad.data.brukerBehandlingId,
            filopplasting: state.filopplasting
        };
    }
)(LastOppFil);

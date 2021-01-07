import * as React from "react";
import {lastOppEttersendelseVedlegg, slettEttersendtVedlegg} from "../../redux/ettersendelse/ettersendelseActions";
import {DispatchProps} from "../../redux/reduxTypes";
import {connect} from "react-redux";
import {downloadAttachedFile} from "../../../nav-soknad/utils/rest-utils";
import {MargIkon, MargIkoner} from "./margIkoner";
import AvsnittMedMarger from "./avsnittMedMarger";
import {FormattedMessage} from "react-intl";
import {EttersendelseState, EttersendelseVedleggBackend} from "../../redux/ettersendelse/ettersendelseTypes";
import {Fil, OpplysningType} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {State} from "../../redux/reducers";
import {REST_FEIL, REST_STATUS} from "../../redux/soknad/soknadTypes";
import PaperclipIcon from "../../../nav-soknad/components/digisosIkon/paperclipIcon";
import {Knapp} from "nav-frontend-knapper";

interface OwnProps {
    ettersendelseAktivert: boolean;
    children: React.ReactNode;
    vedlegg: EttersendelseVedleggBackend;
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
            filnavn: null,
        };
    }

    removeFile(filId: string, opplysningType: OpplysningType) {
        const {brukerbehandlingId} = this.props.ettersendelse;
        if (brukerbehandlingId) {
            this.props.dispatch(slettEttersendtVedlegg(brukerbehandlingId, filId, opplysningType));
        }
    }

    handleFileUpload(files: FileList | null) {
        const {ettersendelse, vedlegg} = this.props;
        const {brukerbehandlingId} = ettersendelse;
        if (!files) {
            return;
        }
        if (files.length !== 1) {
            return;
        }
        const formData = new FormData();
        formData.append("file", files[0], files[0].name);
        this.setState({filnavn: files[0].name});
        if (brukerbehandlingId) {
            this.props.dispatch(lastOppEttersendelseVedlegg(brukerbehandlingId, vedlegg.type, formData));
        }
        if (this.leggTilVedleggKnapp) {
            this.leggTilVedleggKnapp.value = "";
        }
    }

    render() {
        const {ettersendelse, vedlegg} = this.props;
        const {feiletVedleggId, opplastingStatus, ettersendStatus, opplastingVedleggType} = ettersendelse;
        const opplastingsFeil: boolean = opplastingStatus === REST_STATUS.FEILET && feiletVedleggId === vedlegg.type;
        const visFeilFiltypeFeilmelding: boolean = opplastingsFeil && this.props.feilKode === REST_FEIL.FEIL_FILTPYE;

        return (
            <span className="">
                <AvsnittMedMarger className="vedleggsliste__detalj">
                    {this.props.children}
                    <input
                        ref={(c) => (this.leggTilVedleggKnapp = c)}
                        onChange={(e) => this.handleFileUpload(e.target.files)}
                        type="file"
                        className="visuallyhidden"
                        tabIndex={-1}
                        accept={
                            window.navigator.platform.match(/iPad|iPhone|iPod/) !== null
                                ? "*"
                                : "image/jpeg,image/png,application/pdf"
                        }
                    />
                    {this.props.vedlegg &&
                        this.props.vedlegg.filer.map((fil: Fil) => {
                            const lastNedUrl = `opplastetVedlegg/${fil.uuid}/fil`;
                            return (
                                <div key={fil.uuid} className="vedleggsliste__filnavn_wrapper">
                                    <button
                                        className="linkbutton linkbutton--normal vedleggsliste__filnavn_button"
                                        title="Last ned vedlegg"
                                        onClick={() => downloadAttachedFile(lastNedUrl)}
                                    >
                                        <PaperclipIcon />
                                        <div className="vedleggsliste__filnavn_tekst">{fil.filNavn}</div>
                                    </button>
                                    <div className="vedleggsliste__fil_slett_wrapper">
                                        <button
                                            className="linkbutton linkbutton--normal vedleggsliste__fil_slett"
                                            title="Slett vedlegg"
                                            onClick={() => this.removeFile(fil.uuid, this.props.vedlegg.type)}
                                        >
                                            Fjern
                                            <MargIkon ikon={MargIkoner.SØPPELBØTTE} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                    {opplastingsFeil &&
                        this.props.feilKode !== REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR_ETTERSENDELSE && (
                            <>
                                <span className="skjema__feilmelding">
                                    "{this.state.filnavn}" &nbsp;
                                    {!visFeilFiltypeFeilmelding && (
                                        <FormattedMessage
                                            id={
                                                this.props.feilKode
                                                    ? this.props.feilKode
                                                    : "opplysninger.vedlegg.ugyldig"
                                            }
                                        />
                                    )}
                                    {visFeilFiltypeFeilmelding && <FormattedMessage id="fil.feil.format" />}
                                </span>
                                <br />
                            </>
                        )}

                    {opplastingsFeil &&
                        this.props.feilKode === REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR_ETTERSENDELSE && (
                            <>
                                <span className="skjema__feilmelding">
                                    {<FormattedMessage id={this.props.feilKode} />}
                                </span>
                                <br />
                            </>
                        )}

                    <Knapp
                        type="standard"
                        spinner={vedlegg.type === opplastingVedleggType}
                        disabled={ettersendStatus === REST_STATUS.PENDING || opplastingStatus === REST_STATUS.PENDING}
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

export default connect((state: State) => {
    return {
        feil: state.validering.feil,
        ettersendelse: state.ettersendelse,
    };
})(EttersendelseVedlegg);

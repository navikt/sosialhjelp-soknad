import * as React from "react";
import AvsnittMedMarger from "./avsnittMedMarger";
import EttersendelseVedlegg from "./ettersendelseVedlegg";
import Knapp from "nav-frontend-knapper";
import {FormattedMessage, injectIntl} from "react-intl";
import {DispatchProps} from "../../redux/reduxTypes";
import {connect} from "react-redux";
import {State} from "../../redux/reducers";
import {sendEttersendelse} from "../../redux/ettersendelse/ettersendelseActions";
import {EttersendelseVedleggBackend} from "../../redux/ettersendelse/ettersendelseTypes";
import {getSpcForOpplysning} from "../../redux/okonomiskeOpplysninger/opplysningerUtils";
import {REST_STATUS} from "../../redux/soknad/soknadTypes";
import {IntlProps} from "../../../nav-soknad/utils";

interface OwnProps {
    ettersendelseAktivert: boolean;
    onEttersendelse?: () => void;
}

interface StateProps {
    opplastingStatus: REST_STATUS;
    manglendeVedlegg: EttersendelseVedleggBackend[];
    brukerbehandlingskjedeId: string | undefined;
    brukerbehandlingId: string | null;
    ettersendStatus: REST_STATUS;
    feilKode: string;
    feiletVedleggId: string;
}

type Props = OwnProps & StateProps & DispatchProps & IntlProps;

interface OwnState {
    vedleggEkspandert: boolean;
    advarselManglerVedlegg: boolean;
}

class EttersendelseVedleggListe extends React.Component<Props, OwnState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            vedleggEkspandert: false,
            advarselManglerVedlegg: false,
        };
    }

    sendEttersendelse() {
        const antallOpplastedeFiler = this.antallOpplastedeFiler();
        this.setState({advarselManglerVedlegg: antallOpplastedeFiler === 0});
        if (antallOpplastedeFiler > 0) {
            const brukerbehandlingId = this.props.brukerbehandlingId;
            if (brukerbehandlingId) {
                this.props.dispatch(sendEttersendelse(brukerbehandlingId));
            }
        }
    }

    antallOpplastedeFiler() {
        return this.props.manglendeVedlegg
            .map((vedlegg: any) => vedlegg.filer.length)
            .reduce((a: number, b: number) => a + b);
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.ettersendStatus === REST_STATUS.PENDING && this.props.ettersendStatus === REST_STATUS.OK) {
            if (this.props.onEttersendelse) {
                this.props.onEttersendelse();
            }
        }
        if (this.state.advarselManglerVedlegg && this.props.manglendeVedlegg && this.antallOpplastedeFiler() > 0) {
            this.setState({advarselManglerVedlegg: false});
        }
    }

    render() {
        return (
            <div
                className={
                    "ettersendelse__vedlegg__innhold " +
                    (this.state.advarselManglerVedlegg ? "ettersendelse__vedlegg__feil " : "")
                }
            >
                {this.props.manglendeVedlegg &&
                    this.props.manglendeVedlegg.map((vedlegg: EttersendelseVedleggBackend) => {
                        const spc = getSpcForOpplysning(vedlegg.type);
                        const tittelKey = spc ? spc.textKey + ".vedlegg.sporsmal.tittel" : "";
                        const infoKey = spc ? spc.textKey + ".vedlegg.sporsmal.info" : "";
                        let info;
                        if (infoKey && !!this.props.intl.messages[infoKey]) {
                            info = this.props.intl.formatMessage({id: infoKey});
                        }
                        if (!this.props.ettersendelseAktivert && vedlegg.type === "annet|annet") {
                            return null;
                        }
                        return (
                            <EttersendelseVedlegg
                                ettersendelseAktivert={this.props.ettersendelseAktivert}
                                vedlegg={vedlegg}
                                key={vedlegg.type}
                                feilKode={this.props.feiletVedleggId === vedlegg.type ? this.props.feilKode : undefined}
                            >
                                {tittelKey && (
                                    <h3>
                                        <FormattedMessage id={tittelKey} />
                                    </h3>
                                )}
                                {info && <p>{info}</p>}
                            </EttersendelseVedlegg>
                        );
                    })}

                <AvsnittMedMarger className="ettersendelse_send_vedlegg_knapp_wrapper">
                    {this.state.advarselManglerVedlegg && (
                        <>
                            <div className="skjema__feilmelding">
                                <FormattedMessage id="ettersendelse.feilmelding.ingen_vedlegg" />
                            </div>
                            <br />
                        </>
                    )}

                    <br />
                    {this.props.ettersendelseAktivert && (
                        <Knapp
                            spinner={this.props.ettersendStatus === REST_STATUS.PENDING}
                            disabled={
                                this.props.ettersendStatus === REST_STATUS.PENDING ||
                                this.props.opplastingStatus === REST_STATUS.PENDING
                            }
                            type="hoved"
                            htmlType="submit"
                            onClick={() => this.sendEttersendelse()}
                            title="Send vedlegg"
                        >
                            Send vedlegg
                        </Knapp>
                    )}
                </AvsnittMedMarger>
            </div>
        );
    }
}

export default connect((state: State) => {
    return {
        brukerbehandlingskjedeId: state.soknad.behandlingsId,
        manglendeVedlegg: state.ettersendelse.data,
        brukerbehandlingId: state.ettersendelse.brukerbehandlingId,
        opplastingStatus: state.ettersendelse.opplastingStatus,
        ettersendStatus: state.ettersendelse.ettersendStatus,
        feilKode: state.ettersendelse.feilKode,
        feiletVedleggId: state.ettersendelse.feiletVedleggId,
    };
})(injectIntl(EttersendelseVedleggListe));

import * as React from "react";
import AvsnittMedMarger from "./avsnittMedMarger";
import EttersendelseVedlegg from "./ettersendelseVedlegg";
import Knapp from "nav-frontend-knapper";
import {FormattedHTMLMessage, FormattedMessage, injectIntl} from "react-intl";
import {DispatchProps} from "../../redux/reduxTypes";
import {connect} from "react-redux";
import {State} from "../../redux/reducers";
import {sendEttersendelse, setAdvarselManglerVedlegg} from "../../redux/ettersendelse/ettersendelseActions";
import {EttersendelseVedleggBackend} from "../../redux/ettersendelse/ettersendelseTypes";
import {getSpcForOpplysning} from "../../redux/okonomiskeOpplysninger/opplysningerUtils";
import {REST_STATUS} from "../../redux/soknad/soknadTypes";
import {IntlProps} from "../../../nav-soknad/utils";
import {SkjemaGruppe} from "nav-frontend-skjema";

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
    advarselManglerVedlegg: boolean;
}

type Props = OwnProps & StateProps & DispatchProps & IntlProps;

interface OwnState {
    vedleggEkspandert: boolean;
}

class EttersendelseVedleggListe extends React.Component<Props, OwnState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            vedleggEkspandert: false,
        };
    }

    sendEttersendelse() {
        const antallOpplastedeFiler = this.antallOpplastedeFiler();
        this.props.dispatch(setAdvarselManglerVedlegg(antallOpplastedeFiler === 0));
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
        if (this.props.advarselManglerVedlegg && this.props.manglendeVedlegg && this.antallOpplastedeFiler() > 0) {
            this.props.dispatch(setAdvarselManglerVedlegg(false));
        }
    }

    render() {
        return (
            <div className={"ettersendelse__vedlegg__innhold "}>
                <AvsnittMedMarger>
                    <SkjemaGruppe
                        feil={
                            this.props.advarselManglerVedlegg && (
                                <FormattedHTMLMessage id="ettersendelse.feilmelding.ingen_vedlegg" />
                            )
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
                                        title={<FormattedMessage id={tittelKey} />}
                                        key={vedlegg.type}
                                        feilKode={
                                            this.props.feiletVedleggId === vedlegg.type
                                                ? this.props.feilKode
                                                : undefined
                                        }
                                    >
                                        {info && <p>{info}</p>}
                                    </EttersendelseVedlegg>
                                );
                            })}
                    </SkjemaGruppe>
                </AvsnittMedMarger>
                <AvsnittMedMarger className="ettersendelse_send_vedlegg_knapp_wrapper">
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
        advarselManglerVedlegg: state.ettersendelse.advarselManglerVedlegg,
    };
})(injectIntl(EttersendelseVedleggListe));

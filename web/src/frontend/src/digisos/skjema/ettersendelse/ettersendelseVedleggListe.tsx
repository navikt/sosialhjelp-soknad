import * as React from "react";
import {REST_STATUS} from "../../../nav-soknad/types/restTypes";
import AvsnittMedMarger from "./avsnittMedMarger";
import EttersendelseVedlegg from "./ettersendelseVedlegg";
import Knapp from "nav-frontend-knapper";
import {FormattedHTMLMessage, FormattedMessage, InjectedIntlProps, injectIntl} from "react-intl";
import {DispatchProps} from "../../../nav-soknad/redux/reduxTypes";
import {connect} from "react-redux";
import {State as ReduxState} from "../../redux/reducers";
import {sendEttersendelse} from "../../../nav-soknad/redux/ettersendelse/ettersendelseActions";
import {EttersendelseVedleggBackend} from "../../../nav-soknad/redux/ettersendelse/ettersendelseTypes";
import {getSpcForOpplysning} from "../../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerUtils";

interface OwnProps {
    ettersendelseAktivert: boolean;
    onEttersendelse?: () => void;
}

interface StateProps {
    opplastingStatus: REST_STATUS;
    manglendeVedlegg: EttersendelseVedleggBackend[];
    brukerbehandlingskjedeId: string;
    brukerbehandlingId: string;
    ettersendStatus: REST_STATUS;
    feilKode: string;
    feiletVedleggId: string;
}

type Props = OwnProps & StateProps & DispatchProps & InjectedIntlProps;

interface OwnState {
    vedleggEkspandert: boolean;
    advarselManglerVedlegg: boolean;
}

class EttersendelseVedleggListe extends React.Component<Props, OwnState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            vedleggEkspandert: false,
            advarselManglerVedlegg: false
        };
    }

    sendEttersendelse() {
        const antallOpplastedeFiler = this.antallOpplastedeFiler();
        this.setState({advarselManglerVedlegg: (antallOpplastedeFiler === 0)});
        if (antallOpplastedeFiler > 0) {
            const brukerbehandlingId = this.props.brukerbehandlingId;
            this.props.dispatch(sendEttersendelse(brukerbehandlingId));
        }
    }

    antallOpplastedeFiler() {
        return this.props.manglendeVedlegg
            .map((vedlegg: any) => vedlegg.filer.length)
            .reduce((a: number, b: number) => a + b);
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.ettersendStatus === REST_STATUS.PENDING && this.props.ettersendStatus === REST_STATUS.OK) {
            this.props.onEttersendelse();
        }
        if (this.state.advarselManglerVedlegg &&
            this.props.manglendeVedlegg &&
            this.antallOpplastedeFiler() > 0) {
            this.setState({advarselManglerVedlegg: false});
        }
    }

    render() {
        return (
            <div
                className={"ettersendelse__vedlegg__innhold " +
                (this.state.advarselManglerVedlegg ? "ettersendelse__vedlegg__feil " : "")}
            >
                {this.props.manglendeVedlegg && this.props.manglendeVedlegg.map((vedlegg: EttersendelseVedleggBackend) => {
                    const spc = getSpcForOpplysning(vedlegg.type);
                    const tittelKey = spc ? spc.textKey + ".vedlegg.sporsmal.tittel" : "";
                    const infoKey = spc ? spc.textKey + ".vedlegg.sporsmal.info" : "";
                    let info;
                    if (infoKey && !!this.props.intl.messages[infoKey]) {
                        info = this.props.intl.formatMessage({id: infoKey});
                    }
                    if (!this.props.ettersendelseAktivert
                        && vedlegg.type === "annet|annet") {
                        return null;
                    }
                    return (
                        <EttersendelseVedlegg
                            ettersendelseAktivert={this.props.ettersendelseAktivert}
                            dispatch={this.props.dispatch}
                            vedlegg={vedlegg}
                            key={vedlegg.type}
                            restStatus={this.props.opplastingStatus}
                            feilKode={this.props.feiletVedleggId === vedlegg.type ? this.props.feilKode : null}
                        >
                            {tittelKey && <h3><FormattedMessage id={tittelKey}/></h3>}
                            {info && (<p>{info}</p>)}
                        </EttersendelseVedlegg>);
                })}

                {this.state.advarselManglerVedlegg && (
                    <AvsnittMedMarger>
                        <div className="skjema__feilmelding">
                            <FormattedHTMLMessage id="ettersendelse.feilmelding.ingen_vedlegg"/>
                        </div>
                    </AvsnittMedMarger>
                )}

                <AvsnittMedMarger>
                    {this.props.ettersendelseAktivert && (
                        <Knapp
                            spinner={this.props.ettersendStatus === REST_STATUS.PENDING}
                            disabled={this.props.ettersendStatus === REST_STATUS.PENDING}
                            type="hoved"
                            htmlType="submit"
                            onClick={() => this.sendEttersendelse()}
                            title="Ettersend vedlegg"
                        >
                            <FormattedMessage id="ettersendelse.knapp.tittel"/>
                        </Knapp>
                    )}
                </AvsnittMedMarger>

            </div>
        );
    }
}

export default connect<{}, {}, OwnProps>((state: ReduxState, {}) => {
    return {
        brukerbehandlingskjedeId: state.soknad.data.brukerBehandlingId,
        manglendeVedlegg: state.ettersendelse.data,
        brukerbehandlingId: state.ettersendelse.brukerbehandlingId,
        opplastingStatus: state.ettersendelse.opplastingStatus,
        ettersendStatus: state.ettersendelse.ettersendStatus,
        feilKode: state.ettersendelse.feilKode,
        feiletVedleggId: state.ettersendelse.feiletVedleggId
    };
})(injectIntl(EttersendelseVedleggListe));

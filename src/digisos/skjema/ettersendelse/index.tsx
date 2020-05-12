import {connect} from "react-redux";
import {FormattedHTMLMessage, FormattedMessage} from "react-intl";
import {State} from "../../redux/reducers";
import * as React from "react";
import {DispatchProps} from "../../redux/reduxTypes";
import BannerEttersendelse from "./bannerEttersendelse";
import {
    lesEttersendelser,
    opprettEttersendelse,
    sendEttersendelse,
} from "../../redux/ettersendelse/ettersendelseActions";
import AvsnittMedMarger from "./avsnittMedMarger";
import EttersendelseEkspanderbart from "./ettersendelseEkspanderbart";
import {MargIkoner} from "./margIkoner";
import {visToppMeny} from "../../../nav-soknad/utils/domUtils";
import {EttersendelseFeilkode, EttersendelseVedleggBackend} from "../../redux/ettersendelse/ettersendelseTypes";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";
import {Prompt} from "react-router";
import {erEttersendelseSide, NAVIGASJONSPROMT} from "../../../nav-soknad/utils";
import SoknadAlleredeSendtPromt from "../../../nav-soknad/components/soknadAlleredeSendtPromt/SoknadAlleredeSendtPromt";
import {REST_STATUS} from "../../redux/soknad/soknadTypes";
import AlertStripe from "nav-frontend-alertstriper";
import {SoknadEttersendelseFeilerHotjarTrigger} from "../../../nav-soknad/components/hotjarTrigger/HotjarTrigger";

interface OwnProps {
    manglendeVedlegg: EttersendelseVedleggBackend[];
    brukerbehandlingskjedeId: string | undefined;
    brukerbehandlingId: string | null;
    restStatus: REST_STATUS;
    originalSoknad: any;
    ettersendelser: any;
    feilKode: string;
    nedetidstart: string | undefined;
    nedetidslutt: string | undefined;
    isNedetid: boolean;
    isPlanlagtNedetid: boolean;
}

type Props = OwnProps & DispatchProps;

interface OwnState {
    vedleggEkspandert: boolean;
    advarselManglerVedlegg: boolean;
}

class Ettersendelse extends React.Component<Props, OwnState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            vedleggEkspandert: false,
            advarselManglerVedlegg: false,
        };
    }

    componentDidMount() {
        visToppMeny();
        const brukerbehandlingskjedeId = this.lesBrukerbehandlingskjedeId();
        if (brukerbehandlingskjedeId) {
            this.props.dispatch(opprettEttersendelse(brukerbehandlingskjedeId));
            this.props.dispatch(lesEttersendelser(brukerbehandlingskjedeId));
        }
    }

    lesBrukerbehandlingskjedeId() {
        let brukerbehandlingskjedeId = this.props.brukerbehandlingskjedeId;
        if (!brukerbehandlingskjedeId) {
            const match = window.location.pathname.match(/\/skjema\/(.*)\/ettersendelse/);
            if (match) {
                brukerbehandlingskjedeId = match[1];
            }
        }
        return brukerbehandlingskjedeId;
    }

    sendEttersendelse() {
        const antallOpplastedeFiler = this.antallOpplastedeFiler();
        this.setState({advarselManglerVedlegg: antallOpplastedeFiler === 0});
        if (this.props.brukerbehandlingId) {
            if (antallOpplastedeFiler > 0) {
                this.props.dispatch(sendEttersendelse(this.props.brukerbehandlingId));
            }
        }
    }

    antallOpplastedeFiler() {
        return this.props.manglendeVedlegg
            .map((vedlegg: any) => vedlegg.filer.length)
            .reduce((a: number, b: number) => a + b);
    }

    skrivUt() {
        window.print();
    }

    onEttersendelseSendt() {
        const brukerbehandlingskjedeId = this.lesBrukerbehandlingskjedeId();
        if (brukerbehandlingskjedeId) {
            this.props.dispatch(opprettEttersendelse(brukerbehandlingskjedeId));
            this.props.dispatch(lesEttersendelser(brukerbehandlingskjedeId));
        }
    }

    manglendeVedleggDato() {
        const {originalSoknad, ettersendelser} = this.props;
        let datoManglendeVedlegg: string = "";
        if (originalSoknad) {
            datoManglendeVedlegg = originalSoknad.innsendtDato;
        }
        if (ettersendelser && ettersendelser.length > 0) {
            datoManglendeVedlegg = ettersendelser[ettersendelser.length - 1].innsendtDato;
        }
        return datoManglendeVedlegg;
    }

    antallManglendeVedlegg() {
        return this.props.manglendeVedlegg.filter((item: any) => {
            return !(item.type === "annet|annet");
        }).length;
    }

    isEttersendelseAktivert() {
        return this.props.originalSoknad != null && this.props.originalSoknad.orgnummer != null;
    }

    render() {
        const {originalSoknad, ettersendelser, nedetidstart, nedetidslutt, isNedetid} = this.props;
        const antallManglendeVedlegg = this.antallManglendeVedlegg();
        const datoManglendeVedlegg = this.manglendeVedleggDato();
        const ettersendelseAktivert = this.isEttersendelseAktivert();

        const opprettNyEttersendelseFeilet: boolean =
            this.props.feilKode === EttersendelseFeilkode.NY_ETTERSENDELSE_FEILET;

        return (
            <div className="ettersendelse">
                <BannerEttersendelse>
                    <FormattedMessage id="applikasjon.sidetittel" />
                </BannerEttersendelse>
                {isNedetid && (
                    <AlertStripe type="feil" style={{justifyContent: "center"}}>
                        <FormattedHTMLMessage
                            id="nedetid.alertstripe.ettersendelse"
                            values={{
                                nedetidstart: nedetidstart,
                                nedetidslutt: nedetidslutt,
                            }}
                        />
                    </AlertStripe>
                )}
                <div className="blokk-center panel ettersendelse__panel">
                    <p className="ettersendelse ingress">
                        <FormattedHTMLMessage id="ettersendelse.ingress" />
                    </p>

                    {originalSoknad && (
                        <AvsnittMedMarger
                            venstreIkon={MargIkoner.OK}
                            hoyreIkon={MargIkoner.PRINTER}
                            onClickHoyreIkon={() => this.skrivUt()}
                        >
                            <h3>
                                <FormattedHTMLMessage id="ettersendelse.soknad_sendt" /> {originalSoknad.navenhet}{" "}
                                kommune
                            </h3>
                            <p>
                                Innsendt {originalSoknad.innsendtDato} kl. {originalSoknad.innsendtTidspunkt}
                            </p>
                        </AvsnittMedMarger>
                    )}

                    {ettersendelser &&
                        ettersendelser.length > 0 &&
                        ettersendelser.map((ettersendelse: any) => {
                            return (
                                <AvsnittMedMarger venstreIkon={MargIkoner.OK} key={ettersendelse.behandlingsId}>
                                    <h3>
                                        <FormattedHTMLMessage id="ettersendelse.vedlegg_sendt" />
                                    </h3>
                                    <p>
                                        <FormattedHTMLMessage
                                            id="ettersendelse.dato_tid"
                                            values={{
                                                dato: ettersendelse.innsendtDato,
                                                tid: ettersendelse.innsendtTidspunkt,
                                            }}
                                        />
                                    </p>
                                </AvsnittMedMarger>
                            );
                        })}

                    {opprettNyEttersendelseFeilet && !isNedetid && (
                        <SoknadEttersendelseFeilerHotjarTrigger>
                            <AvsnittMedMarger className="ettersendelse__vedlegg__header">
                                <Informasjonspanel ikon={InformasjonspanelIkon.HENSYN} farge={DigisosFarge.VIKTIG}>
                                    <FormattedHTMLMessage id="ettersendelse.ikke.mulig" />
                                </Informasjonspanel>
                            </AvsnittMedMarger>
                        </SoknadEttersendelseFeilerHotjarTrigger>
                    )}
                    {!opprettNyEttersendelseFeilet && (
                        <EttersendelseEkspanderbart
                            kunGenerellDokumentasjon={antallManglendeVedlegg === 0}
                            ettersendelseAktivert={ettersendelseAktivert}
                            onEttersendelse={() => this.onEttersendelseSendt()}
                        >
                            {antallManglendeVedlegg > 0 && (
                                <span>
                                    <h3>Vedlegg mangler</h3>
                                    <div>{datoManglendeVedlegg}</div>
                                </span>
                            )}
                            {antallManglendeVedlegg === 0 && (
                                <h3>
                                    <FormattedHTMLMessage id="ettersendelse.generell.dokumentasjon" />
                                </h3>
                            )}
                        </EttersendelseEkspanderbart>
                    )}

                    <AvsnittMedMarger venstreIkon={MargIkoner.SNAKKEBOBLER}>
                        <h3>
                            <FormattedHTMLMessage id="ettersendelse.samtale.tittel" />
                        </h3>
                        <p>
                            <FormattedHTMLMessage id="ettersendelse.samtale.info" />
                        </p>
                    </AvsnittMedMarger>

                    <AvsnittMedMarger venstreIkon={MargIkoner.KONVOLUTT}>
                        <h3>
                            <FormattedHTMLMessage id="ettersendelse.vedtak.tittel" />
                        </h3>
                        <p>
                            <FormattedHTMLMessage id="ettersendelse.vedtak.info" />
                        </p>
                    </AvsnittMedMarger>
                </div>
                <span>
                    <Prompt
                        message={(loc) => {
                            return erEttersendelseSide(loc.pathname) ? true : NAVIGASJONSPROMT.ETTERSENDELSE;
                        }}
                    />
                    <SoknadAlleredeSendtPromt />
                </span>
            </div>
        );
    }
}

export default connect((state: State) => {
    return {
        brukerbehandlingskjedeId: state.soknad.behandlingsId,
        manglendeVedlegg: state.ettersendelse.data,
        brukerbehandlingId: state.ettersendelse.brukerbehandlingId,
        originalSoknad: state.ettersendelse.innsendte.originalSoknad,
        ettersendelser: state.ettersendelse.innsendte.ettersendelser,
        restStatus: state.ettersendelse.restStatus,
        feilKode: state.ettersendelse.feilKode,
        nedetidstart: state.soknad.nedetid ? state.soknad.nedetid.nedetidStartText : "",
        nedetidslutt: state.soknad.nedetid ? state.soknad.nedetid.nedetidSluttText : "",
        isNedetid: state.soknad.nedetid ? state.soknad.nedetid.isNedetid : false,
        isPlanlagtNedetid: state.soknad.nedetid ? state.soknad.nedetid.isPlanlagtNedetid : false,
    };
})(Ettersendelse);

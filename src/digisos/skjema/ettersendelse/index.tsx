import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
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
import HotjarTriggerEttersendelse from "../../../nav-soknad/components/hotjarTrigger/HotjarTriggerEttersendelse";
import {Undertittel} from "nav-frontend-typografi";
import DocumentTitle from "react-document-title";

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

    componentDidUpdate() {
        if (this.hasUndeliveredFiles()) {
            window.addEventListener("beforeunload", this.alertUser);
        } else {
            window.removeEventListener("beforeunload", this.alertUser);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.alertUser);
    }

    alertUser(event: any) {
        event.preventDefault();
        event.returnValue = "";
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

    antallManglendeVedlegg() {
        return this.props.manglendeVedlegg.filter((item: any) => {
            return !(item.type === "annet|annet");
        }).length;
    }

    isEttersendelseAktivert() {
        return this.props.originalSoknad != null && this.props.originalSoknad.orgnummer != null;
    }

    hasUndeliveredFiles() {
        return this.props.manglendeVedlegg.filter((vedlegg) => vedlegg.filer.length > 0).length > 0;
    }

    render() {
        const {originalSoknad, ettersendelser, nedetidstart, nedetidslutt, isNedetid} = this.props;
        const antallManglendeVedlegg = this.antallManglendeVedlegg();
        const ettersendelseAktivert = this.isEttersendelseAktivert();

        const opprettNyEttersendelseFeilet: boolean =
            this.props.feilKode === EttersendelseFeilkode.NY_ETTERSENDELSE_FEILET;

        return (
            <div className="ettersendelse">
                <DocumentTitle title={`Ettersendelse - Søknad om økonomisk sosialhjelp`} />
                <BannerEttersendelse>
                    <FormattedMessage id="applikasjon.sidetittel" />
                </BannerEttersendelse>
                {isNedetid && (
                    <AlertStripe type="feil" style={{justifyContent: "center"}}>
                        <FormattedMessage
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
                        <FormattedMessage id="ettersendelse.ingress" />
                    </p>

                    {originalSoknad && (
                        <AvsnittMedMarger
                            venstreIkon={MargIkoner.OK}
                            hoyreIkon={MargIkoner.PRINTER}
                            onClickHoyreIkon={() => this.skrivUt()}
                        >
                            <Undertittel>
                                <FormattedMessage id="ettersendelse.soknad_sendt" /> {originalSoknad.navenhet} kommune
                            </Undertittel>
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
                                    <Undertittel>
                                        <FormattedMessage id="ettersendelse.vedlegg_sendt" />
                                    </Undertittel>
                                    <p>
                                        <FormattedMessage
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

                    <HotjarTriggerEttersendelse
                        opprettNyEttersendelseFeilet={opprettNyEttersendelseFeilet}
                        originalSoknad={originalSoknad}
                    />

                    {opprettNyEttersendelseFeilet && !isNedetid && (
                        <AvsnittMedMarger className="ettersendelse__vedlegg__header">
                            <Informasjonspanel ikon={InformasjonspanelIkon.HENSYN} farge={DigisosFarge.VIKTIG}>
                                <FormattedMessage id="ettersendelse.ikke.mulig" />
                            </Informasjonspanel>
                        </AvsnittMedMarger>
                    )}
                    {!opprettNyEttersendelseFeilet && (
                        <EttersendelseEkspanderbart
                            kunGenerellDokumentasjon={antallManglendeVedlegg === 0}
                            ettersendelseAktivert={ettersendelseAktivert}
                            onEttersendelse={() => this.onEttersendelseSendt()}
                        >
                            {antallManglendeVedlegg > 0 && (
                                <span>
                                    <Undertittel>Vedlegg mangler</Undertittel>
                                    <p>Det gjenstår {antallManglendeVedlegg} vedlegg</p>
                                </span>
                            )}
                            {antallManglendeVedlegg === 0 && (
                                <Undertittel>
                                    <FormattedMessage id="ettersendelse.generell.dokumentasjon" />
                                </Undertittel>
                            )}
                        </EttersendelseEkspanderbart>
                    )}

                    <AvsnittMedMarger venstreIkon={MargIkoner.SNAKKEBOBLER}>
                        <Undertittel>
                            <FormattedMessage id="ettersendelse.samtale.tittel" />
                        </Undertittel>
                        <p>
                            <FormattedMessage
                                id="ettersendelse.samtale.info.v2"
                                values={{
                                    a: (msg: string) => (
                                        <a href="https://www.nav.no/sosialhjelp/slik-foregar-et-mote">{msg}</a>
                                    ),
                                }}
                            />
                        </p>
                    </AvsnittMedMarger>

                    <AvsnittMedMarger venstreIkon={MargIkoner.KONVOLUTT}>
                        <Undertittel>
                            <FormattedMessage id="ettersendelse.vedtak.tittel" />
                        </Undertittel>
                        <p>
                            <FormattedMessage id="ettersendelse.vedtak.info" />
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

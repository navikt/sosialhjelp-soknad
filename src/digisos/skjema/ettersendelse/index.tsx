import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage} from "react-intl";
import {State} from "../../redux/reducers";
import React, {useEffect} from "react";
import BannerEttersendelse from "./bannerEttersendelse";
import {lesEttersendelser, opprettEttersendelse} from "../../redux/ettersendelse/ettersendelseActions";
import AvsnittMedMarger from "./avsnittMedMarger";
import EttersendelseEkspanderbart from "./ettersendelseEkspanderbart";
import {MargIkoner} from "./margIkoner";
import {visToppMeny} from "../../../nav-soknad/utils/domUtils";
import {EttersendelseFeilkode} from "../../redux/ettersendelse/ettersendelseTypes";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";
import {Prompt} from "react-router";
import {erEttersendelseSide, NAVIGASJONSPROMT} from "../../../nav-soknad/utils";
import SoknadAlleredeSendtPromt from "../../../nav-soknad/components/soknadAlleredeSendtPromt/SoknadAlleredeSendtPromt";
import HotjarTriggerEttersendelse from "../../../nav-soknad/components/hotjarTrigger/HotjarTriggerEttersendelse";
import {Undertittel} from "nav-frontend-typografi";
import {useTitle} from "../../../nav-soknad/hooks/useTitle";
import {Alert, Link} from "@navikt/ds-react";

const lesBrukerbehandlingskjedeId = (behandlingsId?: string) => {
    if (!behandlingsId) {
        const match = window.location.pathname.match(/\/skjema\/(.*)\/ettersendelse/);
        if (match) {
            return match[1];
        }
    }
    return behandlingsId;
};

const Ettersendelse = () => {
    const dispatch = useDispatch();

    const {behandlingsId, nedetid} = useSelector((state: State) => state.soknad);
    const {data, feilKode} = useSelector((state: State) => state.ettersendelse);
    const {originalSoknad, ettersendelser} = useSelector((state: State) => state.ettersendelse.innsendte);

    useTitle("Ettersendelse - Søknad om økonomisk sosialhjelp");

    useEffect(() => {
        visToppMeny();
        const brukerbehandlingskjedeId = lesBrukerbehandlingskjedeId(behandlingsId);
        if (brukerbehandlingskjedeId) {
            dispatch(opprettEttersendelse(brukerbehandlingskjedeId));
            dispatch(lesEttersendelser(brukerbehandlingskjedeId));
        }
    }, [behandlingsId, dispatch]);

    useEffect(() => {
        if (data.filter((vedlegg) => vedlegg.filer.length > 0).length > 0) {
            window.addEventListener("beforeunload", alertUser);
        }
        return function unload() {
            window.removeEventListener("beforeunload", alertUser);
        };
    }, [data]);

    const alertUser = (event: any) => {
        event.preventDefault();
        event.returnValue = "";
    };

    const skrivUt = () => {
        window.print();
    };

    const onEttersendelseSendt = () => {
        const brukerbehandlingskjedeId = lesBrukerbehandlingskjedeId(behandlingsId);
        if (brukerbehandlingskjedeId) {
            dispatch(opprettEttersendelse(brukerbehandlingskjedeId));
            dispatch(lesEttersendelser(brukerbehandlingskjedeId));
        }
    };

    const antallManglendeVedlegg = () => {
        return data.filter((item: any) => {
            return !(item.type === "annet|annet");
        }).length;
    };

    const isEttersendelseAktivert = () => {
        return originalSoknad != null && originalSoknad.orgnummer != null;
    };

    const opprettNyEttersendelseFeilet: boolean = feilKode === EttersendelseFeilkode.NY_ETTERSENDELSE_FEILET;

    return (
        <div className="ettersendelse">
            <BannerEttersendelse>
                <FormattedMessage id="applikasjon.sidetittel" />
            </BannerEttersendelse>
            {nedetid?.isNedetid && (
                <Alert variant="error" style={{justifyContent: "center"}}>
                    <FormattedMessage
                        id="nedetid.alertstripe.ettersendelse"
                        values={{
                            nedetidstart: nedetid?.nedetidStartText,
                            nedetidslutt: nedetid?.nedetidSluttText,
                        }}
                    />
                </Alert>
            )}
            <div className="blokk-center panel ettersendelse__panel">
                <p className="ettersendelse ingress">
                    <FormattedMessage id="ettersendelse.ingress" />
                </p>

                {originalSoknad && (
                    <AvsnittMedMarger
                        venstreIkon={MargIkoner.OK}
                        hoyreIkon={MargIkoner.PRINTER}
                        onClickHoyreIkon={() => skrivUt()}
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
                    originalSoknad={originalSoknad ?? undefined}
                />

                {opprettNyEttersendelseFeilet && !nedetid?.isNedetid && (
                    <AvsnittMedMarger>
                        <Informasjonspanel ikon={InformasjonspanelIkon.HENSYN} farge={DigisosFarge.VIKTIG}>
                            <FormattedMessage id="ettersendelse.ikke.mulig" />
                        </Informasjonspanel>
                    </AvsnittMedMarger>
                )}
                {!opprettNyEttersendelseFeilet && (
                    <EttersendelseEkspanderbart
                        kunGenerellDokumentasjon={antallManglendeVedlegg() === 0}
                        ettersendelseAktivert={isEttersendelseAktivert()}
                        onEttersendelse={() => onEttersendelseSendt()}
                    >
                        {antallManglendeVedlegg() > 0 && (
                            <span>
                                <Undertittel>Vedlegg mangler</Undertittel>
                                <p>Det gjenstår {antallManglendeVedlegg} vedlegg</p>
                            </span>
                        )}
                        {antallManglendeVedlegg() === 0 && (
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
                                    <Link href="https://www.nav.no/sosialhjelp/slik-foregar-et-mote">{msg}</Link>
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
};

export default Ettersendelse;

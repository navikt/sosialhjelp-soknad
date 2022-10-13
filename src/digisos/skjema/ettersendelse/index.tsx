import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage} from "react-intl";
import {State} from "../../redux/reducers";
import React, {useEffect} from "react";
import AppBanner from "./appBanner";
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
import {useTitle} from "../../../nav-soknad/hooks/useTitle";
import {Alert, BodyShort, Heading, Ingress, Link} from "@navikt/ds-react";
import {BlokkCenter} from "./BlokkCenter";

export const lesBrukerbehandlingskjedeId = (behandlingsId?: string) => {
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
            <AppBanner />
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
            <BlokkCenter>
                <Ingress spacing>
                    <FormattedMessage id="ettersendelse.ingress" />
                </Ingress>

                {originalSoknad && (
                    <AvsnittMedMarger
                        venstreIkon={MargIkoner.OK}
                        hoyreIkon={MargIkoner.PRINTER}
                        onClickHoyreIkon={() => skrivUt()}
                    >
                        <Heading level="2" size="small">
                            <FormattedMessage id="ettersendelse.soknad_sendt" /> {originalSoknad.navenhet} kommune
                        </Heading>
                        <BodyShort>
                            Innsendt {originalSoknad.innsendtDato} kl. {originalSoknad.innsendtTidspunkt}
                        </BodyShort>
                    </AvsnittMedMarger>
                )}

                {ettersendelser &&
                    ettersendelser.length > 0 &&
                    ettersendelser.map((ettersendelse: any) => {
                        return (
                            <AvsnittMedMarger venstreIkon={MargIkoner.OK} key={ettersendelse.behandlingsId}>
                                <Heading level="2" size="small">
                                    <FormattedMessage id="ettersendelse.vedlegg_sendt" />
                                </Heading>
                                <BodyShort>
                                    <FormattedMessage
                                        id="ettersendelse.dato_tid"
                                        values={{
                                            dato: ettersendelse.innsendtDato,
                                            tid: ettersendelse.innsendtTidspunkt,
                                        }}
                                    />
                                </BodyShort>
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
                    >
                        {antallManglendeVedlegg() > 0 && (
                            <span>
                                <Heading level="2" size="small">
                                    Vedlegg mangler
                                </Heading>
                                <BodyShort>Det gjenstår {antallManglendeVedlegg} vedlegg</BodyShort>
                            </span>
                        )}
                        {antallManglendeVedlegg() === 0 && (
                            <Heading level="2" size="small">
                                <FormattedMessage id="ettersendelse.generell.dokumentasjon" />
                            </Heading>
                        )}
                    </EttersendelseEkspanderbart>
                )}

                <AvsnittMedMarger venstreIkon={MargIkoner.SNAKKEBOBLER}>
                    <Heading level="2" size="small" spacing>
                        <FormattedMessage id="ettersendelse.samtale.tittel" />
                    </Heading>
                    <BodyShort>
                        <FormattedMessage
                            id="ettersendelse.samtale.info.v2"
                            values={{
                                a: (msg: string) => (
                                    <Link href="https://www.nav.no/sosialhjelp/slik-foregar-et-mote">{msg}</Link>
                                ),
                            }}
                        />
                    </BodyShort>
                </AvsnittMedMarger>

                <AvsnittMedMarger venstreIkon={MargIkoner.KONVOLUTT}>
                    <Heading level="2" size="small" spacing>
                        <FormattedMessage id="ettersendelse.vedtak.tittel" />
                    </Heading>
                    <BodyShort>
                        <FormattedMessage id="ettersendelse.vedtak.info" />
                    </BodyShort>
                </AvsnittMedMarger>
            </BlokkCenter>
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

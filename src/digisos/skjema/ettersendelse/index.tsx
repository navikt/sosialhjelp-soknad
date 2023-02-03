import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage} from "react-intl";
import {State} from "../../redux/reducers";
import React, {useEffect} from "react";
import BannerEttersendelse from "./bannerEttersendelse";
import {lesEttersendelser, opprettEttersendelse} from "../../redux/ettersendelse/ettersendelseActions";
import AvsnittMedMarger from "./avsnittMedMarger";
import EttersendelseEkspanderbart from "./ettersendelseEkspanderbart";
import {MargIkoner} from "./margIkoner";
import {EttersendelseFeilkode} from "../../redux/ettersendelse/ettersendelseTypes";
import Informasjonspanel from "../../../nav-soknad/components/Informasjonspanel";
import {useParams} from "react-router";
import SoknadAlleredeSendtPrompt from "../../../nav-soknad/components/soknadAlleredeSendtPromt/SoknadAlleredeSendtPrompt";
import HotjarTriggerEttersendelse from "../../../nav-soknad/components/hotjarTrigger/HotjarTriggerEttersendelse";
import {useTitle} from "../../../nav-soknad/hooks/useTitle";
import {BodyShort, Heading, Ingress, Link} from "@navikt/ds-react";
import {BlokkCenter} from "./BlokkCenter";
import {NedetidPanel} from "../../../components/common/NedetidPanel";
import {useTranslation} from "react-i18next";

type EttersendelseParams = Record<"behandlingsId", string>;

const Ettersendelse = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation("skjema");

    const params = useParams<EttersendelseParams>();
    const {behandlingsId, nedetid} = useSelector((state: State) => state.soknad);
    const {data, feilKode} = useSelector((state: State) => state.ettersendelse);
    const {originalSoknad, ettersendelser} = useSelector((state: State) => state.ettersendelse.innsendte);

    useTitle("Ettersendelse - Søknad om økonomisk sosialhjelp");

    useEffect(() => {
        if (!params.behandlingsId) return;

        dispatch(opprettEttersendelse(params.behandlingsId));
        dispatch(lesEttersendelser(params.behandlingsId));
    }, [behandlingsId, dispatch, params]);

    useEffect(() => {
        if (data.filter((vedlegg) => vedlegg.filer.length).length) {
            window.addEventListener("beforeunload", alertUser);
        }
        return () => window.removeEventListener("beforeunload", alertUser);
    }, [data]);

    const alertUser = (event: any) => {
        event.preventDefault();
        event.returnValue = "";
    };

    const skrivUt = () => window.print();

    const antallManglendeVedlegg = () => data.filter(({type}) => type !== "annet|annet").length;
    const isEttersendelseAktivert = () => !!originalSoknad?.orgnummer;
    const opprettNyEttersendelseFeilet = feilKode === EttersendelseFeilkode.NY_ETTERSENDELSE_FEILET;

    return (
        <div className="ettersendelse">
            <BannerEttersendelse>{t("applikasjon.sidetittel")}</BannerEttersendelse>
            <NedetidPanel varselType={"ettersendelse"} />
            <BlokkCenter>
                <Ingress spacing>{t("ettersendelse.ingress")}</Ingress>

                {originalSoknad && (
                    <AvsnittMedMarger
                        venstreIkon={MargIkoner.OK}
                        hoyreIkon={MargIkoner.PRINTER}
                        onClickHoyreIkon={() => skrivUt()}
                    >
                        <Heading level="2" size="small">
                            {t("ettersendelse.soknad_sendt")} {originalSoknad.navenhet} kommune
                        </Heading>
                        <BodyShort>
                            Innsendt {originalSoknad.innsendtDato} kl. {originalSoknad.innsendtTidspunkt}
                        </BodyShort>
                    </AvsnittMedMarger>
                )}

                {ettersendelser?.map(({behandlingsId, innsendtTidspunkt, innsendtDato}) => (
                    <AvsnittMedMarger venstreIkon={MargIkoner.OK} key={behandlingsId}>
                        <Heading level="2" size="small">
                            {t("ettersendelse.vedlegg_sendt")}
                        </Heading>
                        <BodyShort>
                            {t("ettersendelse.dato_tid", {
                                dato: innsendtDato,
                                tid: innsendtTidspunkt,
                            })}
                        </BodyShort>
                    </AvsnittMedMarger>
                ))}

                <HotjarTriggerEttersendelse
                    opprettNyEttersendelseFeilet={opprettNyEttersendelseFeilet}
                    originalSoknad={originalSoknad ?? undefined}
                />

                {opprettNyEttersendelseFeilet && !nedetid?.isNedetid && (
                    <AvsnittMedMarger>
                        <Informasjonspanel ikon={"hensyn"} farge="viktig">
                            {t("ettersendelse.ikke.mulig")}
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
                                <BodyShort>Det gjenstår {antallManglendeVedlegg()} vedlegg</BodyShort>
                            </span>
                        )}
                        {antallManglendeVedlegg() === 0 && (
                            <Heading level="2" size="small">
                                {t("ettersendelse.generell.dokumentasjon")}
                            </Heading>
                        )}
                    </EttersendelseEkspanderbart>
                )}

                <AvsnittMedMarger venstreIkon={MargIkoner.SNAKKEBOBLER}>
                    <Heading level="2" size="small" spacing>
                        {t("ettersendelse.samtale.tittel")}
                    </Heading>
                    <BodyShort>
                        <FormattedMessage
                            id="ettersendelse.samtale.info.v2"
                            values={{
                                a: (msg) => (
                                    <Link href="https://www.nav.no/sosialhjelp/slik-foregar-et-mote">{msg}</Link>
                                ),
                            }}
                        />
                    </BodyShort>
                </AvsnittMedMarger>

                <AvsnittMedMarger venstreIkon={MargIkoner.KONVOLUTT}>
                    <Heading level="2" size="small" spacing>
                        {t("ettersendelse.vedtak.tittel")}
                    </Heading>
                    <BodyShort>{t("ettersendelse.vedtak.info")}</BodyShort>
                </AvsnittMedMarger>
            </BlokkCenter>
            <span>
                <SoknadAlleredeSendtPrompt />
            </span>
        </div>
    );
};

export default Ettersendelse;

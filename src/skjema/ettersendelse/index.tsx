import {useDispatch, useSelector} from "react-redux";
import {State} from "../../digisos/redux/reducers";
import React, {useEffect} from "react";
import BannerEttersendelse from "./bannerEttersendelse";
import {lesEttersendelser, opprettEttersendelse} from "../../digisos/redux/ettersendelse/ettersendelseActions";
import AvsnittMedMargerEttersendelse from "./avsnittMedMargerEttersendelse";
import EttersendelseEkspanderbart from "./ettersendelseEkspanderbart";
import {EttersendelseFeilkode} from "../../digisos/redux/ettersendelse/ettersendelseTypes";
import Informasjonspanel from "../../nav-soknad/components/Informasjonspanel";
import SoknadAlleredeSendtPrompt from "../../nav-soknad/components/soknadAlleredeSendtPromt/SoknadAlleredeSendtPrompt";
import HotjarTriggerEttersendelse from "../../nav-soknad/components/hotjarTrigger/HotjarTriggerEttersendelse";
import {useTitle} from "../../lib/hooks/useTitle";
import {BodyShort, Heading, Ingress, Link} from "@navikt/ds-react";
import {BlokkCenter} from "./BlokkCenter";
import {NedetidPanel} from "../../components/common/NedetidPanel";
import {Trans, useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {ExclamationmarkTriangleFillIcon} from "@navikt/aksel-icons";
const Ettersendelse = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation("skjema");

    const behandlingsId = useBehandlingsId();

    const {data, feilKode} = useSelector((state: State) => state.ettersendelse);
    const {originalSoknad, ettersendelser} = useSelector((state: State) => state.ettersendelse.innsendte);

    useTitle("Ettersendelse - Søknad om økonomisk sosialhjelp");

    useEffect(() => {
        dispatch(opprettEttersendelse(behandlingsId));
        dispatch(lesEttersendelser(behandlingsId));
    }, [behandlingsId, dispatch]);

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

    const antallManglendeVedlegg = data.filter(({type}) => type !== "annet|annet").length;
    const isEttersendelseAktivert = !!originalSoknad?.orgnummer;
    const opprettNyEttersendelseFeilet = feilKode === EttersendelseFeilkode.NY_ETTERSENDELSE_FEILET;

    return (
        <div className="ettersendelse">
            <BannerEttersendelse>{t("applikasjon.sidetittel")}</BannerEttersendelse>
            <NedetidPanel varselType={"ettersendelse"} />
            <BlokkCenter>
                <Ingress spacing>{t("ettersendelse.ingress")}</Ingress>

                {originalSoknad && (
                    <AvsnittMedMargerEttersendelse
                        venstreIkon={"ok"}
                        hoyreIkon={"printer"}
                        onClickHoyreIkon={window.print}
                    >
                        <Heading level="2" size="small">
                            {t("ettersendelse.soknad_sendt")} {originalSoknad.navenhet} {t("ettersendelse.kommune")}
                        </Heading>
                        <BodyShort>
                            {t("soknad.innsendt.dato_tid", {
                                originalSoknadDato: originalSoknad.innsendtDato,
                                originalSoknadTid: originalSoknad.innsendtTidspunkt,
                            })}
                        </BodyShort>
                    </AvsnittMedMargerEttersendelse>
                )}

                {ettersendelser?.map(({behandlingsId, innsendtTidspunkt, innsendtDato}) => (
                    <AvsnittMedMargerEttersendelse venstreIkon={"ok"} key={behandlingsId}>
                        <Heading level="2" size="small">
                            {t("ettersendelse.vedlegg_sendt")}
                        </Heading>
                        <BodyShort>
                            {t("ettersendelse.dato_tid", {
                                dato: innsendtDato,
                                tid: innsendtTidspunkt,
                            })}
                        </BodyShort>
                    </AvsnittMedMargerEttersendelse>
                ))}

                <HotjarTriggerEttersendelse
                    opprettNyEttersendelseFeilet={opprettNyEttersendelseFeilet}
                    originalSoknad={originalSoknad ?? undefined}
                />

                {opprettNyEttersendelseFeilet ? (
                    <AvsnittMedMargerEttersendelse>
                        <Informasjonspanel ikon={"hensyn"} farge="viktig">
                            {t("ettersendelse.ikke.mulig")}
                        </Informasjonspanel>
                    </AvsnittMedMargerEttersendelse>
                ) : (
                    <EttersendelseEkspanderbart
                        kunGenerellDokumentasjon={antallManglendeVedlegg === 0}
                        ettersendelseAktivert={isEttersendelseAktivert}
                    >
                        {!!antallManglendeVedlegg ? (
                            <>
                                <div className={"flex flex-row justify-between"}>
                                    <div className={"w-12 !text-[var(--a-icon-warning)]"}>
                                        <ExclamationmarkTriangleFillIcon title="Advarsel" fontSize="1.5rem" />
                                    </div>
                                    <Heading level="2" size="small" className={"grow whitespace-nowrap"}>
                                        {t("ettersendelse.vedlegg.mangler")}
                                    </Heading>
                                </div>
                                <BodyShort className={"pl-12"}>
                                    {t("ettersendelse.manglende.vedlegg", {antallManglende: antallManglendeVedlegg})}
                                </BodyShort>
                            </>
                        ) : (
                            <>
                                <Heading level="2" size="small">
                                    {t("ettersendelse.generell.dokumentasjon")}
                                </Heading>
                            </>
                        )}
                    </EttersendelseEkspanderbart>
                )}

                <AvsnittMedMargerEttersendelse venstreIkon={"snakkebobler"}>
                    <Heading level="2" size="small" spacing>
                        {t("ettersendelse.samtale.tittel")}
                    </Heading>
                    <BodyShort>
                        <Trans
                            t={t}
                            i18nKey={"ettersendelse.samtale.info.v2"}
                            components={{
                                lenke: <Link href="https://www.nav.no/sosialhjelp/slik-foregar-et-mote">{null}</Link>,
                            }}
                        />
                    </BodyShort>
                </AvsnittMedMargerEttersendelse>

                <AvsnittMedMargerEttersendelse venstreIkon={"konvolutt"}>
                    <Heading level="2" size="small" spacing>
                        {t("ettersendelse.vedtak.tittel")}
                    </Heading>
                    <BodyShort>{t("ettersendelse.vedtak.info")}</BodyShort>
                </AvsnittMedMargerEttersendelse>
            </BlokkCenter>
            <SoknadAlleredeSendtPrompt />
        </div>
    );
};

export default Ettersendelse;

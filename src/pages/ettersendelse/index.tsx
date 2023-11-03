import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {BannerEttersendelse} from "./bannerEttersendelse";
import {AvsnittMedMargerEttersendelse} from "./avsnittMedMargerEttersendelse";
import {EttersendelseEkspanderbart} from "./ettersendelseEkspanderbart";
import SoknadAlleredeSendtPrompt from "../../lib/components/soknadAlleredeSendtPromt/SoknadAlleredeSendtPrompt";
import {useTitle} from "../../lib/hooks/common/useTitle";
import {Alert, BodyShort, Heading, Ingress, Link} from "@navikt/ds-react";
import {BlokkCenter} from "./BlokkCenter";
import {NedetidPanel} from "../../lib/components/NedetidPanel";
import {Trans, useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {ExclamationmarkTriangleFillIcon} from "@navikt/aksel-icons";
import {State} from "../../lib/redux/reducers";
import {lesEttersendelser, opprettEttersendelse} from "../../lib/redux/ettersendelse/ettersendelseActions";
import {EttersendelseFeilkode} from "../../lib/redux/ettersendelse/ettersendelseTypes";
export const Ettersendelse = () => {
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
                            {t("innsendt.dato_tid", {
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

                {opprettNyEttersendelseFeilet ? (
                    <AvsnittMedMargerEttersendelse>
                        <Alert variant={"error"}>{t("ettersendelse.ikke.mulig")}</Alert>
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

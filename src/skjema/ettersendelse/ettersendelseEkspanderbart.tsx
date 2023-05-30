import React, {useEffect, useMemo, useState} from "react";
import AvsnittMedMargerEttersendelse from "./avsnittMedMargerEttersendelse";
import EttersendelseVedleggListe from "./ettersendelseVedleggListe";
import {Accordion, BodyShort} from "@navikt/ds-react";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../digisos/redux/reducers";
import {sendEttersendelse} from "../../digisos/redux/ettersendelse/ettersendelseActions";
import {useTranslation} from "react-i18next";

interface EttersendelseEkspanderbartProps {
    children: React.ReactNode;
    ettersendelseAktivert: boolean;
    kunGenerellDokumentasjon?: boolean;
}

const EttersendelseEkspanderbart = ({
    children,
    ettersendelseAktivert,
    kunGenerellDokumentasjon,
}: EttersendelseEkspanderbartProps) => {
    const [ekspandert, setEkspandert] = useState(false);
    const [advarselManglerVedlegg, setAdvarselManglerVedlegg] = useState(false);
    const {t} = useTranslation("skjema");

    const dispatch = useDispatch();

    const {brukerbehandlingId, data} = useSelector((state: State) => state.ettersendelse);

    const antallOpplastedeFiler = useMemo(
        () => data.map((vedlegg) => vedlegg.filer.length).reduce((a: number, b: number) => a + b),
        [data]
    );

    useEffect(() => {
        if (advarselManglerVedlegg && data && antallOpplastedeFiler > 0) {
            setAdvarselManglerVedlegg(false);
        }
    }, [advarselManglerVedlegg, data]);

    const toggleEkspandering = () => {
        setEkspandert(!ekspandert);
    };

    const onSendEttersendelse = () => {
        setAdvarselManglerVedlegg(antallOpplastedeFiler === 0);
        if (antallOpplastedeFiler && brukerbehandlingId) {
            dispatch(sendEttersendelse(brukerbehandlingId));
            setEkspandert(false);
        }
    };

    return (
        <Accordion>
            <Accordion.Item open={ekspandert}>
                <Accordion.Header className={"!border-b-0 !p-0 "} onClick={toggleEkspandering}>
                    {children}
                </Accordion.Header>
                <Accordion.Content className={"p-0"}>
                    <AvsnittMedMargerEttersendelse>
                        {!kunGenerellDokumentasjon &&
                            (ettersendelseAktivert ? (
                                <BodyShort spacing>{t("ettersendelse.mangler_info")}</BodyShort>
                            ) : (
                                <BodyShort spacing>{t("ettersendelse.mangler_info_manuell")}</BodyShort>
                            ))}
                    </AvsnittMedMargerEttersendelse>

                    <EttersendelseVedleggListe
                        ettersendelseAktivert={ettersendelseAktivert}
                        advarselManglerVedlegg={advarselManglerVedlegg}
                        onSendEttersendelse={onSendEttersendelse}
                    />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default EttersendelseEkspanderbart;

import React, {useEffect, useState} from "react";
import AvsnittMedMargerEttersendelse from "./avsnittMedMargerEttersendelse";
import EttersendelseVedleggListe from "./ettersendelseVedleggListe";
import {Accordion, BodyShort} from "@navikt/ds-react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../digisos/redux/reducers";
import {EttersendelseVedleggBackend} from "../../digisos/redux/ettersendelse/ettersendelseTypes";
import {sendEttersendelse} from "../../digisos/redux/ettersendelse/ettersendelseActions";
import {useTranslation} from "react-i18next";

const StyledAccordionHeader = styled(Accordion.Header)`
    padding: 0 1rem 0 0;
    border-bottom: none;
`;

const StyledAccordionContent = styled(Accordion.Content)`
    padding: 0;
`;

const getAntallOpplastedeFiler = (data: EttersendelseVedleggBackend[]) => {
    return data.map((vedlegg: any) => vedlegg.filer.length).reduce((a: number, b: number) => a + b);
};

interface Props {
    children: React.ReactNode;
    ettersendelseAktivert: boolean;
    kunGenerellDokumentasjon?: boolean;
}

const EttersendelseEkspanderbart = ({children, ettersendelseAktivert, kunGenerellDokumentasjon}: Props) => {
    const [ekspandert, setEkspandert] = useState(false);
    const [advarselManglerVedlegg, setAdvarselManglerVedlegg] = useState(false);
    const {t} = useTranslation("skjema");

    const dispatch = useDispatch();

    const {brukerbehandlingId, data} = useSelector((state: State) => state.ettersendelse);

    useEffect(() => {
        if (advarselManglerVedlegg && data && getAntallOpplastedeFiler(data) > 0) {
            setAdvarselManglerVedlegg(false);
        }
    }, [advarselManglerVedlegg, data]);

    const toggleEkspandering = () => {
        setEkspandert(!ekspandert);
    };

    const onSendEttersendelse = () => {
        const antallOpplastedeFiler = getAntallOpplastedeFiler(data);
        setAdvarselManglerVedlegg(antallOpplastedeFiler === 0);
        if (antallOpplastedeFiler && brukerbehandlingId) {
            dispatch(sendEttersendelse(brukerbehandlingId));
            setEkspandert(false);
        }
    };

    return (
        <Accordion>
            <Accordion.Item open={ekspandert}>
                <StyledAccordionHeader onClick={toggleEkspandering}>{children}</StyledAccordionHeader>
                <StyledAccordionContent>
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
                </StyledAccordionContent>
            </Accordion.Item>
        </Accordion>
    );
};

export default EttersendelseEkspanderbart;

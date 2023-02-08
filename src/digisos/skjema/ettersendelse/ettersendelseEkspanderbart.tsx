import React, {useEffect, useState} from "react";
import {FormattedMessage} from "react-intl";
import AvsnittMedMarger from "./avsnittMedMarger";
import EttersendelseVedleggListe from "./ettersendelseVedleggListe";
import {Accordion, BodyShort} from "@navikt/ds-react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../redux/reducers";
import {EttersendelseVedleggBackend} from "../../redux/ettersendelse/ettersendelseTypes";
import {sendEttersendelse} from "../../redux/ettersendelse/ettersendelseActions";

const StyledAccordionHeader = styled(Accordion.Header)`
    padding: 0 1rem 0 0;
    border-bottom: none;
`;

const StyledAccordionContent = styled(Accordion.Content)`
    padding: 0rem;
`;

const getAntallOpplastedeFiler = (data: EttersendelseVedleggBackend[]) => {
    return data.map((vedlegg: any) => vedlegg.filer.length).reduce((a: number, b: number) => a + b);
};

interface Props {
    children: React.ReactNode;
    ettersendelseAktivert: boolean;
    kunGenerellDokumentasjon?: boolean;
}

const EttersendelseEkspanderbart = (props: Props) => {
    const [ekspandert, setEkspandert] = useState(false);
    const [advarselManglerVedlegg, setAdvarselManglerVedlegg] = useState(false);

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
        if (antallOpplastedeFiler > 0) {
            if (brukerbehandlingId) {
                dispatch(sendEttersendelse(brukerbehandlingId));
                setEkspandert(false);
            }
        }
    };

    return (
        <Accordion>
            <Accordion.Item open={ekspandert}>
                <StyledAccordionHeader onClick={toggleEkspandering}>
                    {props.kunGenerellDokumentasjon && (
                        <AvsnittMedMarger venstreIkon={"dokumenter"}>{props.children}</AvsnittMedMarger>
                    )}

                    {!props.kunGenerellDokumentasjon && (
                        <AvsnittMedMarger venstreIkon={"advarsel"}>{props.children}</AvsnittMedMarger>
                    )}
                </StyledAccordionHeader>
                <StyledAccordionContent>
                    <AvsnittMedMarger>
                        {!props.kunGenerellDokumentasjon && props.ettersendelseAktivert && (
                            <BodyShort spacing>
                                <FormattedMessage id="ettersendelse.mangler_info" />
                            </BodyShort>
                        )}
                        {!props.ettersendelseAktivert && (
                            <BodyShort spacing>
                                <FormattedMessage id="ettersendelse.mangler_info_manuell" />
                            </BodyShort>
                        )}
                    </AvsnittMedMarger>

                    <EttersendelseVedleggListe
                        ettersendelseAktivert={props.ettersendelseAktivert}
                        advarselManglerVedlegg={advarselManglerVedlegg}
                        onSendEttersendelse={onSendEttersendelse}
                    />
                </StyledAccordionContent>
            </Accordion.Item>
        </Accordion>
    );
};

export default EttersendelseEkspanderbart;

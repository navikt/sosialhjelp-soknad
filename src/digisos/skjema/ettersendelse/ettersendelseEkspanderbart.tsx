import React, {useState} from "react";
import {FormattedMessage} from "react-intl";
import AvsnittMedMarger from "./avsnittMedMarger";
import {MargIkoner} from "./margIkoner";
import EttersendelseVedleggListe from "./ettersendelseVedleggListe";
import {Accordion} from "@navikt/ds-react";
import styled from "styled-components";

const StyledAccordionHeader = styled(Accordion.Header)`
    padding: 0 1rem 0 0;
    border-bottom: none;
`;
interface Props {
    children: React.ReactNode;
    ettersendelseAktivert: boolean;
    onEttersendelse: () => void;
    kunGenerellDokumentasjon?: boolean;
}

const EttersendelseEkspanderbart = (props: Props) => {
    const [ekspandert, setEkspandert] = useState(false);

    const toggleEkspandering = () => {
        setEkspandert(!ekspandert);
    };

    const onEttersendelseSetState = () => {
        setEkspandert(false);
        props.onEttersendelse();
    };

    return (
        <Accordion>
            <Accordion.Item open={ekspandert}>
                <StyledAccordionHeader onClick={toggleEkspandering}>
                    {props.kunGenerellDokumentasjon && (
                        <AvsnittMedMarger venstreIkon={MargIkoner.DOKUMENTER}>{props.children}</AvsnittMedMarger>
                    )}

                    {!props.kunGenerellDokumentasjon && (
                        <AvsnittMedMarger venstreIkon={MargIkoner.ADVARSEL}>{props.children}</AvsnittMedMarger>
                    )}
                </StyledAccordionHeader>
                <Accordion.Content>
                    <AvsnittMedMarger>
                        {!props.kunGenerellDokumentasjon && props.ettersendelseAktivert && (
                            <FormattedMessage id="ettersendelse.mangler_info" />
                        )}
                        {!props.ettersendelseAktivert && <FormattedMessage id="ettersendelse.mangler_info_manuell" />}
                    </AvsnittMedMarger>

                    <EttersendelseVedleggListe
                        ettersendelseAktivert={props.ettersendelseAktivert}
                        onEttersendelse={() => onEttersendelseSetState()}
                    />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default EttersendelseEkspanderbart;

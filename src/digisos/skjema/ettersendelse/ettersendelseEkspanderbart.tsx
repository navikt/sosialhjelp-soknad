import * as React from "react";
import {UnmountClosed} from "react-collapse";
import {FormattedMessage} from "react-intl";
import AvsnittMedMarger from "./avsnittMedMarger";
import {MargIkoner} from "./margIkoner";
import EttersendelseVedleggListe from "./ettersendelseVedleggListe";
import {useState} from "react";

interface Props {
    children: React.ReactNode;
    ettersendelseAktivert: boolean;
    onEttersendelse?: () => void;
    kunGenerellDokumentasjon?: boolean;
}

const EttersendelseEkspanderbart = (props: Props) => {
    const [ekspandert, setEkspandert] = useState(false);
    const [vedleggSendt, setVedleggSendt] = useState(false);
    const [renderInnhold, setRenderInnhold] = useState(false);

    const toggleEkspandering = () => {
        setEkspandert(!ekspandert);
    };

    const onAnimasjonFerdig = () => {
        if (vedleggSendt === true && ekspandert === false && props.onEttersendelse) {
            setVedleggSendt(false);
            props.onEttersendelse();
        }

        if (renderInnhold !== ekspandert) {
            setRenderInnhold(ekspandert);
        }
    };

    const onEttersendelseSetState = () => {
        setEkspandert(false);
        setVedleggSendt(false);
    };

    return (
        <span className="ettersendelse__vedlegg__ekspandert_wrapper">
            {props.kunGenerellDokumentasjon && (
                <AvsnittMedMarger
                    venstreIkon={MargIkoner.DOKUMENTER}
                    hoyreIkon={ekspandert ? MargIkoner.CHEVRON_OPP : MargIkoner.CHEVRON_NED}
                    onClick={() => toggleEkspandering()}
                >
                    {props.children}
                </AvsnittMedMarger>
            )}

            {!props.kunGenerellDokumentasjon && (
                <AvsnittMedMarger
                    venstreIkon={MargIkoner.ADVARSEL}
                    hoyreIkon={ekspandert ? MargIkoner.CHEVRON_OPP : MargIkoner.CHEVRON_NED}
                    onClick={() => toggleEkspandering()}
                >
                    {props.children}
                </AvsnittMedMarger>
            )}

            <UnmountClosed
                isOpened={ekspandert}
                onRest={() => onAnimasjonFerdig()}
                className={"ettersendelse__vedlegg " + (ekspandert ? "ettersendelse__vedlegg__ekspandert " : " ")}
            >
                {renderInnhold && (
                    <>
                        <AvsnittMedMarger className="ettersendelse__vedlegg__header">
                            {!props.kunGenerellDokumentasjon && props.ettersendelseAktivert && (
                                <FormattedMessage id="ettersendelse.mangler_info" />
                            )}
                            {!props.ettersendelseAktivert && (
                                <FormattedMessage id="ettersendelse.mangler_info_manuell" />
                            )}
                        </AvsnittMedMarger>

                        <EttersendelseVedleggListe
                            ettersendelseAktivert={props.ettersendelseAktivert}
                            onEttersendelse={() => onEttersendelseSetState()}
                        />
                    </>
                )}
            </UnmountClosed>
        </span>
    );
};

export default EttersendelseEkspanderbart;

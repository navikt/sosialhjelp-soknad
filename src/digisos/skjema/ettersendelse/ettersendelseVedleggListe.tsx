import React, {useState, useEffect} from "react";
import AvsnittMedMarger from "./avsnittMedMarger";
import EttersendelseVedlegg from "./ettersendelseVedlegg";
import {FormattedMessage, useIntl} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../redux/reducers";
import {sendEttersendelse} from "../../redux/ettersendelse/ettersendelseActions";
import {EttersendelseVedleggBackend} from "../../redux/ettersendelse/ettersendelseTypes";
import {getSpcForOpplysning} from "../../redux/okonomiskeOpplysninger/opplysningerUtils";
import {REST_STATUS} from "../../redux/soknad/soknadTypes";
import {Button, Loader} from "@navikt/ds-react";

const getAntallOpplastedeFiler = (data: EttersendelseVedleggBackend[]) => {
    return data.map((vedlegg: any) => vedlegg.filer.length).reduce((a: number, b: number) => a + b);
};

const EttersendelseVedleggListe = (props: {ettersendelseAktivert: boolean; onEttersendelse?: () => void}) => {
    const {onEttersendelse} = props;
    const [advarselManglerVedlegg, setAdvarselManglerVedlegg] = useState(false);

    const {brukerbehandlingId, data, ettersendStatus, opplastingStatus, feiletVedleggId, feilKode} = useSelector(
        (state: State) => state.ettersendelse
    );

    const dispatch = useDispatch();

    const intl = useIntl();

    const onSendEttersendelse = () => {
        const antallOpplastedeFiler = getAntallOpplastedeFiler(data);
        setAdvarselManglerVedlegg(antallOpplastedeFiler === 0);
        if (antallOpplastedeFiler > 0) {
            if (brukerbehandlingId) {
                dispatch(sendEttersendelse(brukerbehandlingId));
            }
        }
    };

    useEffect(() => {
        if (advarselManglerVedlegg && data && getAntallOpplastedeFiler(data) > 0) {
            setAdvarselManglerVedlegg(false);
        }
    }, [advarselManglerVedlegg, data]);

    useEffect(() => {
        if (ettersendStatus === REST_STATUS.OK && onEttersendelse) {
            onEttersendelse();
        }
    }, [ettersendStatus, onEttersendelse]);

    return (
        <div
            className={
                "ettersendelse__vedlegg__innhold " + (advarselManglerVedlegg ? "ettersendelse__vedlegg__feil " : "")
            }
        >
            {data &&
                data.map((vedlegg: EttersendelseVedleggBackend) => {
                    const spc = getSpcForOpplysning(vedlegg.type);
                    const tittelKey = spc ? spc.textKey + ".vedlegg.sporsmal.tittel" : "";
                    const infoKey = spc ? spc.textKey + ".vedlegg.sporsmal.info" : "";
                    let info;
                    if (infoKey && !!intl.messages[infoKey]) {
                        info = intl.formatMessage({id: infoKey});
                    }
                    if (!props.ettersendelseAktivert && vedlegg.type === "annet|annet") {
                        return null;
                    }
                    return (
                        <EttersendelseVedlegg
                            ettersendelseAktivert={props.ettersendelseAktivert}
                            vedlegg={vedlegg}
                            key={vedlegg.type}
                            feilKode={feiletVedleggId === vedlegg.type ? feilKode : undefined}
                        >
                            {tittelKey && (
                                <h3>
                                    <FormattedMessage id={tittelKey} />
                                </h3>
                            )}
                            {info && <p>{info}</p>}
                        </EttersendelseVedlegg>
                    );
                })}

            <AvsnittMedMarger className="ettersendelse_send_vedlegg_knapp_wrapper">
                {advarselManglerVedlegg && (
                    <>
                        <div className="skjema__feilmelding">
                            <FormattedMessage id="ettersendelse.feilmelding.ingen_vedlegg" />
                        </div>
                        <br />
                    </>
                )}

                <br />
                {props.ettersendelseAktivert && (
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={ettersendStatus === REST_STATUS.PENDING || opplastingStatus === REST_STATUS.PENDING}
                        onClick={() => onSendEttersendelse()}
                    >
                        Send vedlegg {ettersendStatus === REST_STATUS.PENDING && <Loader />}
                    </Button>
                )}
            </AvsnittMedMarger>
        </div>
    );
};

export default EttersendelseVedleggListe;

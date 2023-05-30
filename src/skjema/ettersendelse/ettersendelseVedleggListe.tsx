import React from "react";
import AvsnittMedMargerEttersendelse from "./avsnittMedMargerEttersendelse";
import EttersendelseVedlegg from "./ettersendelseVedlegg";
import {useSelector} from "react-redux";
import {State} from "../../digisos/redux/reducers";
import {EttersendelseVedleggBackend} from "../../digisos/redux/ettersendelse/ettersendelseTypes";
import {BodyShort, Button, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {REST_STATUS} from "../../digisos/redux/soknadsdata/soknadsdataTypes";

const EttersendelseVedleggListe = (props: {
    ettersendelseAktivert: boolean;
    advarselManglerVedlegg: boolean;
    onSendEttersendelse: () => void;
}) => {
    const {advarselManglerVedlegg} = props;

    const {data, ettersendStatus, opplastingStatus, feiletVedleggId, feilKode} = useSelector(
        (state: State) => state.ettersendelse
    );

    const {t} = useTranslation("skjema");

    return (
        <>
            <AvsnittMedMargerEttersendelse>
                {data?.map((vedlegg: EttersendelseVedleggBackend) =>
                    !props.ettersendelseAktivert && vedlegg.type === "annet|annet" ? null : (
                        <EttersendelseVedlegg
                            ettersendelseAktivert={props.ettersendelseAktivert}
                            vedlegg={vedlegg}
                            key={vedlegg.type}
                            feilKode={feiletVedleggId === vedlegg.type ? feilKode : undefined}
                        />
                    )
                )}
            </AvsnittMedMargerEttersendelse>
            <AvsnittMedMargerEttersendelse>
                {advarselManglerVedlegg && (
                    <BodyShort spacing className="skjema__feilmelding">
                        {t("ettersendelse.feilmelding.ingen_vedlegg")}
                    </BodyShort>
                )}
                {props.ettersendelseAktivert && (
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={ettersendStatus === REST_STATUS.PENDING || opplastingStatus === REST_STATUS.PENDING}
                        onClick={() => props.onSendEttersendelse()}
                    >
                        Send vedlegg {ettersendStatus === REST_STATUS.PENDING && <Loader />}
                    </Button>
                )}
            </AvsnittMedMargerEttersendelse>
        </>
    );
};

export default EttersendelseVedleggListe;

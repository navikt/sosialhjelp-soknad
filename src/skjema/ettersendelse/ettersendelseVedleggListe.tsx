import React from "react";
import AvsnittMedMarger from "./avsnittMedMarger";
import EttersendelseVedlegg from "./ettersendelseVedlegg";
import {useSelector} from "react-redux";
import {State} from "../../digisos/redux/reducers";
import {EttersendelseVedleggBackend} from "../../digisos/redux/ettersendelse/ettersendelseTypes";
import {BodyShort, Button, Heading, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {REST_STATUS} from "../../digisos/redux/soknadsdata/soknadsdataTypes";
import {opplysningSpec} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerConfig";

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
        <div>
            <AvsnittMedMarger>
                {data?.map((vedlegg: EttersendelseVedleggBackend) => {
                    const {textKey} = opplysningSpec[vedlegg.type];
                    const tittelKey = `${textKey}.vedlegg.sporsmal.tittel`;
                    const infoKey = `${textKey}.vedlegg.sporsmal.info`;

                    if (!props.ettersendelseAktivert && vedlegg.type === "annet|annet") return null;

                    return (
                        <EttersendelseVedlegg
                            ettersendelseAktivert={props.ettersendelseAktivert}
                            vedlegg={vedlegg}
                            key={vedlegg.type}
                            feilKode={feiletVedleggId === vedlegg.type ? feilKode : undefined}
                        >
                            <Heading level="3" size="xsmall" spacing>
                                {t(tittelKey)}
                            </Heading>
                            {<BodyShort spacing>{t(infoKey)}</BodyShort>}
                        </EttersendelseVedlegg>
                    );
                })}
            </AvsnittMedMarger>
            <AvsnittMedMarger>
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
            </AvsnittMedMarger>
        </div>
    );
};

export default EttersendelseVedleggListe;

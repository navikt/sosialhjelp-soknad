import React from "react";
import AvsnittMedMarger from "./avsnittMedMarger";
import EttersendelseVedlegg from "./ettersendelseVedlegg";
import {useSelector} from "react-redux";
import {State} from "../../digisos/redux/reducers";
import {EttersendelseVedleggBackend} from "../../digisos/redux/ettersendelse/ettersendelseTypes";
import {getSpcForOpplysning} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerUtils";
import {BodyShort, Button, Heading, Loader} from "@navikt/ds-react";
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
        <div>
            <AvsnittMedMarger>
                {data &&
                    data.map((vedlegg: EttersendelseVedleggBackend) => {
                        const spc = getSpcForOpplysning(vedlegg.type);
                        const tittelKey = spc ? `${spc.textKey}.vedlegg.sporsmal.tittel` : "";
                        const infoKey = spc ? `${spc.textKey}.vedlegg.sporsmal.info` : "";
                        let info;
                        // FIXME: I think this is broken
                        if (infoKey && !!t(infoKey)) {
                            info = t(infoKey);
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
                                    <Heading level="3" size="xsmall" spacing>
                                        {t(tittelKey)}
                                    </Heading>
                                )}
                                {info && <BodyShort spacing>{info}</BodyShort>}
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

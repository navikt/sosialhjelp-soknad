import React, {useState, useRef} from "react";
import {
    lastOppEttersendelseVedlegg,
    slettEttersendtVedlegg,
} from "../../digisos/redux/ettersendelse/ettersendelseActions";
import {useDispatch, useSelector} from "react-redux";
import {downloadAttachedFile} from "../../nav-soknad/utils/rest-utils";
import {EttersendelseVedleggBackend} from "../../digisos/redux/ettersendelse/ettersendelseTypes";
import {State} from "../../digisos/redux/reducers";
import {LinkButton} from "../../nav-soknad/components/linkButton/LinkButton";
import {BodyShort, Button, Heading, Loader} from "@navikt/ds-react";
import styled from "styled-components";
import {Delete} from "@navikt/ds-icons";
import {useTranslation} from "react-i18next";
import {REST_FEIL, REST_STATUS} from "../../digisos/redux/soknadsdata/soknadsdataTypes";
import {FilFrontend, VedleggFrontendType} from "../../generated/model";
import {logError} from "../../nav-soknad/utils/loggerUtils";
import {PaperclipIcon} from "@navikt/aksel-icons";
import {opplysningSpec, VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring} from "../../lib/opplysninger";

const VedleggsListe = styled.div`
    border-radius: 4px;
    background-color: white;
    padding: 0.5rem;
    text-align: left;
`;

const FilenameWrapper = styled.div`
    padding-bottom: 6px;
    border-bottom: 1px solid darkgrey;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
`;

interface Props {
    ettersendelseAktivert: boolean;
    vedlegg: EttersendelseVedleggBackend;
    feilKode?: string;
}

const EttersendelseVedlegg = ({vedlegg, ettersendelseAktivert, feilKode}: Props) => {
    const [filnavn, setFilnavn] = useState<string | null>(null);

    const {brukerbehandlingId, feiletVedleggId, opplastingStatus, ettersendStatus, opplastingVedleggType} = useSelector(
        (state: State) => state.ettersendelse
    );

    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();

    const leggTilVedleggKnapp = useRef<HTMLInputElement>(null);

    const removeFile = (filId: string, opplysningType: VedleggFrontendType) => {
        if (brukerbehandlingId) {
            dispatch(slettEttersendtVedlegg(brukerbehandlingId, filId, opplysningType));
        }
    };

    const handleFileUpload = (files: FileList | null) => {
        if (!files) {
            return;
        }
        if (files.length !== 1) {
            return;
        }
        const formData = new FormData();
        formData.append("file", files[0], files[0].name);
        setFilnavn(files[0].name);
        if (brukerbehandlingId) {
            dispatch(lastOppEttersendelseVedlegg(brukerbehandlingId, vedlegg.type, formData));
        }
        if (leggTilVedleggKnapp.current) {
            leggTilVedleggKnapp.current.value = "";
        }
    };

    const opplastingsFeil: boolean = opplastingStatus === REST_STATUS.FEILET && feiletVedleggId === vedlegg.type;
    const visFeilFiltypeFeilmelding: boolean = opplastingsFeil && feilKode === REST_FEIL.FEIL_FILTYPE;
    const tittelKey = (opplysningType: VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring) => {
        const key = `${opplysningSpec[opplysningType].textKey}.vedlegg.sporsmal.tittel`;
        return i18n.exists(key) ? t(key) : undefined;
    };

    const infoKey = (opplysningType: VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring) => {
        const key = `${opplysningSpec[opplysningType].textKey}.vedlegg.sporsmal.info`;
        return i18n.exists(key) ? t(key) : undefined;
    };
    return (
        <VedleggsListe>
            <Heading level="3" size="xsmall" spacing>
                {tittelKey(vedlegg.type)}
            </Heading>
            <BodyShort spacing>{infoKey(vedlegg.type)}</BodyShort>
            <input
                ref={leggTilVedleggKnapp}
                onChange={(e) => handleFileUpload(e.target.files)}
                type="file"
                className="visuallyhidden"
                tabIndex={-1}
                accept={
                    window.navigator.platform.match(/iPad|iPhone|iPod/) !== null
                        ? "*"
                        : "image/jpeg,image/png,application/pdf"
                }
            />
            {vedlegg?.filer.map((fil: FilFrontend) => {
                const lastNedUrl = `opplastetVedlegg/${fil.uuid}/fil`;
                return (
                    <FilenameWrapper key={fil.uuid}>
                        <div className="flex flex-row">
                            <LinkButton title="Last ned vedlegg" onClick={() => downloadAttachedFile(lastNedUrl)}>
                                <div className={"overflow-ellipsis whitespace-nowrap overflow-hidden"}>
                                    <PaperclipIcon className={"inline"} />
                                    {fil.filNavn}
                                </div>
                            </LinkButton>
                            <Button
                                variant="tertiary"
                                size="small"
                                title="Fjern vedlegg"
                                onClick={() => {
                                    if (!fil.uuid) logError("Prøvde fjerne vedlegg med nullish UUID!");
                                    return removeFile(fil.uuid || "", vedlegg.type);
                                }}
                            >
                                Fjern
                                <Delete />
                            </Button>
                        </div>
                    </FilenameWrapper>
                );
            })}
            {opplastingsFeil && feilKode !== REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR_ETTERSENDELSE && (
                <BodyShort spacing className="skjema__feilmelding">
                    &quot;{filnavn}&quot; &nbsp;
                    {visFeilFiltypeFeilmelding
                        ? t("fil.feil.format")
                        : t(feilKode ? feilKode : "opplysninger.vedlegg.ugyldig")}
                </BodyShort>
            )}
            {opplastingsFeil && feilKode === REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR_ETTERSENDELSE && (
                <BodyShort spacing className="skjema__feilmelding">
                    {t(feilKode)}
                </BodyShort>
            )}
            <Button
                variant="secondary"
                disabled={
                    ettersendStatus === REST_STATUS.PENDING ||
                    opplastingStatus === REST_STATUS.PENDING ||
                    vedlegg.type === opplastingVedleggType
                }
                onClick={() => ettersendelseAktivert && leggTilVedleggKnapp.current?.click()}
            >
                Velg vedlegg
                {vedlegg.type === opplastingVedleggType && <Loader />}
            </Button>
        </VedleggsListe>
    );
};

export default EttersendelseVedlegg;

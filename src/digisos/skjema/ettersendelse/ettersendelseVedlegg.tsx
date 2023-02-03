import React, {useState, useRef} from "react";
import {lastOppEttersendelseVedlegg, slettEttersendtVedlegg} from "../../redux/ettersendelse/ettersendelseActions";
import {useDispatch, useSelector} from "react-redux";
import {downloadAttachedFile} from "../../../nav-soknad/utils/rest-utils";
import {EttersendelseVedleggBackend} from "../../redux/ettersendelse/ettersendelseTypes";
import {Fil, OpplysningType} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {State} from "../../redux/reducers";
import {REST_FEIL, REST_STATUS} from "../../redux/soknad/soknadTypes";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";
import {BodyShort, Button, Loader} from "@navikt/ds-react";
import styled from "styled-components";
import {Attachment, Delete} from "@navikt/ds-icons";
import {useTranslation} from "react-i18next";

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

const Filnavn = styled.div`
    margin-left: 25px;
    margin-top: 7px;
    background-color: white;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-height: 1.3rem;
    color: #0067c5;

    @media screen and (min-width: 701px) {
        max-width: 400px;
    }

    @media screen and (max-width: 700px) {
        margin-left: 0rem;
        max-width: 50vw;
    }
`;

interface Props {
    ettersendelseAktivert: boolean;
    children: React.ReactNode;
    vedlegg: EttersendelseVedleggBackend;
    feilKode?: string;
}

const EttersendelseVedlegg = (props: Props) => {
    const [filnavn, setFilnavn] = useState<string | null>(null);

    const {brukerbehandlingId, feiletVedleggId, opplastingStatus, ettersendStatus, opplastingVedleggType} = useSelector(
        (state: State) => state.ettersendelse
    );

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const leggTilVedleggKnapp = useRef<HTMLInputElement>(null);

    const removeFile = (filId: string, opplysningType: OpplysningType) => {
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
            dispatch(lastOppEttersendelseVedlegg(brukerbehandlingId, props.vedlegg.type, formData));
        }
        if (leggTilVedleggKnapp.current) {
            leggTilVedleggKnapp.current.value = "";
        }
    };

    const opplastingsFeil: boolean = opplastingStatus === REST_STATUS.FEILET && feiletVedleggId === props.vedlegg.type;
    const visFeilFiltypeFeilmelding: boolean = opplastingsFeil && props.feilKode === REST_FEIL.FEIL_FILTPYE;

    return (
        <VedleggsListe>
            {props.children}
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
            {props.vedlegg?.filer.map((fil: Fil) => {
                const lastNedUrl = `opplastetVedlegg/${fil.uuid}/fil`;
                return (
                    <FilenameWrapper key={fil.uuid}>
                        <LinkButton title="Last ned vedlegg" onClick={() => downloadAttachedFile(lastNedUrl)}>
                            <Attachment />
                            <Filnavn>{fil.filNavn}</Filnavn>
                        </LinkButton>
                        <Button
                            variant="tertiary"
                            size="small"
                            title="Fjern vedlegg"
                            onClick={() => removeFile(fil.uuid, props.vedlegg.type)}
                        >
                            Fjern
                            <Delete />
                        </Button>
                    </FilenameWrapper>
                );
            })}

            {opplastingsFeil && props.feilKode !== REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR_ETTERSENDELSE && (
                <BodyShort spacing className="skjema__feilmelding">
                    "{filnavn}" &nbsp;
                    {visFeilFiltypeFeilmelding
                        ? t("fil.feil.format")
                        : t(props.feilKode ? props.feilKode : "opplysninger.vedlegg.ugyldig")}
                </BodyShort>
            )}

            {opplastingsFeil && props.feilKode === REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR_ETTERSENDELSE && (
                <BodyShort spacing className="skjema__feilmelding">
                    {t(props.feilKode)}
                </BodyShort>
            )}

            <Button
                variant="secondary"
                disabled={
                    ettersendStatus === REST_STATUS.PENDING ||
                    opplastingStatus === REST_STATUS.PENDING ||
                    props.vedlegg.type === opplastingVedleggType
                }
                onClick={() => props.ettersendelseAktivert && leggTilVedleggKnapp.current?.click()}
            >
                Velg vedlegg
                {props.vedlegg.type === opplastingVedleggType && <Loader />}
            </Button>
        </VedleggsListe>
    );
};

export default EttersendelseVedlegg;

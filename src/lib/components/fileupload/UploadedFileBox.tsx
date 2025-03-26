import {DokumentUpload} from "../../../generated/model";
import {useBehandlingsId} from "../../hooks/common/useBehandlingsId.ts";
import React, {useState} from "react";
import {BekreftSlettDokumentModal} from "../modals/BekreftSlettDokumentModal.tsx";
import {LinkButton} from "../LinkButton.tsx";
import digisosConfig from "../../config.ts";
import {BodyShort, Button} from "@navikt/ds-react";
import {TrashIcon} from "@navikt/aksel-icons";
import {useTranslation} from "react-i18next";
import {FilIllustrasjon} from "../svg/illustrasjoner/FilIllustrasjon.tsx";
import styled from "styled-components";

const StyledCircle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    svg {
        height: 1.5rem;
        width: 1.5rem;
    }
    background-color: var(--a-surface-neutral-subtle);
    color: var(--a-icon-default);
    border-radius: var(--a-border-radius-full);
    min-height: 3rem;
    min-width: 3rem;
    place-content: center;
    transition: background-color 250ms cubic-bezier(0, 0.3, 0.15, 1);
`;

const dokumentasjonsTypeTilTextKey: Record<string, string> = {
    "barnebidrag|betaler": "begrunnelse.kategorier.kortKategorier.barnebidrag_b",
    "barnebidrag|mottar": "begrunnelse.kategorier.kortKategorier.barnebidrag_m",
    "faktura|barnehage": "begrunnelse.kategorier.kortKategorier.barnehage",
    "faktura|sfo": "begrunnelse.kategorier.kortKategorier.barnehageSFO",
    "husbanken|vedtak": "begrunnelse.kategorier.kortKategorier.bostotte",
    "husleiekontrakt|husleiekontrakt": "begrunnelse.kategorier.kortKategorier.husleie",
    "kontooversikt|annet": "begrunnelse.kategorier.kortKategorier.kontooversikt",
    "lonnslipp|arbeid": "begrunnelse.kategorier.kortKategorier.lonnslipp",
    "faktura|strom": "begrunnelse.kategorier.kortKategorier.stromOppvarming",
    "student|vedtak": "begrunnelse.kategorier.kortKategorier.stipendLan",
    "annet|annet": "begrunnelse.kategorier.kortKategorier.annet",
    "kort|annet": "begrunnelse.kategorier.kortKategorier.kategoriValg",
};

export const UploadedFileBox = ({
    onDelete,
    dokument: {filename, dokumentId},
    dokumentasjonsType,
}: {
    dokument: DokumentUpload;
    onDelete: (dokumentId: string) => void;
    dokumentasjonsType: string;
}) => {
    const behandlingsId = useBehandlingsId();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const lastNedUrl = `opplastetVedlegg/${behandlingsId}/${dokumentId}/fil`;

    const {t: tSkjema} = useTranslation("skjema");

    const key = dokumentasjonsTypeTilTextKey[dokumentasjonsType]; // returns a string
    const kategoriTekst = key ? tSkjema(key as any) : dokumentasjonsType;

    return (
        <li className="mt-4 flex justify-between items-center border-2 border-[var(--a-border-subtle)] border-solid rounded-md p-4">
            <div className="flex gap-4">
                <StyledCircle>
                    <FilIllustrasjon />
                </StyledCircle>
                <div className="flex flex-col">
                    <BodyShort className="font-semibold">{kategoriTekst}</BodyShort>
                    <LinkButton onClick={() => window.open(digisosConfig.baseURL + lastNedUrl)}>{filename}</LinkButton>
                </div>
            </div>
            <div>
                <BekreftSlettDokumentModal
                    open={showConfirmDelete}
                    onSelect={(shouldDelete) => {
                        if (shouldDelete) onDelete(dokumentId);
                        setShowConfirmDelete(false);
                    }}
                />
                <Button
                    size="small"
                    variant="tertiary-neutral"
                    onClick={() => setShowConfirmDelete(true)}
                    aria-label={`Slett ${filename}`}
                >
                    <TrashIcon height={25} width={25} />
                </Button>
            </div>
        </li>
    );
};

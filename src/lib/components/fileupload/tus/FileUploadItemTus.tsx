"use client";

import {useTranslation} from "react-i18next";
import {useMutation} from "@tanstack/react-query";
import {FileUpload} from "@navikt/ds-react/FileUpload";
import {Upload} from "tus-js-client";
import {BodyShort, Button, HStack, Select} from "@navikt/ds-react";
import {InformationSquareFillIcon, TrashIcon} from "@navikt/aksel-icons";
import {useState} from "react";
import {UploadStatus, ValidationCode} from "./types";
import {DokumentasjonDtoType} from "../../../../generated/new/model";

const UPLOAD_API_BASE = "/sosialhjelp/soknad/api/upload-api";

/** Category options available for kort søknad file uploads */
const KATEGORI_OPTIONS: {value: DokumentasjonDtoType | ""; labelKey: string}[] = [
    {value: "", labelKey: "begrunnelse.kategorier.kortKategorier.kategoriValg"},
    {value: "BARNEBIDRAG_BETALER", labelKey: "begrunnelse.kategorier.kortKategorier.barnebidrag_b"},
    {value: "BARNEBIDRAG_MOTTAR", labelKey: "begrunnelse.kategorier.kortKategorier.barnebidrag_m"},
    {value: "UTGIFTER_BARNEHAGE", labelKey: "begrunnelse.kategorier.kortKategorier.barnehage"},
    {value: "UTGIFTER_SFO", labelKey: "begrunnelse.kategorier.kortKategorier.barnehageSFO"},
    {value: "UTBETALING_HUSBANKEN", labelKey: "begrunnelse.kategorier.kortKategorier.bostotte"},
    {value: "UTGIFTER_HUSLEIE", labelKey: "begrunnelse.kategorier.kortKategorier.husleie"},
    {value: "FORMUE_ANNET", labelKey: "begrunnelse.kategorier.kortKategorier.kontooversikt"},
    {value: "LONNSLIPP", labelKey: "begrunnelse.kategorier.kortKategorier.lonnslipp"},
    {value: "UTGIFTER_STROM", labelKey: "begrunnelse.kategorier.kortKategorier.stromOppvarming"},
    {value: "STUDIELAN_INNTEKT", labelKey: "begrunnelse.kategorier.kortKategorier.stipendLan"},
    {value: "UTGIFTER_ANDRE_UTGIFTER", labelKey: "begrunnelse.kategorier.kortKategorier.annet"},
];

interface Props {
    originalFilename: string;
    convertedFilename?: string;
    uploadId: string;
    validations?: ValidationCode[];
    url?: string;
    status: UploadStatus;
    size?: number;
    onCategoryChange?: (uploadId: string, category: DokumentasjonDtoType) => void;
    category?: DokumentasjonDtoType;
}

const SeOverDescription = () => {
    const {t} = useTranslation("skjema");
    return (
        <HStack align="center" gap="2">
            <InformationSquareFillIcon aria-hidden className="text-(--a-icon-info)" />
            <BodyShort className="text-(--a-text-info-subtle)">{t("tusUpload.seOver")}</BodyShort>
        </HStack>
    );
};

const FileUploadItemTus = ({
    convertedFilename,
    originalFilename,
    uploadId,
    validations,
    url,
    status,
    size,
    onCategoryChange,
}: Props) => {
    const {t} = useTranslation("skjema");
    const [category, setCategory] = useState<DokumentasjonDtoType | "">("UTGIFTER_ANDRE_UTGIFTER");

    const {mutate, isPending} = useMutation({
        mutationFn: () => Upload.terminate(`${UPLOAD_API_BASE}/tus/files/${uploadId}`, {}),
        retry: false,
    });
    const {mutate: updateCategory} = useMutation({
        mutationFn: async (variables: {kategori: string}) => {
            const res = await fetch(`${UPLOAD_API_BASE}/vedlegg/${uploadId}/kategori`, {
                method: "PATCH",
                body: JSON.stringify(variables),
                headers: {"Content-Type": "application/json"},
            });
            if (!res.ok) {
                throw new Error(`Kunne ikke oppdatere kategori: ${res.status}`);
            }
        },
    });

    const isUploading = !url && !validations && status !== "FAILED" && status !== "COMPLETE";
    const uploadStatus = isUploading ? "uploading" : "idle";

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = (event.target.value || "UTGIFTER_ANDRE_UTGIFTER") as DokumentasjonDtoType;
        setCategory(newCategory);
        updateCategory({kategori: event.target.value});
        onCategoryChange?.(uploadId, newCategory);
    };

    const isConverted = !!convertedFilename && convertedFilename !== originalFilename;

    return (
        <li className="flex flex-col gap-2 border border-(--a-border-subtle) rounded-md p-3 items-start">
            <FileUpload.Item
                file={{name: convertedFilename ?? originalFilename, size}}
                as="div"
                className="self-stretch"
                status={uploadStatus}
                button={
                    <Button
                        variant="tertiary"
                        data-color="neutral"
                        icon={<TrashIcon title={t("vedlegg.slett")} />}
                        onClick={() => mutate()}
                        loading={isPending}
                    />
                }
                onFileClick={url ? () => window.open(url, "_blank", "noopener,noreferrer") : undefined}
                /* @ts-expect-error Aksel accepts ReactNode here despite the type saying string */
                description={isConverted ? <SeOverDescription /> : undefined}
                error={
                    validations?.length
                        ? t(`tusUpload.validation.${validations[0]}`)
                        : status === "FAILED"
                          ? t("tusUpload.uploadFailed")
                          : undefined
                }
            />
            {status === "COMPLETE" && (
                <Select
                    label={t("tusUpload.categoryLabel")}
                    size="small"
                    className="w-auto"
                    value={category}
                    onChange={handleCategoryChange}
                >
                    {KATEGORI_OPTIONS.map(({value, labelKey}) => (
                        <option key={value} value={value}>
                            {t(labelKey)}
                        </option>
                    ))}
                </Select>
            )}
        </li>
    );
};

export default FileUploadItemTus;

import React, {useState} from "react";
import {Alert, BodyShort, Button, Heading, Modal, Select} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {pdfjs} from "react-pdf";
import cx from "classnames";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {FilePreviewButtons} from "./FilePreviewButtons";
import {FilePreviewDisplay} from "./FilePreviewDisplay";
import {useCurrentSoknadIsKort} from "../../../lib/components/SkjemaSteg/useCurrentSoknadIsKort.tsx";
import {useValgtKategoriContext} from "../../../lib/providers/KortKategorierContextProvider.tsx";
import {DokumentasjonDtoType} from "../../../generated/new/model";
import {logAmplitudeEvent} from "../../../lib/amplitude/Amplitude.tsx";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

interface ForhandsvisningModalProps {
    file: File;
    header: string | undefined;
    visKategori?: boolean;
    onAccept: () => void;
    onClose: () => void;
}

export const ForhandsvisningVedleggModal = ({
    header,
    file,
    visKategori,
    onAccept,
    onClose,
}: ForhandsvisningModalProps) => {
    const [isFullscreen, setFullscreen] = useState<boolean>(false);
    const {t} = useTranslation();
    const isKortSoknad = useCurrentSoknadIsKort();

    const {setValgtKategoriData} = useValgtKategoriContext();
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const handleAccept = () => {
        if (selectedCategory) {
            logAmplitudeEvent("Søker legger på kategori til dokument");
        }
        const categoryToSet = selectedCategory || "UTGIFTER_ANDRE_UTGIFTER";
        setValgtKategoriData({valgtKategorier: categoryToSet as DokumentasjonDtoType});
        setSelectedCategory("");
        onAccept();
    };

    const handleClose = () => {
        setValgtKategoriData({valgtKategorier: "UTGIFTER_ANDRE_UTGIFTER"});
        setSelectedCategory("");
        onClose();
    };

    return (
        <Modal
            open={true}
            onClose={handleClose}
            closeOnBackdropClick={false}
            className={"bg-white"}
            aria-label={header ?? ""}
        >
            <Modal.Header>
                <Heading level={"2"} size={"medium"}>
                    {header}
                </Heading>
            </Modal.Header>
            <Modal.Body className={cx({"fixed inset-0 w-full p-0!": isFullscreen}, "flex flex-col items-center")}>
                <div
                    className={cx(
                        {
                            "w-full min-h-full gap-4 pb-4": isFullscreen,
                            "p-2 bg-surface-neutral-subtle rounded-md w-fit": !isFullscreen,
                        },
                        "grow flex flex-col"
                    )}
                >
                    {file.type === "application/pdf" ? (
                        <>
                            <FilePreviewButtons isFullscreen={isFullscreen} setFullscreen={setFullscreen} />
                            <FilePreviewDisplay file={file} width={isFullscreen ? window.innerWidth - 200 : 600} />
                        </>
                    ) : (
                        <>
                            <FilePreviewButtons isFullscreen={isFullscreen} setFullscreen={setFullscreen} />
                            <img className={"w-full"} src={URL.createObjectURL(file)} alt={"preview"} />
                        </>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer className={"block! space-y-4"}>
                <BodyShort>{t("vedlegg.forhandsvisning.info")}</BodyShort>
                {isKortSoknad && visKategori && (
                    <div>
                        <div>
                            <Select
                                label={t("vedlegg.forhandsvisning.kategori_sporsmal")}
                                value={selectedCategory}
                                onChange={(event: any) => {
                                    const newCategory = event.target.value;

                                    const categoryToSet =
                                        newCategory === "kort|annet" ? "UTGIFTER_ANDRE_UTGIFTER" : newCategory;
                                    setSelectedCategory(newCategory);
                                    setValgtKategoriData({valgtKategorier: categoryToSet as DokumentasjonDtoType});
                                }}
                            >
                                <option value="kort|annet">
                                    {t("begrunnelse.kategorier.kortKategorier.kategoriValg")}
                                </option>
                                <option value="BARNEBIDRAG_BETALER">
                                    {t("begrunnelse.kategorier.kortKategorier.barnebidrag_b")}
                                </option>
                                <option value="BARNEBIDRAG_MOTTAR">
                                    {t("begrunnelse.kategorier.kortKategorier.barnebidrag_m")}
                                </option>
                                <option value="UTGIFTER_BARNEHAGE">
                                    {t("begrunnelse.kategorier.kortKategorier.barnehage")}
                                </option>
                                <option value="UTGIFTER_SFO">
                                    {t("begrunnelse.kategorier.kortKategorier.barnehageSFO")}
                                </option>
                                <option value="UTBETALING_HUSBANKEN">
                                    {t("begrunnelse.kategorier.kortKategorier.bostotte")}
                                </option>
                                <option value="UTGIFTER_HUSLEIE">
                                    {t("begrunnelse.kategorier.kortKategorier.husleie")}
                                </option>
                                <option value="FORMUE_ANNET">
                                    {t("begrunnelse.kategorier.kortKategorier.kontooversikt")}
                                </option>
                                <option value="LONNSLIPP">
                                    {t("begrunnelse.kategorier.kortKategorier.lonnslipp")}
                                </option>
                                <option value="UTGIFTER_STROM">
                                    {t("begrunnelse.kategorier.kortKategorier.stromOppvarming")}
                                </option>
                                <option value="STUDIELAN_INNTEKT">
                                    {t("begrunnelse.kategorier.kortKategorier.stipendLan")}
                                </option>
                                <option value="UTGIFTER_ANDRE_UTGIFTER">
                                    {t("begrunnelse.kategorier.kortKategorier.annet")}
                                </option>
                            </Select>
                        </div>
                        <div className={"mt-8"}>
                            {(selectedCategory === "kort|annet" || selectedCategory === "") && (
                                <Alert variant="info" className={"justify-center"}>
                                    {t("vedlegg.forhandsvisning.kategori")}
                                </Alert>
                            )}
                        </div>
                    </div>
                )}
                <div />
                <div className={"w-fit space-x-4"}>
                    <Button variant="primary" onClick={handleAccept}>
                        {t("vedlegg.forhandsvisning.opplast")}
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        {t("vedlegg.forhandsvisning.avbryt")}
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

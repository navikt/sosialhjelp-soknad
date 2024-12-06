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
import {useValgtKategoriContext} from "../../../KortKategorierContextProvider.tsx";
import {VedleggFrontendType} from "../../../generated/model";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

interface ForhandsvisningModalProps {
    file: File;
    header: string | undefined;
    onAccept: () => void;
    onClose: () => void;
    onDelete: () => void;
}

export const ForhandsvisningVedleggModal = ({
    header,
    file,
    onAccept,
    onClose,
    //onDelete,
}: ForhandsvisningModalProps) => {
    const [isFullscreen, setFullscreen] = useState<boolean>(false);
    const {t} = useTranslation();
    const isKortSoknad = useCurrentSoknadIsKort();

    const {valgtKategoriData, setValgtKategoriData} = useValgtKategoriContext();
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    console.log("ForhandsvisningVedleggModal selectedCategory", selectedCategory);
    console.log("ForhandsvisningVedleggModal valgtKategoriData", valgtKategoriData);

    const handleAccept = () => {
        // Ensure `kort|annet` is set when no valid category is selected
        const categoryToSet =
            selectedCategory === "annet|annet" || selectedCategory === "" ? "kort|annet" : selectedCategory;
        console.log("ForhandsvisningVedleggModal categoryToSet", categoryToSet);
        setValgtKategoriData({valgtKategorier: categoryToSet as VedleggFrontendType});
        setSelectedCategory(""); // Reset after accept
        onAccept();
    };

    const handleClose = () => {
        setValgtKategoriData({valgtKategorier: "kort|annet"}); // Reset context
        setSelectedCategory(""); // Reset local state
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
            <Modal.Body className={cx({"fixed inset-0 w-full !p-0": isFullscreen}, "flex flex-col items-center")}>
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
            <Modal.Footer className={"!block space-y-4"}>
                <BodyShort>{t("vedlegg.forhandsvisning.info")}</BodyShort>
                {valgtKategoriData.valgtKategorier !== "kort|behov" && isKortSoknad && (
                    <div>
                        <div>
                            <Select
                                label={"Velg en kategori for dokumentet"}
                                value={selectedCategory}
                                onChange={(event: any) => {
                                    const newCategory = event.target.value;

                                    // Map "annet|annet" (placeholder) to "kort|annet" when no specific category is selected
                                    const categoryToSet = newCategory === "annet|annet" ? "kort|annet" : newCategory;

                                    setSelectedCategory(newCategory);
                                    setValgtKategoriData({valgtKategorier: categoryToSet as VedleggFrontendType});
                                }}
                            >
                                <option value="annet|annet">
                                    {t("begrunnelse.kategorier.kortKategorier.kategoriValg")}
                                </option>
                                <option value="kort|barnebidrag">
                                    {t("begrunnelse.kategorier.kortKategorier.barnebidrag")}
                                </option>
                                <option value="kort|barnehage">
                                    {t("begrunnelse.kategorier.kortKategorier.barnehage")}
                                </option>
                                <option value="kort|barnehageSFO">
                                    {t("begrunnelse.kategorier.kortKategorier.barnehageSFO")}
                                </option>
                                <option value="kort|bostotte">
                                    {t("begrunnelse.kategorier.kortKategorier.bostotte")}
                                </option>
                                <option value="kort|husleie">
                                    {t("begrunnelse.kategorier.kortKategorier.husleie")}
                                </option>
                                <option value="kort|kontooversikt">
                                    {t("begrunnelse.kategorier.kortKategorier.kontooversikt")}
                                </option>
                                <option value="kort|lonnslipp">
                                    {t("begrunnelse.kategorier.kortKategorier.lonnslipp")}
                                </option>
                                <option value="kort|stromOppvarming">
                                    {t("begrunnelse.kategorier.kortKategorier.stromOppvarming")}
                                </option>
                                <option value="kort|stipendLan">
                                    {t("begrunnelse.kategorier.kortKategorier.stipendLan")}
                                </option>
                                <option value="kort|annet">{t("begrunnelse.kategorier.kortKategorier.annet")}</option>
                            </Select>
                        </div>
                        <div className={"mt-8"}>
                            {(selectedCategory === "annet|annet" || selectedCategory === "") && (
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

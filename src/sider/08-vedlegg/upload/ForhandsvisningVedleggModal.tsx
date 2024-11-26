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
    //steg: any;
}

export const ForhandsvisningVedleggModal = ({
    header,
    file,
    onAccept,
    onClose,
    //onDelete,
    //steg,
}: ForhandsvisningModalProps) => {
    const [isFullscreen, setFullscreen] = useState<boolean>(false);
    const {t} = useTranslation();
    const isKortSoknad = useCurrentSoknadIsKort();
    const {valgtKategoriData, setValgtKategoriData} = useValgtKategoriContext();
    const [ingenKat, setIngenKat] = useState(false);

    return (
        <Modal
            open={true}
            onClose={onClose}
            closeOnBackdropClick={false}
            className={"bg-gray-800/80"}
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
                            <FilePreviewButtons
                                //onDelete={onDelete}
                                isFullscreen={isFullscreen}
                                setFullscreen={setFullscreen}
                            />
                            <FilePreviewDisplay file={file} width={isFullscreen ? window.innerWidth - 200 : 600} />
                        </>
                    ) : (
                        <>
                            <FilePreviewButtons
                                //onDelete={onDelete}
                                isFullscreen={isFullscreen}
                                setFullscreen={setFullscreen}
                            />
                            <img className={"w-full"} src={URL.createObjectURL(file)} alt={"preview"} />
                        </>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer className={"!block space-y-4"}>
                <BodyShort>{t("vedlegg.forhandsvisning.info")}</BodyShort>
                {isKortSoknad && (
                    <div>
                        <div>
                            <Select
                                label={"Velg en kategori for dokumentet"}
                                defaultValue={""}
                                value={valgtKategoriData.valgtKategorier}
                                onChange={(event: any) => {
                                    console.log("before selectedCategory");
                                    const selectedCategory = event.target.value as VedleggFrontendType; // Ensure correct type
                                    console.log("after selectedCategory, but before setIngenKat");
                                    setIngenKat(selectedCategory.length === 0);
                                    console.log("after setIngenKat, but before seetvalgtKategoriData");
                                    setValgtKategoriData({valgtKategorier: selectedCategory});
                                    console.log("after setvalgtKategoriData");
                                }}
                            >
                                <option value="">Velg kategori</option>
                                <option value="kort|barnebidrag">Barnehage</option>
                                <option value="kort|barnehageSFO">SFO/AKS</option>
                                <option value="kort|husleie">Husleie</option>
                                <option value="kort|bostotte">Bostøtte fra Husbanken</option>
                                <option value="kort|kontooversikt">Kontooversikt</option>
                                <option value="kort|lonnslipp">Lønnslipp</option>
                                <option value="kort|stromOppvarming">Strøm og oppvarming</option>
                                <option value="kort|stipendLan">Stipend og lån fra Lånekassen</option>
                                <option value="kort|annet">Annet</option>
                            </Select>
                        </div>
                        <div>
                            {ingenKat && (
                                <Alert variant="info" className={"justify-center"}>
                                    Om du ikke velger en kategori blir dokumentet lastet opp som "Annet".
                                </Alert>
                            )}
                        </div>
                    </div>
                )}
                <div />
                <div className={"w-fit space-x-4"}>
                    <Button variant="primary" onClick={onAccept}>
                        {t("vedlegg.forhandsvisning.opplast")}
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        {t("vedlegg.forhandsvisning.avbryt")}
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

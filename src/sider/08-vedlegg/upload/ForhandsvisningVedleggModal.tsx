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

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

interface ForhandsvisningModalProps {
    file: File;
    header: string | undefined;
    onAccept: () => void;
    onClose: () => void;
    onDelete: () => void;
    steg: any;
}

export const ForhandsvisningVedleggModal = ({
    header,
    file,
    onAccept,
    onClose,
    //onDelete,
    steg,
}: ForhandsvisningModalProps) => {
    const [isFullscreen, setFullscreen] = useState<boolean>(false);
    const {t} = useTranslation();
    const isKortSoknad = useCurrentSoknadIsKort();
    const {valgtKategoriData, setValgtKategoriData} = useValgtKategoriContext();
    const [valgkat, setvalgkat] = useState("");

    console.log("valgkat", valgkat);
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
                {isKortSoknad && steg.steg === "4" && (
                    <div>
                        <div>
                            <Select
                                label={"Velg en kategori for dokumentet"}
                                onChange={(event: any) => {
                                    setvalgkat(event);
                                    setValgtKategoriData(event);
                                }}
                            >
                                <option value="">Velg kategori</option>
                                <option value="faktura|barnehage">Barnehage</option>
                                <option value="faktura|sfo">SFO/AKS</option>
                                <option value="husbanken|vedtak">Bostøtte fra Husbanken</option>
                                <option value="husleiekontrakt|husleiekontrakt">Husleie</option>
                                <option value="kontooversikt">Kontooversikt</option>
                                <option value="lonnslipp">Lønnslipp</option>
                                <option value="faktura|strom">Strøm og oppvarming</option>
                                <option value="stipendOgLan">Stipend og lån fra Lånekassen</option>
                                <option value="annet|annet">Annet</option>
                            </Select>
                        </div>
                        <div>
                            {valgtKategoriData && valgtKategoriData.valgtKategorier === "annet|annet" && (
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

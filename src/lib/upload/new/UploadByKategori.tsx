import {useDokumentasjonTekster} from "../../hooks/dokumentasjon/useDokumentasjonTekster.ts";
import {DokumentasjonDtoType} from "../../../generated/new/model";
import {VedleggUpload} from "./VedleggUpload.tsx";
import React from "react";

interface Props {
    className?: string;
    describedBy?: string;
    hideAlreadyUploaded?: boolean;
    kategori: DokumentasjonDtoType;
    soknadId: string;
    contextId: string;
    /**
     * Valgfri label som overstyrer label som eventuelt kommer fra kategori.
     * Brukes i kort søknad.
     */
    label?: string;
    description?: React.ReactNode;
}

export const UploadByKategori = (props: Props) => {
    const {dokumentBeskrivelse} = useDokumentasjonTekster(props.kategori);
    const label = props.label ?? dokumentBeskrivelse;

    return <VedleggUpload {...props} label={label} />;
};

import React from "react";
import {Box} from "@navikt/ds-react";
import {DokumentasjonDtoType} from "../../../../generated/new/model";
import {useDokumentasjonTekster} from "../../../../lib/hooks/dokumentasjon/useDokumentasjonTekster.ts";
import {DokumenterUpload} from "./DokumenterUpload.tsx";

interface Props {
    className?: string;
    describedBy?: string;
    hideAlreadyUploaded?: boolean;
    kategori: DokumentasjonDtoType;
    soknadId: string;
    contextId: string;
    /** Ledetekst for opplastingsfeltet. Faller tilbake på dokumentasjonsteksten for kategorien. */
    label?: string;
    /** Utfyllende beskrivelse. Kan være flere linjer / rikt innhold. */
    description?: React.ReactNode;
}

/**
 * Opplasting av dokumentasjon i kort søknad.
 *
 * Samme funksjonalitet som `NewDokumenter`, men presentert i en egen farget boks
 * og med mulighet for å sende inn ledetekst og beskrivelse fra kallstedet.
 */
export const KortDokumenter = ({className, label, ...rest}: Props) => {
    const {dokumentBeskrivelse} = useDokumentasjonTekster(rest.kategori);

    return (
        <Box
            borderRadius="16"
            padding={{xs: "space-16", md: "space-24"}}
            className={`bg-ax-bg-info-soft${className ? ` ${className}` : ""}`}
        >
            <DokumenterUpload {...rest} label={label ?? dokumentBeskrivelse} />
        </Box>
    );
};

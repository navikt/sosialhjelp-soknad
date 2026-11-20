import {BodyShort, Heading} from "@navikt/ds-react";
import {useDokumentasjonTekster} from "../../lib/hooks/dokumentasjon/useDokumentasjonTekster.ts";
import React from "react";
import {DokumentasjonDtoType} from "../../generated/model";
import {FormSwitch} from "./form/components/FormSwitch.tsx";
import {UploadByKategori} from "../../lib/upload/UploadByKategori.tsx";
import {useUploadMode} from "../../lib/hooks/featureToggles/useUploadMode.ts";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {DocumentProvider} from "../../lib/upload/DocumentContext.tsx";

export const Dokumentasjon = ({opplysningstype}: {opplysningstype: DokumentasjonDtoType}) => {
    const soknadId = useSoknadId();
    const {sporsmal, undertekst} = useDokumentasjonTekster(opplysningstype);
    const uploadMode = useUploadMode();

    const id = opplysningstype;
    const contextId = `${soknadId}-${opplysningstype}`;

    return (
        <div className={"rounded-md bg-ax-bg-accent-soft p-8"}>
            <Heading level={"4"} size={"small"} spacing id={id}>
                {sporsmal}
            </Heading>

            <BodyShort spacing>{undertekst}</BodyShort>
            <FormSwitch opplysningstype={opplysningstype} />
            <DocumentProvider contextId={contextId} mode={uploadMode}>
                <UploadByKategori
                    className={"mt-6"}
                    describedBy={id}
                    contextId={contextId}
                    soknadId={soknadId}
                    kategori={opplysningstype}
                    fileListHeadingLevel={"5"}
                />
            </DocumentProvider>
        </div>
    );
};

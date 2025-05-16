import {BodyShort, Heading} from "@navikt/ds-react";
import {useDokumentasjonTekster} from "../../lib/hooks/dokumentasjon/useDokumentasjonTekster.ts";
import React from "react";
import {DokumentasjonDtoType} from "../../generated/new/model";
import {Dokumenter} from "./upload/Dokumenter.tsx";
import {FormSwitch} from "./form/components/FormSwitch.tsx";

export const Dokumentasjon = ({opplysningstype}: {opplysningstype: DokumentasjonDtoType}) => {
    const {sporsmal, undertekst} = useDokumentasjonTekster(opplysningstype);

    return (
        <div className={"rounded-md bg-surface-action-subtle p-8"}>
            <Heading level={"4"} size={"small"} spacing>
                {sporsmal}
            </Heading>

            <BodyShort spacing>{undertekst}</BodyShort>
            <FormSwitch opplysningstype={opplysningstype} />
            <Dokumenter opplysningstype={opplysningstype} />
        </div>
    );
};

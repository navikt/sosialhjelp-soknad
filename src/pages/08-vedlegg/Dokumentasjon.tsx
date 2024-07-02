import {DokumentasjonRader} from "./DokumentasjonRader";
import {Dokumenter} from "./upload/Dokumenter";
import {Opplysning} from "../../lib/opplysninger";
import {BodyShort, Heading} from "@navikt/ds-react";
import {ArbeidsDokumentasjon} from "./ArbeidsDokumentasjon";
import {useDokumentasjonTekster} from "../../lib/hooks/dokumentasjon/useDokumentasjonTekster";

export const Dokumentasjon = ({opplysning}: {opplysning: Opplysning}) => {
    const {sporsmal, undertekst} = useDokumentasjonTekster(opplysning.type);

    return (
        <div className={"rounded-md bg-surface-action-subtle p-8"}>
            <Heading level={"4"} size={"small"} spacing>
                {sporsmal}
            </Heading>
            {opplysning.type === "lonnslipp|arbeid" ? (
                <ArbeidsDokumentasjon opplysning={opplysning} />
            ) : (
                <>
                    <BodyShort spacing>{undertekst}</BodyShort>
                    <DokumentasjonRader opplysning={opplysning} />
                    <Dokumenter opplysning={opplysning} />
                </>
            )}
        </div>
    );
};

import {DokumentasjonRader} from "./DokumentasjonRader";
import {Dokumenter} from "./upload/Dokumenter";
import {Opplysning} from "../../lib/opplysninger";
import {BodyShort, Heading} from "@navikt/ds-react";
import {useOpplysningTekster} from "./lib/hooks/useOpplysningTekster";
import {ArbeidsVedlegg} from "./ArbeidsVedlegg";

export const Dokumentasjon = ({opplysning}: {opplysning: Opplysning}) => {
    const {sporsmal, undertekst} = useOpplysningTekster(opplysning.type);

    return (
        <>
            {opplysning.type === "lonnslipp|arbeid" && (
                <div>
                    <div className={"rounded-md bg-surface-action-subtle p-8"}>
                        <Heading level={"4"} size={"medium"} spacing>
                            {sporsmal}
                        </Heading>
                        <ArbeidsVedlegg opplysning={opplysning} />
                    </div>
                </div>
            )}
            {opplysning.type !== "lonnslipp|arbeid" && (
                <div>
                    <div className={"rounded-md bg-surface-action-subtle p-8"}>
                        <Heading level={"4"} size={"medium"} spacing>
                            {sporsmal}
                        </Heading>
                        <BodyShort spacing>{undertekst}</BodyShort>
                        <DokumentasjonRader opplysning={opplysning} />
                        <Dokumenter opplysning={opplysning} />
                    </div>
                </div>
            )}
        </>
    );
};

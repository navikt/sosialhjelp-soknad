import {TabellView} from "./TabellView";
import {VedleggView} from "./upload/VedleggView";
import {VedleggSlettet} from "./vedleggSlettet";
import {Opplysning} from "../../lib/opplysninger";
import {BodyShort, Heading} from "@navikt/ds-react";
import {useOpplysningTekster} from "./useOpplysningTekster";
import {ArbeidsVedlegg} from "./ArbeidsVedlegg";

export const OpplysningView = ({opplysning}: {opplysning: Opplysning}) => {
    const {sporsmal, undertekst} = useOpplysningTekster(opplysning.type);

    if (opplysning.slettet) return <VedleggSlettet opplysning={opplysning} />;

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
                        <VedleggView opplysning={opplysning} />
                        <TabellView opplysning={opplysning} />
                    </div>
                </div>
            )}
        </>
    );
};

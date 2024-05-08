import {TabellView} from "./TabellView";
import {VedleggView} from "./upload/VedleggView";
import {Opplysning} from "../../lib/opplysninger";
import {BodyShort, Heading} from "@navikt/ds-react";
import {useOpplysningTekster} from "./useOpplysningTekster";

export const OpplysningView = ({opplysning}: {opplysning: Opplysning}) => {
    const {sporsmal, undertekst} = useOpplysningTekster(opplysning.type);

    return (
        <div className={"rounded-md bg-surface-subtle p-8"}>
            <Heading level={"4"} size={"medium"} spacing>
                {sporsmal}
            </Heading>
            <BodyShort spacing>{undertekst}</BodyShort>
            <TabellView opplysning={opplysning} />
            <VedleggView opplysning={opplysning} />
        </div>
    );
};

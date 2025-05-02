import {opplysningSpec} from "../../lib/opplysninger";
import {BodyShort, Heading, Loader} from "@navikt/ds-react";
import {useDokumentasjonTekster} from "../../lib/hooks/dokumentasjon/useDokumentasjonTekster";
import React from "react";
import {AvdragRenterDto, BelopDto, DokumentasjonDtoType, LonnsInntektDto} from "../../generated/new/model";
import {Dokumenter} from "./upload/Dokumenter.tsx";
import useOkonomiskOpplysningMutation from "../../lib/hooks/dokumentasjon/useOkonomiskOpplysningMutation.ts";
import BelopBeskrivelse from "./form/BelopBeskrivelse.tsx";
import AvdragRenter from "./form/AvdragRenter.tsx";
import BruttoNetto from "./form/BruttoNetto.tsx";
import BelopEn from "./form/BelopEn.tsx";

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

const FormSwitch = ({opplysningstype}: {opplysningstype: DokumentasjonDtoType}) => {
    const {updateOkonomiskOpplysning, data, isLoading} = useOkonomiskOpplysningMutation(opplysningstype);
    const {formVariant} = opplysningSpec[opplysningstype];
    if (isLoading) {
        return <Loader />;
    }
    switch (formVariant) {
        case "avdragRenter":
            return (
                <AvdragRenter
                    opplysningstype={"UTGIFTER_BOLIGLAN"}
                    mutate={updateOkonomiskOpplysning}
                    opplysning={data as AvdragRenterDto[]}
                />
            );
        case "belopBeskrivelse":
            return (
                <BelopBeskrivelse
                    opplysningstype={opplysningstype}
                    mutate={updateOkonomiskOpplysning}
                    opplysning={data as BelopDto[]}
                />
            );
        case "belopFlere":
            return (
                <BelopBeskrivelse
                    opplysningstype={opplysningstype}
                    excludeBeskrivelse
                    mutate={updateOkonomiskOpplysning}
                    opplysning={data as BelopDto[]}
                />
            );
        case "bruttonetto":
            return (
                <BruttoNetto
                    opplysningstype={opplysningstype}
                    mutate={updateOkonomiskOpplysning}
                    opplysning={data?.[0] as LonnsInntektDto}
                />
            );
        case "belopEn":
            return (
                <BelopEn
                    opplysningstype={opplysningstype}
                    mutate={updateOkonomiskOpplysning}
                    opplysning={data?.[0] as BelopDto}
                />
            );
        case "ingen":
            return null;
    }
};

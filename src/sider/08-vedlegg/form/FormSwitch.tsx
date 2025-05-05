import useOkonomiskOpplysningMutation from "../../../lib/hooks/dokumentasjon/useOkonomiskOpplysningMutation.ts";
import {DokumentasjonTypesForVariant, opplysningSpec} from "../../../lib/opplysninger.ts";
import {Loader} from "@navikt/ds-react";
import AvdragRenter from "./variants/avdragRenter/AvdragRenter.tsx";
import BelopBeskrivelse from "./variants/belopBeskrivelse/BelopBeskrivelse.tsx";
import BruttoNetto from "./variants/bruttoNetto/BruttoNetto.tsx";
import BelopEn from "./variants/belopEn/BelopEn.tsx";
import React from "react";
import {DokumentasjonDtoType} from "../../../generated/new/model/dokumentasjonDtoType.ts";
import {AvdragRenterDto} from "../../../generated/new/model/avdragRenterDto.ts";
import {BelopDto} from "../../../generated/new/model/belopDto.ts";
import {LonnsInntektDto} from "../../../generated/new/model/lonnsInntektDto.ts";

export const FormSwitch = ({opplysningstype}: {opplysningstype: DokumentasjonDtoType}) => {
    const {updateOkonomiskOpplysning, opplysning, isLoading} = useOkonomiskOpplysningMutation(opplysningstype);
    const {formVariant} = opplysningSpec[opplysningstype];
    if (isLoading) {
        return <Loader />;
    }
    switch (formVariant) {
        case "avdragRenter":
            return (
                <AvdragRenter
                    opplysningstype={opplysningstype as DokumentasjonTypesForVariant<"avdragRenter">}
                    mutate={updateOkonomiskOpplysning}
                    opplysning={opplysning as AvdragRenterDto[]}
                />
            );
        case "belopBeskrivelse":
            return (
                <BelopBeskrivelse
                    opplysningstype={opplysningstype as DokumentasjonTypesForVariant<"belopBeskrivelse">}
                    mutate={updateOkonomiskOpplysning}
                    opplysning={opplysning as BelopDto[]}
                />
            );
        case "belopFlere":
            return (
                <BelopBeskrivelse
                    opplysningstype={opplysningstype as DokumentasjonTypesForVariant<"belopFlere">}
                    excludeBeskrivelse
                    mutate={updateOkonomiskOpplysning}
                    opplysning={opplysning as BelopDto[]}
                />
            );
        case "bruttonetto":
            return (
                <BruttoNetto
                    opplysningstype={opplysningstype as DokumentasjonTypesForVariant<"bruttonetto">}
                    mutate={updateOkonomiskOpplysning}
                    opplysning={opplysning?.[0] as LonnsInntektDto}
                />
            );
        case "belopEn":
            return (
                <BelopEn
                    opplysningstype={opplysningstype as DokumentasjonTypesForVariant<"belopEn">}
                    mutate={updateOkonomiskOpplysning}
                    opplysning={opplysning?.[0] as BelopDto}
                />
            );
        case "ingen":
            return null;
    }
};

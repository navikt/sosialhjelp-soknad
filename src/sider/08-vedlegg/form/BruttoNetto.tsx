import {DokumentasjonDtoType, LonnsInntektDto, type LonnsInput} from "../../../generated/new/model";
import {useForm} from "react-hook-form";
import React from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {OpplysningBelopInput} from "./components/OpplysningBelopInput.tsx";
import {useDokumentasjonTekster} from "../../../lib/hooks/dokumentasjon/useDokumentasjonTekster.ts";
import {BruttoNettoFormSchema} from "./lib/formSchemas.ts";
import {bruttoNettoFormToLonnsInput} from "./lib/formToInputMappers.ts";

export type BruttoNettoFormValues = z.infer<typeof BruttoNettoFormSchema>;
const BruttoNetto = ({
    opplysningstype,
    mutate,
    opplysning,
}: {
    opplysningstype: DokumentasjonDtoType;
    mutate: (data: LonnsInput) => void;
    opplysning: LonnsInntektDto | undefined;
}) => {
    const {brutto, netto} = useDokumentasjonTekster(opplysningstype);

    const {handleSubmit, control} = useForm({
        mode: "onBlur",
        shouldFocusError: false,
        resolver: zodResolver(BruttoNettoFormSchema),
        defaultValues: {brutto: opplysning?.brutto, netto: opplysning?.netto},
    });

    const onSubmit = (formValues: BruttoNettoFormValues) => {
        mutate(bruttoNettoFormToLonnsInput(opplysningstype, formValues));
    };

    return (
        <form onBlur={handleSubmit(onSubmit)}>
            <OpplysningBelopInput control={control} label={brutto?.label} name={`brutto`} />
            <OpplysningBelopInput control={control} label={netto?.label} name={`netto`} />
        </form>
    );
};

export default BruttoNetto;

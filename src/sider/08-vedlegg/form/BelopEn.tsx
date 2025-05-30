import {BelopDto, DokumentasjonDtoType, type GenericOkonomiInput} from "../../../generated/new/model";
import {useForm} from "react-hook-form";
import React from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {OpplysningBelopInput} from "./components/OpplysningBelopInput.tsx";
import {useDokumentasjonTekster} from "../../../lib/hooks/dokumentasjon/useDokumentasjonTekster.ts";
import {BelopEnFormSchema, BelopEnFormValues} from "./schema/belopEnForm.ts";
import {belopEnFormToGenericOkonomiInput} from "./lib/formToInputMappers.ts";

const BelopEn = ({
    opplysningstype,
    mutate,
    opplysning,
}: {
    opplysningstype: DokumentasjonDtoType;
    mutate: (data: GenericOkonomiInput) => void;
    opplysning: BelopDto | undefined;
}) => {
    const {control, handleSubmit} = useForm({
        mode: "onBlur",
        shouldFocusError: false,
        resolver: zodResolver(BelopEnFormSchema),
        defaultValues: {belop: opplysning?.belop},
    });

    const {belop} = useDokumentasjonTekster(opplysningstype);

    const onSubmit = (formValues: BelopEnFormValues) => {
        mutate(belopEnFormToGenericOkonomiInput(opplysningstype, formValues));
    };

    return (
        <form onBlur={handleSubmit(onSubmit)} onSubmit={(e) => e.preventDefault()}>
            <OpplysningBelopInput label={belop?.label} name={`belop`} control={control} />
        </form>
    );
};

export default BelopEn;

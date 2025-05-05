import {AvdragRenterDto, BoliglanInput} from "../../../../../generated/new/model";
import {useForm} from "react-hook-form";
import React from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {avdragRenterFormToBoliglanInput} from "./avdragRenterFormToBoliglanInput.tsx";
import {AvdragRenterFormSchema, AvdragRenterFormValues} from "./AvdragRenterFormSchema.ts";
import {AvdragRenterInputList} from "./AvdragRenterInputList.tsx";
import {DokumentasjonTypesForVariant} from "../../../../../lib/opplysninger.ts";

const AvdragRenter = ({
    opplysningstype,
    mutate,
    opplysning,
}: {
    opplysningstype: DokumentasjonTypesForVariant<"avdragRenter">;
    mutate: (data: BoliglanInput) => void;
    opplysning: AvdragRenterDto[];
}) => {
    const {control, handleSubmit, getValues} = useForm({
        mode: "onBlur",
        shouldFocusError: false,
        resolver: zodResolver(AvdragRenterFormSchema),
        defaultValues: {
            avdragRenter: !opplysning.length ? [{}] : opplysning.map(({avdrag, renter}) => ({avdrag, renter})),
        },
    });

    const onSubmit = ({avdragRenter}: AvdragRenterFormValues) => {
        if (!avdragRenter.some(({avdrag, renter}) => avdrag || renter)) return;
        mutate(avdragRenterFormToBoliglanInput(opplysningstype, avdragRenter));
    };

    return (
        <form onBlur={handleSubmit(onSubmit)} onSubmit={(e) => e.preventDefault()}>
            <AvdragRenterInputList name={"avdragRenter"} control={control} onSubmit={() => onSubmit(getValues())} />
        </form>
    );
};

export default AvdragRenter;

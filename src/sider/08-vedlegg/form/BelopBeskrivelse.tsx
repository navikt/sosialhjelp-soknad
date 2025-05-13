import {BelopDto, type GenericOkonomiInput} from "../../../generated/new/model";
import {useFieldArray, useForm} from "react-hook-form";
import {useDokumentasjonTekster} from "../../../lib/hooks/dokumentasjon/useDokumentasjonTekster.ts";
import React, {ReactNode} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {OpplysningBelopInput} from "./components/OpplysningBelopInput.tsx";
import {ListAddButton} from "./components/ListAddButton.tsx";
import {ListRemoveButton} from "./components/ListRemoveButton.tsx";
import {OpplysningTextInput} from "./components/OpplysningTextInput.tsx";
import {DokumentasjonTypesForVariant} from "../../../lib/opplysninger.ts";
import {BelopBeskrivelseFormSchema, BelopBeskrivelseFormValues} from "./schema/belopBeskrivelseForm.ts";
import {belopBeskrivelseFormToGenericOkonomiInput} from "./lib/formToInputMappers.ts";

type Props = (
    | {
          opplysningstype: DokumentasjonTypesForVariant<"belopBeskrivelse">;
          excludeBeskrivelse?: false;
      }
    | {
          opplysningstype: DokumentasjonTypesForVariant<"belopFlere">;
          excludeBeskrivelse: true;
      }
) & {
    mutate: (data: GenericOkonomiInput) => void;
    opplysning: BelopDto[] | undefined;
    belopLabel?: ReactNode;
    leggTilTekst?: string;
};

const BelopBeskrivelse = ({
    opplysningstype,
    excludeBeskrivelse,
    opplysning,
    mutate,
    belopLabel,
    leggTilTekst,
}: Props) => {
    const {control, handleSubmit, getValues} = useForm({
        mode: "onBlur",
        shouldFocusError: false,
        resolver: zodResolver(BelopBeskrivelseFormSchema),
        defaultValues: {
            belopBeskrivelse: opplysning?.length
                ? opplysning?.map((belopDto) => ({belop: belopDto.belop, beskrivelse: belopDto.beskrivelse}))
                : [{}],
        },
    });

    const {fields, append, remove} = useFieldArray({control, name: "belopBeskrivelse"});
    const {leggtil, belop, beskrivelse} = useDokumentasjonTekster(opplysningstype);

    const onSubmit = ({belopBeskrivelse}: BelopBeskrivelseFormValues) => {
        mutate(belopBeskrivelseFormToGenericOkonomiInput(opplysningstype, belopBeskrivelse));
    };

    const onRemove = (index: number) => () => {
        remove(index);
        // Må trigge submit manuelt her, da blur på formet ikke blir trigga ikke trigges
        onSubmit(getValues());
    };

    return (
        <form onBlur={handleSubmit(onSubmit)} onSubmit={(e) => e.preventDefault()}>
            <ul>
                {fields.map(({id}, index) => (
                    <li key={id}>
                        <OpplysningBelopInput
                            label={belopLabel ?? belop?.label}
                            name={`belopBeskrivelse.${index}.belop`}
                            control={control}
                        />
                        {!excludeBeskrivelse && (
                            <OpplysningTextInput
                                name={`belopBeskrivelse.${index}.beskrivelse`}
                                label={beskrivelse?.label}
                                control={control}
                            />
                        )}
                        {!!index && <ListRemoveButton onClick={onRemove(index)} />}
                    </li>
                ))}
                <ListAddButton onClick={() => append({})}>{leggTilTekst ? leggTilTekst : leggtil}</ListAddButton>
            </ul>
        </form>
    );
};

export default BelopBeskrivelse;

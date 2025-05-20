import {UseControllerProps, useFieldArray} from "react-hook-form";
import {useDokumentasjonTekster} from "../../../lib/hooks/dokumentasjon/useDokumentasjonTekster.ts";
import {OpplysningBelopInput} from "./components/OpplysningBelopInput.tsx";
import {ListRemoveButton} from "./components/ListRemoveButton.tsx";
import {ListAddButton} from "./components/ListAddButton.tsx";
import {AvdragRenterFormValues} from "./schema/avdragRenterForm.ts";

export const AvdragRenterInputList = ({
    name,
    control,
    onSubmit,
}: {
    onSubmit: () => void;
} & UseControllerProps<AvdragRenterFormValues, "avdragRenter">) => {
    const {fields, remove, append} = useFieldArray({name, control});
    const {leggtil, renter, avdrag} = useDokumentasjonTekster("UTGIFTER_BOLIGLAN" as const);
    const onRemove = (index: number) => {
        remove(index);
        // Må trigge submit manuelt her, da blur på formet ikke blir trigga
        onSubmit();
    };

    return (
        <ul>
            {fields.map(({id}, index) => (
                <li key={id}>
                    <OpplysningBelopInput
                        label={renter?.label}
                        name={`avdragRenter.${index}.renter`}
                        control={control}
                    />
                    <OpplysningBelopInput
                        label={avdrag?.label}
                        name={`avdragRenter.${index}.avdrag`}
                        control={control}
                    />
                    {!!index && <ListRemoveButton onClick={() => onRemove(index)} />}
                </li>
            ))}
            <ListAddButton onClick={() => append({})}>{leggtil}</ListAddButton>
        </ul>
    );
};

import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {ValideringsFeilKode} from "../../digisos/redux/validering/valideringActionTypes";
import {
    opplysningSpec,
    VedleggFrontendMinusEtParTingSomTrengerAvklaring,
} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerConfig";
import {zodResolver} from "@hookform/resolvers/zod";

const zodBelopTekstfeltSchema = z.preprocess((a) => {
    // OBS: Dette er ikke testet enda
    const num = parseInt(a as string, 10);
    if (isNaN(num)) return "this string is passed as a hack to trigger the invalid_type_error";
    return num;
}, z.number({invalid_type_error: ValideringsFeilKode.ER_TALL}).positive());

const VedleggRadFrontendSchema = z.object({
    rader: z.array(
        z
            .object({
                beskrivelse: z.string(),
                belop: zodBelopTekstfeltSchema,
                brutto: zodBelopTekstfeltSchema,
                netto: zodBelopTekstfeltSchema,
                renter: zodBelopTekstfeltSchema,
                avdrag: zodBelopTekstfeltSchema,
            })
            .partial()
    ),
});

export type VedleggRadFrontendForm = z.infer<typeof VedleggRadFrontendSchema>;

export const useOpplysning = (opplysning: VedleggFrontendMinusEtParTingSomTrengerAvklaring) => {
    const {textKey, inputs, numRows} = opplysningSpec[opplysning.type];

    const {control, handleSubmit} = useForm<VedleggRadFrontendForm>({
        defaultValues: opplysning,
        resolver: zodResolver(VedleggRadFrontendSchema),
        reValidateMode: "onBlur",
    });

    const {fields, append, remove} = useFieldArray<VedleggRadFrontendForm>({
        control,
        name: "rader",
    });

    return {
        rows: {
            entries: fields,
            append,
            remove,
        },
        form: {
            control,
            handleSubmit,
        },
        textKey,
        numRows,
        inputs,
    };
};

import {VedleggFrontend} from "../../generated/model";
import {getSpcForOpplysning} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerUtils";
import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {ValideringsFeilKode} from "../../digisos/redux/validering/valideringActionTypes";

const zodBelopTekstfeltSchema = z.preprocess((a) => {
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

export const useOpplysning = (opplysning: VedleggFrontend) => {
    const spec = getSpcForOpplysning(opplysning.type);

    // Dette skal ikke kunne skje... (TM)
    // Todo: Refaktorer OpplysningerSpc til en Record<VedleggFrontendType, OpplysningSpecV2> elns
    if (!spec) {
        window.location.href = "/sosialhjelp/soknad/feil?reason=initOpplysning";
        throw new Error("initOpplysning mottok ugyldig spec");
    }

    const textKey = spec.textKey;
    const fieldNames = spec.radInnhold;
    const numRows = spec.antallRader;

    const {control, handleSubmit} = useForm<VedleggRadFrontendForm>({
        defaultValues: opplysning,
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
        control,
        handleSubmit,
        textKey,
        numRows,
        fieldNames,
    };
};

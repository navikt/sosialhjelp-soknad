import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {ValideringsFeilKode} from "../../digisos/redux/validering/valideringActionTypes";
import {opplysningSpec, VedleggFrontendMinusEtParTingSomTrengerAvklaring} from "../../lib/opplysninger";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {useUpdateOkonomiskOpplysning} from "../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {VedleggFrontend} from "../../generated/model";
import {useDebounce} from "react-use";
import {belopTekstfeltPreprocessor} from "./belopTekstfeltPreprocessor";
import deepEqual from "deep-equal";

const zodBelopTekstfeltSchema = z.preprocess(
    belopTekstfeltPreprocessor,
    z.number({invalid_type_error: ValideringsFeilKode.ER_TALL}).min(0, ValideringsFeilKode.ER_TALL).nullable()
);

const VedleggRadFrontendSchema = z.object({
    rader: z
        .array(
            z
                .object({
                    beskrivelse: z.string().max(100, ValideringsFeilKode.MAX_LENGDE).nullable(),
                    belop: zodBelopTekstfeltSchema,
                    brutto: zodBelopTekstfeltSchema,
                    netto: zodBelopTekstfeltSchema,
                    renter: zodBelopTekstfeltSchema,
                    avdrag: zodBelopTekstfeltSchema,
                })
                .partial()
        )
        .optional(),
});

export type VedleggRadFrontendForm = z.infer<typeof VedleggRadFrontendSchema>;

// This is the delay we wait between keystrokes before we push changes to backend
const DEBOUNCE_DELAY_MS = 500;

export const useOpplysning = (opplysning: VedleggFrontendMinusEtParTingSomTrengerAvklaring) => {
    const {textKey, inputs, numRows} = opplysningSpec[opplysning.type];

    const behandlingsId = useBehandlingsId();
    const {mutate} = useUpdateOkonomiskOpplysning();

    const {control, handleSubmit, watch} = useForm<VedleggRadFrontendForm>({
        defaultValues: {rader: opplysning.rader},
        resolver: zodResolver(VedleggRadFrontendSchema),
        mode: "onBlur",
        // Egentlig burde dette være true, men om det ikke er false så vil den
        // umiddelbart bytte fokus til første ugyldige felt dersom man endrer
        // et gyldig felt pga. mode: "onBlur"
        shouldFocusError: false,
    });

    // Initialize with all members being null
    const [rader, setRader] = useState<VedleggFrontend["rader"]>([
        {
            beskrivelse: null,
            belop: null,
            brutto: null,
            netto: null,
            renter: null,
            avdrag: null,
        },
    ] as VedleggFrontend["rader"]);

    // Wait DEBOUNCE_DELAY_MS after a change to "rader" before we try to push it to backend.
    useDebounce(
        () => {
            if (deepEqual(rader, opplysning.rader)) return;

            mutate({
                behandlingsId,
                data: {...opplysning, rader},
            });
        },
        DEBOUNCE_DELAY_MS,
        [rader]
    );

    // Submit data to server when form changes, with delay - this could probably be done better.
    // The row state is changed, which starts a timer in useDebounce above before submitting to backend.
    useEffect(() => {
        const subscription = watch(() => handleSubmit(({rader}) => setRader(rader))());
        return () => subscription.unsubscribe();
    }, [handleSubmit, watch]);

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
        inputs,
        multirow: numRows === "flere",
    };
};

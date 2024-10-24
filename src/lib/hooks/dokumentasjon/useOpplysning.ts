import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {useDebounce} from "react-use";
import deepEqual from "deep-equal";
import {VedleggFrontend} from "../../../generated/model";
import {opplysningSpec} from "../../opplysninger";
import {VedleggFrontendTypeMinusUferdig} from "../../../locales/nb/dokumentasjon.ts";
import {useOpplysningMutation} from "./useOpplysningMutation.ts";
import {VedleggRadFrontendForm, VedleggRadFrontendSchema} from "./vedleggRadFormSchema.ts";

// This is the delay we wait between keystrokes before we push changes to backend
const DEBOUNCE_DELAY_MS = 500;
const INITIAL_RADER: VedleggFrontend["rader"] = [
    {beskrivelse: null, belop: null, brutto: null, netto: null, renter: null, avdrag: null},
];

export const useOpplysning = (opplysning: VedleggFrontend) => {
    const {textKey, inputs, numRows} = opplysningSpec[opplysning.type as VedleggFrontendTypeMinusUferdig];

    const {mutateOpplysning} = useOpplysningMutation();

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
    const [rader, setRader] = useState<VedleggFrontend["rader"] | undefined>([...INITIAL_RADER]);

    const submitFormIfChanged = () => {
        if (!deepEqual(rader, opplysning.rader)) mutateOpplysning({...opplysning, rader});
    };

    // Wait DEBOUNCE_DELAY_MS after a change to "rader" before we try to push it to backend.
    useDebounce(submitFormIfChanged, DEBOUNCE_DELAY_MS, [rader]);

    // Submit data to server when form changes, with delay - this could probably be done better.
    // The row state is changed, which starts a timer in useDebounce above before submitting to backend.
    useEffect(() => {
        const subscription = watch(() => handleSubmit(({rader}) => setRader(rader))());
        return () => subscription.unsubscribe();
    }, [handleSubmit, watch]);

    const {fields, append, remove} = useFieldArray<VedleggRadFrontendForm>({control, name: "rader"});

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

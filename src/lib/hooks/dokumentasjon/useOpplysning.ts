import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {useDebounce} from "react-use";
import deepEqual from "deep-equal";
import {belopTekstfeltPreprocessor} from "../../../sider/08-vedlegg/belopTekstfeltPreprocessor";
import {ValideringsFeilKode} from "../../validering";
import {VedleggFrontend} from "../../../generated/model";
import {opplysningSpec} from "../../opplysninger";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {
    useHentOkonomiskeOpplysninger,
    useUpdateOkonomiskOpplysning,
} from "../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {VedleggFrontendTypeMinusUferdig} from "../../../locales/nb/dokumentasjon.ts";

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

export const useOpplysning = (opplysning: VedleggFrontend) => {
    const {textKey, inputs = [], numRows} = opplysningSpec[opplysning.type as VedleggFrontendTypeMinusUferdig];
    const behandlingsId = useBehandlingsId();
    const {mutate} = useUpdateOkonomiskOpplysning();

    // Fetch economic information from the backend
    const {data: fetchedData, isLoading} = useHentOkonomiskeOpplysninger(behandlingsId, {
        query: {
            refetchOnWindowFocus: false,
            staleTime: 60000,
        },
    });

    const initialValues =
        fetchedData?.okonomiskeOpplysninger?.find((item) => item.type === opplysning.type)?.rader || opplysning.rader;

    const {control, handleSubmit, watch} = useForm<VedleggRadFrontendForm>({
        defaultValues: {rader: initialValues},
        resolver: zodResolver(VedleggRadFrontendSchema),
        mode: "onBlur",
        shouldFocusError: false,
    });

    const [rader, setRader] = useState<VedleggFrontend["rader"]>(initialValues);

    // Debounce and save data
    useDebounce(
        () => {
            console.log("attempting to mutate with data: ", rader);
            //const currentRader = rader ?? [];
            if (!deepEqual(rader, opplysning.rader)) {
                mutate(
                    {
                        behandlingsId,
                        data: {...opplysning, rader},
                    },
                    {
                        onSuccess: (data) => {
                            console.log("mutate success", data);
                        },
                        onError: (error) => {
                            console.error("mutate error", error);
                        },
                    }
                );
            }
        },
        DEBOUNCE_DELAY_MS,
        [rader]
    );

    // Submit data to server when form changes, with delay - this could probably be done better.
    // The row state is changed, which starts a timer in useDebounce above before submitting to backend.
    useEffect(() => {
        console.log("fetchedData:", fetchedData);
        const subscription = watch(() =>
            handleSubmit(({rader}) => {
                setRader(rader);
            })()
        );
        return () => subscription.unsubscribe();
    }, [handleSubmit, watch, fetchedData]);

    const {fields, append, remove, update} = useFieldArray<VedleggRadFrontendForm>({
        control,
        name: "rader",
    });

    if (isLoading) {
        return {isLoading, rows: {entries: [], append, remove, update}, form: {control, handleSubmit}};
    }

    return {
        rows: {
            entries: fields,
            append,
            remove,
            update,
        },
        form: {
            control,
            handleSubmit,
        },
        textKey,
        inputs,
        multirow: numRows === "flere",
        isLoading,
    };
};

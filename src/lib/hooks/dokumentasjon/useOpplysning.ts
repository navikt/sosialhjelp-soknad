import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {useDebounce} from "react-use";
import deepEqual from "deep-equal";
import {belopTekstfeltPreprocessor} from "../../../sider/08-vedlegg/belopTekstfeltPreprocessor";
import {ValideringsFeilKode} from "../../validering";
import {
    VedleggFrontend,
    VedleggRadFrontend,
    VedleggFrontendGruppe,
    VedleggFrontendType,
} from "../../../generated/model";
import {opplysningSpec} from "../../opplysninger";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {useUpdateOkonomiskOpplysning} from "../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {VedleggFrontendTypeMinusUferdig} from "../../../locales/nb/dokumentasjon.ts";

// A mock data store that could be replaced by a real backend API or local storage
const opplysningStore: Record<string, VedleggFrontend["rader"]> = {};

// Hook to manage saving and loading of opplysning data
export const useStoredOpplysning = (opplysningType: string) => {
    const [savedOpplysning, setSavedOpplysning] = useState<VedleggFrontend | null>(() => {
        // Load from store (this could be a backend or local storage)
        const rader = opplysningStore[opplysningType] || null;
        return rader
            ? {rader, gruppe: "defaultGruppe" as VedleggFrontendGruppe, type: "defaultType" as VedleggFrontendType}
            : null;
    });

    const saveOpplysning = (rader: VedleggRadFrontend[]) => {
        // Save to store
        opplysningStore[opplysningType] = rader;
        setSavedOpplysning({
            rader,
            gruppe: "defaultGruppe" as VedleggFrontendGruppe,
            type: "defaultType" as VedleggFrontendType,
        } as VedleggFrontend); // Update state
    };

    return {
        savedOpplysning,
        saveOpplysning,
    };
};

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
    const {textKey, inputs, numRows} = opplysningSpec[opplysning.type as VedleggFrontendTypeMinusUferdig];

    const behandlingsId = useBehandlingsId();
    const {mutate} = useUpdateOkonomiskOpplysning();

    // Load initial values from persistent store (useStoredOpplysning)
    const {savedOpplysning, saveOpplysning} = useStoredOpplysning(opplysning.type); //Load persisted data

    const initialValues = savedOpplysning?.rader || opplysning.rader; // Load initial data from the store or API

    const {control, handleSubmit, watch} = useForm<VedleggRadFrontendForm>({
        defaultValues: {rader: initialValues}, // Use the loaded values as default
        resolver: zodResolver(VedleggRadFrontendSchema),
        mode: "onBlur",
        // Egentlig burde dette være true, men om det ikke er false så vil den
        // umiddelbart bytte fokus til første ugyldige felt dersom man endrer
        // et gyldig felt pga. mode: "onBlur"
        shouldFocusError: false,
    });

    // Initialize with all members being null if no data
    const [rader, setRader] = useState<VedleggFrontend["rader"]>(
        initialValues ||
            ([
                {
                    beskrivelse: null,
                    belop: null,
                    brutto: null,
                    netto: null,
                    renter: null,
                    avdrag: null,
                },
            ] as VedleggFrontend["rader"])
    );

    // Wait DEBOUNCE_DELAY_MS after a change to "rader" before pushing it to backend.
    useDebounce(
        () => {
            // Add a fallback to handle the case where opplysning.rader is undefined
            const currentRader = rader ?? [];

            if (deepEqual(currentRader, opplysning.rader)) return;

            mutate({
                behandlingsId,
                data: {...opplysning, rader: currentRader},
            });

            saveOpplysning(currentRader); // Persist data to store
        },
        DEBOUNCE_DELAY_MS,
        [rader]
    );

    // Submit data to server when form changes, with delay - this could probably be done better.
    // The row state is changed, which starts a timer in useDebounce above before submitting to backend.
    useEffect(() => {
        const subscription = watch(() =>
            handleSubmit(({rader}) => {
                setRader(rader);
            })()
        );
        return () => subscription.unsubscribe();
    }, [handleSubmit, watch]);

    const {fields, append, remove, update} = useFieldArray<VedleggRadFrontendForm>({
        control,
        name: "rader",
    });

    return {
        rows: {
            entries: fields,
            append,
            remove,
            update, // Allow row updates
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

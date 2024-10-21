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

const opplysningStore: Record<string, VedleggFrontend["rader"]> = {};

export const useStoredOpplysning = (opplysningType: string, fetchedData: VedleggFrontend | null) => {
    const [savedOpplysning, setSavedOpplysning] = useState<VedleggFrontend | null>(() => {
        const rader = opplysningStore[opplysningType] || null;
        if (rader) {
            return {
                rader,
                gruppe: "defaultGruppe" as VedleggFrontendGruppe,
                type: "defaultType" as VedleggFrontendType,
            };
        }
        if (fetchedData) {
            return {rader: fetchedData.rader, gruppe: fetchedData.gruppe, type: fetchedData.type};
        }
        return null;
    });

    const saveOpplysning = (rader: VedleggRadFrontend[]) => {
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

export const useOpplysning = (opplysning: VedleggFrontend, fetchedData: VedleggFrontend | null) => {
    const {textKey, inputs, numRows} = opplysningSpec[opplysning.type as VedleggFrontendTypeMinusUferdig];
    const behandlingsId = useBehandlingsId();
    const {mutate} = useUpdateOkonomiskOpplysning();

    const {savedOpplysning, saveOpplysning} = useStoredOpplysning(opplysning.type, fetchedData);

    const initialValues = savedOpplysning?.rader || opplysning.rader;
    console.log("------------------");
    console.log("before opplysning", opplysning);
    console.log("before fetchedData", fetchedData);
    console.log("initialValues", initialValues);
    console.log("------------------");
    const {control, handleSubmit, watch} = useForm<VedleggRadFrontendForm>({
        defaultValues: {rader: initialValues},
        resolver: zodResolver(VedleggRadFrontendSchema),
        mode: "onBlur",
        shouldFocusError: false,
    });

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
            console.log("rader ", rader);
            const currentRader = rader ?? [];
            console.log("attempting to mutate with data: ", currentRader);
            if (deepEqual(currentRader, opplysning.rader)) return;
            mutate(
                {
                    behandlingsId,
                    data: {...opplysning, rader: currentRader},
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
            saveOpplysning(currentRader);
        },
        DEBOUNCE_DELAY_MS,
        [rader]
    );

    // Submit data to server when form changes, with delay - this could probably be done better.
    // The row state is changed, which starts a timer in useDebounce above before submitting to backend.
    useEffect(() => {
        console.log("fetchData", fetchedData);
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
    };
};
